/**
 * 間 — Currency Service
 *
 * Handles USD ↔ ZiG conversion with multi-source fallback,
 * in-memory caching, and retry logic.
 *
 * ZiG (Zimbabwe Gold) launched April 2024, pegged to a basket
 * of foreign currencies and gold. Official rates from RBZ.
 */

// ============================================
// TYPES
// ============================================
export interface ExchangeRate {
  rate: number
  source: 'live' | 'cached' | 'fallback'
  timestamp: number
}

export type CurrencyCode = 'USD' | 'ZIG'

interface CacheEntry {
  rate: number
  timestamp: number
  ttl: number // milliseconds
}

// ============================================
// CONSTANTS
// ============================================
const ZIG_FALLBACK_RATE = 13.85
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
const REQUEST_TIMEOUT = 8000 // 8 seconds

/**
 * Rate sources in priority order.
 * In production, slot 1 would be the RBZ official API.
 */
const RATE_SOURCES = [
  {
    name: 'exchangerate-api',
    url: 'https://open.er-api.com/v6/latest/USD',
    parse: (data: any): number | null => {
      // ZiG isn't listed on most APIs yet — approximate via ZAR basket
      const zar = data?.rates?.ZAR
      if (!zar || typeof zar !== 'number') return null
      // ZiG ≈ 0.75 × ZAR (simplified basket approximation)
      return Number((zar * 0.75).toFixed(2))
    },
  },
  {
    name: 'frankfurter',
    url: 'https://api.frankfurter.app/latest?from=USD&to=ZAR',
    parse: (data: any): number | null => {
      const zar = data?.rates?.ZAR
      if (!zar || typeof zar !== 'number') return null
      return Number((zar * 0.75).toFixed(2))
    },
  },
]

// ============================================
// CACHE
// ============================================
let rateCache: CacheEntry | null = null

function getCached(): ExchangeRate | null {
  if (!rateCache) return null
  const age = Date.now() - rateCache.timestamp
  if (age > rateCache.ttl) return null
  return {
    rate: rateCache.rate,
    source: 'cached',
    timestamp: rateCache.timestamp,
  }
}

function setCache(rate: number) {
  rateCache = {
    rate,
    timestamp: Date.now(),
    ttl: CACHE_TTL,
  }
}

// ============================================
// FETCH WITH TIMEOUT
// ============================================
async function fetchWithTimeout(url: string, timeout: number): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    return response
  } finally {
    clearTimeout(id)
  }
}

// ============================================
// PUBLIC API
// ============================================

/**
 * Fetch the current USD → ZiG exchange rate.
 * Tries multiple sources with cache-first strategy.
 */
export async function getExchangeRate(): Promise<ExchangeRate> {
  // 1. Check cache
  const cached = getCached()
  if (cached) return cached

  // 2. Try each source in order
  for (const source of RATE_SOURCES) {
    try {
      const response = await fetchWithTimeout(source.url, REQUEST_TIMEOUT)
      if (!response.ok) continue

      const data = await response.json()
      const rate = source.parse(data)

      if (rate && rate > 0) {
        setCache(rate)
        return {
          rate,
          source: 'live',
          timestamp: Date.now(),
        }
      }
    } catch (err) {
      console.warn(`[currency] ${source.name} failed:`, err)
      continue
    }
  }

  // 3. Fallback
  console.warn('[currency] All sources failed, using fallback rate')
  return {
    rate: ZIG_FALLBACK_RATE,
    source: 'fallback',
    timestamp: Date.now(),
  }
}

/**
 * Convert between USD and ZiG.
 */
export function convert(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
  rate: number
): number {
  if (from === to) return amount
  if (from === 'USD' && to === 'ZIG') return amount * rate
  return amount / rate
}

/**
 * Format a currency amount for display.
 */
export function format(
  amount: number,
  currency: CurrencyCode = 'USD'
): string {
  const opts = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  if (currency === 'ZIG') {
    return `ZiG ${amount.toLocaleString('en-US', opts)}`
  }
  return `$${amount.toLocaleString('en-US', opts)}`
}

/**
 * Invalidate the rate cache (e.g. on manual refresh).
 */
export function invalidateCache(): void {
  rateCache = null
}
