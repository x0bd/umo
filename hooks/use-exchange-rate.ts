import {
    convert as convertCurrency,
    format as formatCurrency,
    getExchangeRate,
    invalidateCache,
    type CurrencyCode,
    type ExchangeRate,
} from '@/services/currency'
import { useCallback, useEffect, useState } from 'react'

// ============================================
// 間 — EXCHANGE RATE HOOK
// Thin wrapper around the currency service.
// ============================================

interface UseExchangeRateReturn {
  rate: number
  source: ExchangeRate['source']
  lastUpdated: Date
  isLoading: boolean
  error: string | null
  refresh: () => Promise<void>
}

export function useExchangeRate(): UseExchangeRateReturn {
  const [data, setData] = useState<ExchangeRate | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRate = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await getExchangeRate()
      setData(result)

      if (result.source === 'fallback') {
        setError('Using offline rate')
      }
    } catch (err) {
      setError('Rate unavailable')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refresh = useCallback(async () => {
    invalidateCache()
    await fetchRate()
  }, [fetchRate])

  useEffect(() => {
    fetchRate()

    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchRate, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchRate])

  return {
    rate: data?.rate ?? 13.85,
    source: data?.source ?? 'fallback',
    lastUpdated: data ? new Date(data.timestamp) : new Date(),
    isLoading,
    error,
    refresh,
  }
}

// Re-export utilities for convenience
export { convertCurrency, formatCurrency }
export type { CurrencyCode }

