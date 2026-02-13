/**
 * Currency service (server-side copy).
 * Same logic as client services/currency.ts.
 */

export interface ExchangeRate {
  rate: number
  source: 'live' | 'cached' | 'fallback'
  timestamp: number
}

export type CurrencyCode = 'USD' | 'ZIG'

interface CacheEntry {
  rate: number
  timestamp: number
  ttl: number
}

const ZIG_FALLBACK_RATE = 13.85
const CACHE_TTL = 5 * 60 * 1000
const REQUEST_TIMEOUT = 8000

const RATE_SOURCES = [
  {
    name: 'exchangerate-api',
    url: 'https://open.er-api.com/v6/latest/USD',
    parse: (data: any): number | null => {
      const zar = data?.rates?.ZAR
      if (!zar || typeof zar !== 'number') return null
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

let rateCache: CacheEntry | null = null

function getCached(): ExchangeRate | null {
  if (!rateCache) return null
  if (Date.now() - rateCache.timestamp > rateCache.ttl) return null
  return { rate: rateCache.rate, source: 'cached', timestamp: rateCache.timestamp }
}

function setCache(rate: number) {
  rateCache = { rate, timestamp: Date.now(), ttl: CACHE_TTL }
}

export async function getExchangeRate(): Promise<ExchangeRate> {
  const cached = getCached()
  if (cached) return cached

  for (const source of RATE_SOURCES) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)
      const response = await fetch(source.url, { signal: controller.signal })
      clearTimeout(timeout)
      if (!response.ok) continue
      const data = await response.json()
      const rate = source.parse(data)
      if (rate && rate > 0) {
        setCache(rate)
        return { rate, source: 'live', timestamp: Date.now() }
      }
    } catch {
      continue
    }
  }

  return { rate: ZIG_FALLBACK_RATE, source: 'fallback', timestamp: Date.now() }
}

export function convert(amount: number, from: CurrencyCode, to: CurrencyCode, rate: number): number {
  if (from === to) return amount
  if (from === 'USD' && to === 'ZIG') return amount * rate
  return amount / rate
}

export function format(amount: number, currency: CurrencyCode = 'USD'): string {
  const opts = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  if (currency === 'ZIG') return `ZiG ${amount.toLocaleString('en-US', opts)}`
  return `$${amount.toLocaleString('en-US', opts)}`
}

export function invalidateCache(): void {
  rateCache = null
}
