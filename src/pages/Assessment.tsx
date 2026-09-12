import { AssessmentFlow } from '@/components/assessment/AssessmentFlow'

export function Assessment() {
  return (
    <section className="section-space bg-cream-50 min-h-[80vh]">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <span className="eyebrow">Free &middot; 5 minutes &middot; Private</span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">Relationship Pattern Assessment</h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal-500 leading-relaxed">
            Answer honestly &mdash; there are no right or wrong answers. Your responses stay private to you.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <AssessmentFlow />
        </div>
      </div>
    </section>
  )
}
