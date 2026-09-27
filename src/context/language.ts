import { createContext, useContext } from 'react'

export type Language = 'en' | 'hi'

/** A piece of copy written in both languages. */
export interface Bilingual {
  en: string
  hi: string
}

export interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  toggleLang: () => void
  /** Pick the string for the active language: `t('Home', 'होम')` or `t({ en, hi })`. */
  t: (en: string | Bilingual, hi?: string) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
