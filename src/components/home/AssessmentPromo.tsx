import { ClipboardList, Heart, Sparkles } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AssessmentFlow } from '@/components/assessment/AssessmentFlow'

const howItWorks = [
  {
    icon: ClipboardList,
    title: 'Answer honestly',
    description: 'Seven quick questions about how you typically show up in relationships.',
  },
  {
    icon: Sparkles,
    title: 'See your pattern',
    description: 'Get a personalized reflection on the pattern your responses suggest.',
  },
  {
    icon: Heart,
    title: 'Explore next steps',
    description: 'Discover programs and guidance suited to where you are right now.',
  },
]

export function AssessmentPromo() {
  return (
    <section className="section-space bg-cream-50" id="assessment">
      <div className="container-app">
        <SectionHeading
          eyebrow="Relationship Pattern Assessment"
          title="Relationship Pattern Assessment"
          subtitle="Five minutes can give you a clearer picture of the patterns influencing your relationships."
        />

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
          {howItWorks.map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-2 rounded-2xl bg-cream-100 p-5 text-center">
              <item.icon size={22} className="text-rose-400" />
              <h3 className="text-sm font-semibold text-charcoal-800">{item.title}</h3>
              <p className="text-xs leading-relaxed text-charcoal-500">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <AssessmentFlow />
        </div>
      </div>
    </section>
  )
}
