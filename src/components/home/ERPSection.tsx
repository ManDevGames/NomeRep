import { ArrowRight, Compass, Eye, RefreshCw, Sprout } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const steps = [
  {
    icon: Eye,
    title: 'Understand',
    description: 'Recognize the patterns affecting your relationships.',
  },
  {
    icon: Compass,
    title: 'Reflect',
    description: 'Understand your emotional triggers and needs.',
  },
  {
    icon: RefreshCw,
    title: 'Reprogram',
    description: 'Practice healthier responses and communication.',
  },
  {
    icon: Sprout,
    title: 'Grow',
    description: 'Build sustainable relationship habits.',
  },
]

export function ERPSection() {
  return (
    <section className="section-space bg-charcoal-900 text-cream-50">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-rose-300">ERP &mdash; Explore Relationship Program</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-cream-50">
            Go beyond understanding your pattern.
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-charcoal-100/80">
            Learn practical tools to change the way you communicate, respond, and connect.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-3xl border border-cream-50/10 bg-cream-50/5 p-7 backdrop-blur-sm"
            >
              <span className="text-xs font-semibold text-rose-300">{String(i + 1).padStart(2, '0')}</span>
              <step.icon size={26} className="mt-4 text-sage-300" />
              <h3 className="mt-4 text-lg font-semibold text-cream-50">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-100/70">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button to="/reprogramming" size="lg">
            Explore the Relationship Program <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  )
}
