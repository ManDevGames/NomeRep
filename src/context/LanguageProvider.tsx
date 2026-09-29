import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { LanguageContext } from '@/context/language'
import type { Bilingual, Language } from '@/context/language'

const STORAGE_KEY = 'shalinee-sen:language'

function loadLanguage(): Language {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'hi' ? 'hi' : 'en'
  } catch {
    return 'en'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => loadLanguage())

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Storage unavailable — language still switches for this visit.
    }
  }, [lang])

  const toggleLang = useCallback(() => setLang((l) => (l === 'en' ? 'hi' : 'en')), [])

  const t = useCallback(
    (en: string | Bilingual, hi?: string) => {
      if (typeof en === 'object') return en[lang]
      return lang === 'hi' && hi !== undefined ? hi : en
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, toggleLang, t }), [lang, toggleLang, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
