import { Link } from 'react-router-dom'
import { site } from '@/config/site'
import { useLanguage } from '@/context/language'

/** Text logo. Never truncates: both lines are nowrap and the element doesn't shrink. */
export function Logo({ className = '' }: { className?: string }) {
  const { t } = useLanguage()

  return (
    <Link to="/" aria-label={`${site.coachName}, ${t(site.tagline)} – ${t('Home', 'होम')}`} className={`flex shrink-0 flex-col leading-none ${className}`}>
      <span className="whitespace-nowrap font-serif text-lg font-semibold tracking-tight text-charcoal-900 sm:text-2xl">
        {site.coachName}
      </span>
      <span className="mt-1 whitespace-nowrap text-[0.65rem] font-medium uppercase tracking-[0.18em] text-rose-400 sm:text-xs">
        {t(site.tagline)}
      </span>
    </Link>
  )
}
