import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const steps = [
  'Understand your pattern',
  'Identify recurring triggers',
  'Work through relationship challenges',
  'Build healthier responses',
  'Create a personalized action plan',
]

export function ReprogrammingSection() {
  return (
    <section className="section-space bg-blush-50">
      <div className="container-app grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Relationship Reprogramming &mdash; 1:1</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold leading-tight text-charcoal-900">
            Sometimes you don&rsquo;t need more information.
          </h2>
          <p className="mt-4 max-w-lg text-base sm:text-lg leading-relaxed text-charcoal-600">
            You need someone to help you understand what&rsquo;s happening in your relationship and work through it
            with you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button to="/reprogramming" size="lg">
              Talk to a Counselor <ArrowRight size={18} />
            </Button>
            <Button to="/reprogramming" variant="outline" size="lg">
              How 1:1 Reprogramming Works
            </Button>
          </div>
        </div>

        <ol className="flex flex-col gap-3">
          {steps.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-4 rounded-2xl border border-charcoal-100 bg-cream-50 px-5 py-4 shadow-soft"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-500">
                {i + 1}
              </span>
              <span className="text-sm sm:text-base text-charcoal-700">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
