import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'

const struggles = [
  'I keep attracting the same kind of person.',
  'I feel anxious when someone pulls away.',
  'I struggle to communicate what I really need.',
  'I give too much and receive too little.',
  'I shut down when conflict starts.',
  'I don’t know why the same problems keep repeating.',
]

export function ProblemSection() {
  return (
    <section className="section-space bg-cream-100">
      <div className="container-app">
        <SectionHeading
          eyebrow="You’re not imagining it"
          title="Sometimes the problem isn’t the relationship. It’s the pattern."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {struggles.map((line) => (
            <div
              key={line}
              className="rounded-3xl border border-charcoal-100 bg-cream-50 p-6 sm:p-7 shadow-soft transition-shadow hover:shadow-card"
            >
              <p className="text-lg leading-relaxed text-charcoal-700">&ldquo;{line}&rdquo;</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-6 text-center">
          <p className="max-w-2xl text-xl sm:text-2xl font-serif text-charcoal-800 leading-snug">
            Your relationship patterns are learned. And learned patterns can be understood and changed.
          </p>
          <Button to="/assessment" size="lg">
            Discover My Pattern
          </Button>
        </div>
      </div>
    </section>
  )
}
