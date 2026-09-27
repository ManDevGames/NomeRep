import { useLanguage } from '@/context/language'
import type { RelationshipPattern } from '@/types'

const accentStyles: Record<RelationshipPattern['accent'], string> = {
  blush: 'bg-blush-100 border-blush-200',
  sage: 'bg-sage-100 border-sage-200',
  lavender: 'bg-lavender-100 border-lavender-200',
  rose: 'bg-rose-50 border-rose-200',
}

const dotStyles: Record<RelationshipPattern['accent'], string> = {
  blush: 'bg-blush-400',
  sage: 'bg-sage-400',
  lavender: 'bg-lavender-300',
  rose: 'bg-rose-300',
}

interface PatternCardProps {
  pattern: RelationshipPattern
}

export function PatternCard({ pattern }: PatternCardProps) {
  const { t } = useLanguage()

  return (
    <div
      className={`flex h-full flex-col gap-5 rounded-3xl border p-7 shadow-soft transition-shadow hover:shadow-card ${accentStyles[pattern.accent]}`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${dotStyles[pattern.accent]}`} aria-hidden="true" />
      <div>
        <h3 className="text-xl font-semibold text-charcoal-900">{pattern.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{pattern.tagline}</p>
      </div>

      <div className="mt-auto space-y-3 pt-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">{t('Strengths', 'ख़ूबियाँ')}</p>
          <p className="mt-1 text-sm text-charcoal-700">{pattern.strengths.join(', ')}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">{t('Growth areas', 'जिन पर काम करना है')}</p>
          <p className="mt-1 text-sm text-charcoal-700">{pattern.growthAreas.join(', ')}</p>
        </div>
      </div>
    </div>
  )
}
