import { createContext, useContext } from 'react'

export const BASE_CURRENCY = 'INR'

export interface CurrencyContextValue {
  /** ISO 4217 code the visitor picked, e.g. 'INR', 'USD'. */
  currency: string
  setCurrency: (code: string) => void
  /** Currencies offered in the selector that we currently have a rate for. */
  currencies: string[]
  /** Format an amount given in Indian Rupees in the visitor's currency. */
  formatPrice: (inr: number) => string
}

export const CurrencyContext = createContext<CurrencyContextValue | null>(null)

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used inside <CurrencyProvider>')
  return ctx
}
