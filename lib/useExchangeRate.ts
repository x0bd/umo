import { useCallback, useEffect, useRef, useState } from 'react';
import { API_URL } from './config';

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

export type RateStatus = 'loading' | 'live' | 'stale' | 'error';

export interface UseExchangeRateResult {
  /** Mid-point rate to use for conversion (or null while loading). */
  rate: number | null;
  /** Full rate object from the API. */
  rateData: ExchangeRate | null;
  /** Current status of the rate fetch. */
  status: RateStatus;
  /** Trigger a fresh fetch (busts server-side cache via /exchange/refresh). */
  refresh: () => Promise<void>;
}

const FALLBACK_RATE = 36.0;

export function useExchangeRate(): UseExchangeRateResult {
  const [rateData, setRateData] = useState<ExchangeRate | null>(null);
  const [status, setStatus] = useState<RateStatus>('loading');
  const abortRef = useRef<AbortController | null>(null);

  const fetchRate = useCallback(async (forceRefresh = false) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setStatus('loading');

    try {
      const endpoint = forceRefresh ? `${API_URL}/exchange/refresh` : `${API_URL}/exchange/rate`;

      const res = await fetch(endpoint, {
        method: forceRefresh ? 'POST' : 'GET',
        signal: ctrl.signal,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: unknown = await res.json();
      // For force-refresh the server returns { refreshed, rate }
      const parsed: ExchangeRate =
        data !== null && typeof data === 'object' && 'rate' in data
          ? (data as { rate: ExchangeRate }).rate
          : (data as ExchangeRate);

      setRateData(parsed);
      setStatus(parsed.stale ? 'stale' : 'live');
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      console.warn('[useExchangeRate] fetch failed:', err);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    fetchRate();
    return () => abortRef.current?.abort();
  }, [fetchRate]);

  const refresh = useCallback(async () => {
    await fetchRate(true);
  }, [fetchRate]);

  const rate = rateData?.mid ?? (status === 'error' ? FALLBACK_RATE : null);

  return { rate, rateData, status, refresh };
}
