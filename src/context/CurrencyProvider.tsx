import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { BASE_CURRENCY, CurrencyContext } from '@/context/currency'

const STORAGE_KEY = 'shalinee-sen:currency'
const RATES_KEY = 'shalinee-sen:rates'
const RATES_MAX_AGE_MS = 12 * 60 * 60 * 1000
/** Free, key-less exchange rates with INR as the base. */
const RATES_URL = 'https://open.er-api.com/v6/latest/INR'

type Rates = Record<string, number>

/** The currencies visitors can choose from, in the order they appear in the dropdown. */
const SUPPORTED_CURRENCIES = [
  'USD', 'EUR', 'CNY', 'JPY', 'GBP', 'CHF', 'CAD', 'AUD', 'INR', 'SGD',
  'HKD', 'KRW', 'RUB', 'SAR', 'AED', 'BRL', 'MXN', 'ZAR', 'TRY', 'NZD',
]

function loadCurrency(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved && SUPPORTED_CURRENCIES.includes(saved) ? saved : BASE_CURRENCY
  } catch {
    return BASE_CURRENCY
  }
}

function loadCachedRates(): { rates: Rates; fresh: boolean } | null {
  try {
    const raw = localStorage.getItem(RATES_KEY)
    if (!raw) return null
    const { savedAt, rates } = JSON.parse(raw) as { savedAt: number; rates: Rates }
    return { rates, fresh: Date.now() - savedAt < RATES_MAX_AGE_MS }
  } catch {
    return null
  }
}

/** Only currencies the browser can format; falls back to the code itself. */
function isFormattable(code: string): boolean {
  try {
    new Intl.NumberFormat('en', { style: 'currency', currency: code })
    return true
  } catch {
    return false
  }
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState(() => loadCurrency())
  const [rates, setRates] = useState<Rates | null>(() => loadCachedRates()?.rates ?? null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, currency)
    } catch {
      // Storage unavailable — choice still applies for this visit.
    }
  }, [currency])

  useEffect(() => {
    if (loadCachedRates()?.fresh) return
    let cancelled = false
    fetch(RATES_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { result?: string; rates?: Rates }) => {
        if (cancelled || data.result !== 'success' || !data.rates) return
        setRates(data.rates)
        try {
          localStorage.setItem(RATES_KEY, JSON.stringify({ savedAt: Date.now(), rates: data.rates }))
        } catch {
          // Not cached — we'll fetch again next visit.
        }
      })
      .catch(() => {
        // Offline or blocked: prices stay in rupees.
      })
    return () => {
      cancelled = true
    }
  }, [])

  const currencies = useMemo(
    () => SUPPORTED_CURRENCIES.filter((code) => code === BASE_CURRENCY || (rates?.[code] && isFormattable(code))),
    [rates],
  )

  const formatPrice = useCallback(
    (inr: number) => {
      const rate = currency === BASE_CURRENCY ? 1 : rates?.[currency]
      const code = rate ? currency : BASE_CURRENCY
      const amount = inr * (rate ?? 1)
      const formatted = new Intl.NumberFormat(code === BASE_CURRENCY ? 'en-IN' : 'en', {
        style: 'currency',
        currency: code,
        maximumFractionDigits: amount >= 100 ? 0 : 2,
      }).format(amount)
      // Converted prices are estimates; payment is charged at the live rate.
      return code === BASE_CURRENCY ? formatted : `≈ ${formatted}`
    },
    [currency, rates],
  )

  const value = useMemo(() => ({ currency, setCurrency, currencies, formatPrice }), [currency, currencies, formatPrice])

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}
