import { Hono } from 'hono';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ExchangeRate {
  base: string;
  quote: string;
  buy: number;
  sell: number;
  mid: number;
  source: string;
  fetchedAt: string;
  stale: boolean;
}

interface CacheEntry {
  rate: ExchangeRate;
  fetchedAt: number; // epoch ms
}

// ─── In-memory cache (30-min TTL) ────────────────────────────────────────────

const CACHE_TTL_MS = 30 * 60 * 1000;
let cache: CacheEntry | null = null;

// ─── Scraper helpers ─────────────────────────────────────────────────────────

/**
 * Tries to extract USD/ZiG buy+sell rates from raw HTML.
 *
 * CABS renders an exchange-rate table. Because the page may be server-side
 * rendered we first attempt a simple `fetch()` with browser-like headers.
 * We then search for numeric values near "USD" and "ZiG" (or "Zimbabwe Gold")
 * using two strategies:
 *   1. Cheerio-style regex on <td> text nodes (works on SSR pages)
 *   2. JSON-LD / embedded JSON blobs (works on some Angular pages)
 */
async function scrapeCABS(): Promise<{ buy: number; sell: number } | null> {
  const url = 'https://www.cabs.co.zw/exchange-rates';

  let html: string;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
      },
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.warn(`[exchange] CABS returned ${res.status}`);
      return null;
    }
    html = await res.text();
  } catch (err) {
    console.warn('[exchange] CABS fetch failed:', err);
    return null;
  }

  // ── Strategy 1: look for rows containing "USD" close to ZiG rate numbers ──
  //
  // Typical table row pattern in CABS HTML:
  //   <td>USD</td><td>36.80</td><td>34.25</td>
  // or reversed buy/sell columns. We try both orderings.

  const usdRowRegex =
    /USD[\s\S]{0,300}?(\d{1,3}(?:[.,]\d{1,4}))[\s\S]{0,100}?(\d{1,3}(?:[.,]\d{1,4}))/i;

  const m = html.match(usdRowRegex);
  if (m) {
    const a = parseFloat(m[1].replace(',', '.'));
    const b = parseFloat(m[2].replace(',', '.'));

    // The larger value is typically the bank sell rate
    const buy = Math.min(a, b);
    const sell = Math.max(a, b);

    if (buy > 1 && sell > 1 && sell < 10_000) {
      console.info(`[exchange] CABS scraped — buy ${buy}, sell ${sell}`);
      return { buy, sell };
    }
  }

  // ── Strategy 2: look for embedded JSON containing rate data ──
  const jsonBlobRegex = /"(?:buy|buying)[_\s]?(?:rate)?"\s*:\s*"?([\d.]+)"?/gi;
  const sellBlobRegex = /"(?:sell|selling)[_\s]?(?:rate)?"\s*:\s*"?([\d.]+)"?/gi;

  const buyMatch = jsonBlobRegex.exec(html);
  const sellMatch = sellBlobRegex.exec(html);

  if (buyMatch && sellMatch) {
    const buy = parseFloat(buyMatch[1]);
    const sell = parseFloat(sellMatch[1]);
    if (buy > 1 && sell > 1) {
      console.info(`[exchange] CABS JSON blob — buy ${buy}, sell ${sell}`);
      return { buy, sell };
    }
  }

  console.warn('[exchange] CABS HTML did not contain parseable rate data');
  return null;
}

/**
 * Fallback: try the Reserve Bank of Zimbabwe website.
 * RBZ publishes official interbank rates, often in a static table.
 */
async function scrapeRBZ(): Promise<{ buy: number; sell: number } | null> {
  const url = 'https://www.rbz.co.zw/';

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) return null;
    const html = await res.text();

    // RBZ typically shows the official rate in a banner or table
    const rateRegex = /1\s*USD\s*[=:]\s*([\d,.]+)\s*(?:ZiG|ZWG|ZIG)/gi;
    const m = rateRegex.exec(html);
    if (m) {
      const mid = parseFloat(m[1].replace(',', ''));
      if (mid > 1) {
        // Use ±1 % spread as a proxy when only mid is available
        const buy = parseFloat((mid * 0.99).toFixed(4));
        const sell = parseFloat((mid * 1.01).toFixed(4));
        console.info(`[exchange] RBZ mid rate ${mid} — buy ${buy}, sell ${sell}`);
        return { buy, sell };
      }
    }
  } catch (err) {
    console.warn('[exchange] RBZ fetch failed:', err);
  }

  return null;
}

// ─── Main rate fetcher ────────────────────────────────────────────────────────

async function fetchLiveRate(): Promise<ExchangeRate> {
  // Try CABS first, then RBZ
  const scraped = (await scrapeCABS()) ?? (await scrapeRBZ());

  if (scraped) {
    const rate: ExchangeRate = {
      base: 'USD',
      quote: 'ZiG',
      buy: scraped.buy,
      sell: scraped.sell,
      mid: parseFloat(((scraped.buy + scraped.sell) / 2).toFixed(4)),
      source: 'CABS',
      fetchedAt: new Date().toISOString(),
      stale: false,
    };
    cache = { rate, fetchedAt: Date.now() };
    return rate;
  }

  // All scrapers failed — return cached value (stale) or hardcoded fallback
  if (cache) {
    console.warn('[exchange] Using stale cache');
    return { ...cache.rate, stale: true };
  }

  // Last-resort hardcoded fallback (keeps the app usable when offline)
  const fallback: ExchangeRate = {
    base: 'USD',
    quote: 'ZiG',
    buy: 35.5,
    sell: 36.5,
    mid: 36.0,
    source: 'fallback',
    fetchedAt: new Date().toISOString(),
    stale: true,
  };
  console.warn('[exchange] All sources failed — returning hardcoded fallback');
  return fallback;
}

// ─── Route ───────────────────────────────────────────────────────────────────

export const exchangeRouter = new Hono();

/**
 * GET /exchange/rate
 *
 * Returns the current USD → ZiG exchange rate scraped from CABS.
 *
 * Response shape:
 * {
 *   base: "USD",
 *   quote: "ZiG",
 *   buy: 35.50,    // bank buys USD (you sell USD for ZiG)
 *   sell: 36.50,   // bank sells USD (you buy USD with ZiG)
 *   mid: 36.00,    // midpoint — safe for display
 *   source: "CABS",
 *   fetchedAt: "2026-03-04T10:00:00.000Z",
 *   stale: false   // true when live scrape failed and a cached/fallback is returned
 * }
 */
exchangeRouter.get('/rate', async (c) => {
  // Serve from cache if fresh
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return c.json(cache.rate);
  }

  const rate = await fetchLiveRate();
  return c.json(rate);
});

/**
 * POST /exchange/refresh
 *
 * Force-busts the cache and re-fetches from CABS.
 * Useful for admin/debug; in production you'd protect this with middleware.
 */
exchangeRouter.post('/refresh', async (c) => {
  cache = null;
  const rate = await fetchLiveRate();
  return c.json({ refreshed: true, rate });
});
