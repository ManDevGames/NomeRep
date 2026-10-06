import { useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import { useCurrency } from '@/context/currency'
import { useLanguage } from '@/context/language'

/** Currency dropdown. Prices across the site convert from INR. */
export function CurrencySelect() {
  const { currency, setCurrency, currencies } = useCurrency()
  const { lang, t } = useLanguage()

  const names = useMemo(() => {
    try {
      return new Intl.DisplayNames([lang === 'hi' ? 'hi' : 'en'], { type: 'currency' })
    } catch {
      return null
    }
  }, [lang])

  const label = (code: string) => {
    const name = names?.of(code)
    return name && name !== code ? `${code} – ${name}` : code
  }

  // Keep a stored choice visible even before the rate list has loaded.
  const options = currencies.includes(currency) ? currencies : [currency, ...currencies]

  // The closed control shows only the code; the native list underneath shows full names.
  return (
    <div className="relative flex h-8 items-center gap-1 rounded-full border border-charcoal-300/40 pl-3 pr-2 text-xs font-semibold text-charcoal-700 focus-within:ring-2 focus-within:ring-rose-300 hover:text-charcoal-900">
      <span aria-hidden="true">{currency}</span>
      <ChevronDown size={14} aria-hidden="true" />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        aria-label={t('Currency', 'मुद्रा')}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full opacity-0"
      >
        {options.map((code) => (
          <option key={code} value={code} className="bg-cream-50 text-charcoal-900">
            {label(code)}
          </option>
        ))}
      </select>
    </div>
  )
}
