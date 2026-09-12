import { CheckCircle2, Sparkles, TrendingUp } from 'lucide-react'
import type { RelationshipPattern } from '@/types'

const accentText: Record<RelationshipPattern['accent'], string> = {
  blush: 'text-rose-400',
  sage: 'text-sage-500',
  lavender: 'text-lavender-300',
  rose: 'text-rose-400',
}

const accentBg: Record<RelationshipPattern['accent'], string> = {
  blush: 'bg-blush-50 border-blush-200',
  sage: 'bg-sage-50 border-sage-200',
  lavender: 'bg-lavender-50 border-lavender-200',
  rose: 'bg-rose-50 border-rose-200',
}

interface PersonalizedPatternProps {
  pattern: RelationshipPattern
}

export function PersonalizedPattern({ pattern }: PersonalizedPatternProps) {
  return (
    <div className="flex flex-col gap-14">
      <div className={`rounded-3xl border p-7 sm:p-10 ${accentBg[pattern.accent]}`}>
        <span className="eyebrow">Your Relationship Pattern</span>
        <h1 className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold ${accentText[pattern.accent]}`}>
          {pattern.name}
        </h1>
        <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-charcoal-700">
          {pattern.description}
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-charcoal-900">What may be happening</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {pattern.whatMayBeHappening.map((point, i) => (
            <div key={i} className="flex gap-3 rounded-2xl border border-charcoal-100 bg-cream-50 p-5 shadow-soft">
              <Sparkles size={18} className="mt-0.5 shrink-0 text-rose-300" />
              <p className="text-sm leading-relaxed text-charcoal-700">{point}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <section>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-charcoal-900">
            <CheckCircle2 size={20} className="text-sage-500" /> Your strengths
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {pattern.strengths.map((s) => (
              <li key={s} className="rounded-full bg-sage-100 px-4 py-2 text-sm text-charcoal-700">
                {s}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-charcoal-900">
            <TrendingUp size={20} className="text-rose-400" /> Your growth areas
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {pattern.growthAreas.map((g) => (
              <li key={g} className="rounded-full bg-blush-100 px-4 py-2 text-sm text-charcoal-700">
                {g}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-charcoal-900">Your Key Patterns</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {pattern.issues.map((issue, i) => (
            <div
              key={issue.title}
              className="rounded-3xl border border-charcoal-100 bg-cream-50 p-7 shadow-soft"
            >
              <span className="eyebrow">Issue #{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-charcoal-900">{issue.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-600">{issue.description}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="rounded-2xl bg-charcoal-50 p-5 text-sm leading-relaxed text-charcoal-500">
        Your responses suggest a possible pattern for reflection — this assessment is for self-reflection, not
        diagnosis. Only a qualified professional can offer clinical guidance.
      </p>
    </div>
  )
}
