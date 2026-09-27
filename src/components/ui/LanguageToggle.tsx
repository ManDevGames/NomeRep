import { useLanguage } from '@/context/language'

/** EN / हिं segmented switch. Each label is written in its own language so it's recognisable either way. */
export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t('Language', 'भाषा')}
      className="flex items-center rounded-full border border-charcoal-300/40 p-0.5 text-xs font-semibold"
    >
      {(
        [
          { code: 'en', label: 'EN', name: 'English' },
          { code: 'hi', label: 'हिं', name: 'हिंदी' },
        ] as const
      ).map((option) => (
        <button
          key={option.code}
          type="button"
          lang={option.code}
          onClick={() => setLang(option.code)}
          aria-pressed={lang === option.code}
          aria-label={option.name}
          className={`rounded-full px-2.5 py-1.5 leading-none transition-colors ${
            lang === option.code ? 'bg-charcoal-900 text-cream-50' : 'text-charcoal-500 hover:text-charcoal-900'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
