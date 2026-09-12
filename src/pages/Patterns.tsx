import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { PatternCard } from '@/components/patterns/PatternCard'
import { patterns } from '@/data/patterns'

export function Patterns() {
  return (
    <section className="section-space bg-cream-50">
      <div className="container-app">
        <SectionHeading
          eyebrow="Relationship patterns"
          title="Five common relationship patterns"
          subtitle="These are broad, common patterns people notice in themselves — offered here for reflection, not as fixed labels or diagnoses. Most people recognize a little of themselves in more than one."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {patterns.map((pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-lg text-charcoal-600">
            Curious which pattern resonates most with your relationships?
          </p>
          <Button to="/assessment" size="lg">
            Take the Free Assessment <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  )
}
