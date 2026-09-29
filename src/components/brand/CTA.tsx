import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/language'
import type { Bilingual } from '@/context/language'

/*
 * The site has exactly one primary action (the free Clarity Call) and one
 * secondary action (the quiz). Use these components for them everywhere, so the
 * wording and styling never drift. No other button may compete with them.
 */

const PRIMARY_CTA_LABEL: Bilingual = {
  en: 'Book Your Free Clarity Call',
  hi: 'अपनी फ़्री Clarity Call बुक करें',
}

/** Short forms, used only in the header where space is tight (the tiny one below 640px). */
const PRIMARY_CTA_SHORT: Bilingual = {
  en: 'Book Free Clarity Call',
  hi: 'फ़्री Clarity Call बुक करें',
}
const PRIMARY_CTA_TINY: Bilingual = {
  en: 'Book Free Call',
  hi: 'फ़्री Call बुक करें',
}

const SECONDARY_CTA_LABEL: Bilingual = {
  en: 'Take the 2-Min Relationship Stress Quiz',
  hi: '2 मिनट का Relationship Stress Quiz लें',
}

interface PrimaryCTAProps {
  /** Header-only: short wording and a compact size. */
  short?: boolean
  /** Rare context-specific wording (e.g. on the quiz result). Defaults to the standard label. */
  label?: Bilingual
  /** Query string to pass along, e.g. "?score=62&stage=emotional-disconnect". */
  search?: string
  fullWidth?: boolean
  className?: string
}

export function PrimaryCTA({ short, label, search = '', fullWidth, className = '' }: PrimaryCTAProps) {
  const { t } = useLanguage()
  const size = short ? 'px-3.5 text-sm sm:px-5' : 'px-6 py-3 text-base'

  return (
    <Link
      to={`/clarity-call${search}`}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-rose-400 text-center font-semibold text-white shadow-soft transition-all duration-200 hover:bg-rose-500 hover:shadow-card ${size} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {short && !label ? (
        <>
          <span className="whitespace-nowrap sm:hidden">{t(PRIMARY_CTA_TINY)}</span>
          <span className="hidden whitespace-nowrap sm:inline">{t(PRIMARY_CTA_SHORT)}</span>
        </>
      ) : (
        t(label ?? PRIMARY_CTA_LABEL)
      )}
    </Link>
  )
}

interface SecondaryCTAProps {
  /** `link` (default) is a quiet text link; `outline` a bordered button; `button` is only for the sage quiz band. */
  variant?: 'link' | 'outline' | 'button'
  label?: Bilingual
  className?: string
}

export function SecondaryCTA({ variant = 'link', label, className = '' }: SecondaryCTAProps) {
  const { t } = useLanguage()
  const text = t(label ?? SECONDARY_CTA_LABEL)

  const styles = {
    link: 'inline-flex min-h-12 items-center gap-1.5 text-base font-medium text-charcoal-700 underline decoration-rose-200 underline-offset-4 hover:text-rose-500 hover:decoration-rose-400',
    outline:
      'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-charcoal-300/50 px-6 py-3 text-center text-base font-medium text-charcoal-800 transition-colors hover:border-rose-300 hover:bg-blush-50',
    button:
      'inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-charcoal-900 px-6 py-3 text-center text-base font-semibold text-cream-50 transition-colors hover:bg-charcoal-800',
  }

  return (
    <Link to="/quiz" className={`${styles[variant]} ${className}`}>
      {text}
      <ArrowRight size={17} aria-hidden="true" className="shrink-0" />
    </Link>
  )
}
