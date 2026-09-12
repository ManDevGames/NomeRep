import { useMemo, useState } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CounselorCard } from '@/components/counselors/CounselorCard'
import { CounselorProfileModal } from '@/components/counselors/CounselorProfileModal'
import { counselors } from '@/data/counselors'
import { formatInr } from '@/utils/format'
import type { Counselor, IndianLanguage } from '@/types'

const steps = [
  {
    title: 'Understand your pattern',
    description: 'Your counselor helps you see the relationship pattern clearly, without judgment.',
  },
  {
    title: 'Identify recurring triggers',
    description: 'Together, you’ll map the specific situations that activate old responses.',
  },
  {
    title: 'Work through relationship challenges',
    description: 'Bring real, current situations into sessions and work through them as they arise.',
  },
  {
    title: 'Build healthier responses',
    description: 'Practice new ways of communicating and responding, with support along the way.',
  },
  {
    title: 'Create a personalized action plan',
    description: 'Leave with a concrete plan tailored to your relationships and your pace.',
  },
]

const languages: IndianLanguage[] = Array.from(new Set(counselors.flatMap((c) => c.languages)))
const startingPrice = Math.min(...counselors.map((c) => c.pricePerSessionInr))

export function Reprogramming() {
  const [activeCounselor, setActiveCounselor] = useState<Counselor | null>(null)
  const [languageFilter, setLanguageFilter] = useState<IndianLanguage | 'All'>('All')

  const filteredCounselors = useMemo(() => {
    if (languageFilter === 'All') return counselors
    return counselors.filter((c) => c.languages.includes(languageFilter))
  }, [languageFilter])

  return (
    <>
      <section className="section-space bg-blush-50">
        <div className="container-app grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Relationship Reprogramming &mdash; 1:1</span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-charcoal-900">
              Sometimes you don&rsquo;t need more information.
            </h1>
            <p className="mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-charcoal-600">
              You need someone to help you understand what&rsquo;s happening in your relationship and work through
              it with you.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="#counselors" size="lg">
                Talk to a Counselor <ArrowRight size={18} />
              </Button>
              <Button href="#how-it-works" variant="outline" size="lg">
                How 1:1 Reprogramming Works
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-charcoal-500">
              <MessageCircle size={16} className="text-sage-500" /> Prefer to chat first?{' '}
              <a
                href="https://wa.me/919311088577"
                target="_blank"
                rel="noreferrer"
                className="text-rose-400 underline underline-offset-2"
              >
                Message us on WhatsApp
              </a>{' '}
              before booking.
            </p>
          </div>
          <div className="rounded-3xl border border-charcoal-100 bg-cream-50 p-8 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-wide text-charcoal-500">Sessions starting from</p>
            <p className="mt-2 text-4xl font-semibold text-charcoal-900">{formatInr(startingPrice)}</p>
            <p className="mt-1 text-sm text-charcoal-500">per session &middot; video, audio or chat</p>
          </div>
        </div>
      </section>

      <section className="section-space bg-cream-50" id="how-it-works">
        <div className="container-app">
          <SectionHeading eyebrow="How it works" title="How 1:1 Reprogramming Works" />
          <ol className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-5 rounded-3xl border border-charcoal-100 bg-cream-100 p-6 shadow-soft"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 font-semibold text-rose-500">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-charcoal-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-600">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-space bg-sage-50" id="counselors">
        <div className="container-app">
          <SectionHeading
            eyebrow="1:1 support"
            title="Find the Right Counselor for You"
            subtitle="Demo profiles for this prototype — filter by the language you’re most comfortable speaking in."
          />

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {(['All', ...languages] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguageFilter(lang)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  languageFilter === lang
                    ? 'bg-charcoal-900 text-cream-50'
                    : 'bg-cream-50 text-charcoal-600 hover:bg-blush-100'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {filteredCounselors.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCounselors.map((counselor) => (
                <CounselorCard key={counselor.id} counselor={counselor} onViewProfile={setActiveCounselor} />
              ))}
            </div>
          ) : (
            <p className="mt-16 text-center text-charcoal-500">No counselors found for this language yet.</p>
          )}
        </div>
      </section>

      <CounselorProfileModal counselor={activeCounselor} onClose={() => setActiveCounselor(null)} />
    </>
  )
}
