import { Quote } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { testimonials } from '@/data/testimonials'

export function TestimonialsSection() {
  return (
    <section className="section-space bg-sage-50">
      <div className="container-app">
        <SectionHeading eyebrow="Stories" title="People who started where you are" />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col gap-4 rounded-3xl border border-charcoal-100 bg-cream-50 p-7 shadow-soft"
            >
              <Quote size={22} className="text-rose-300" />
              <blockquote className="text-base leading-relaxed text-charcoal-700">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-auto pt-2 border-t border-charcoal-100">
                <p className="text-sm font-semibold text-charcoal-900">
                  {t.name} <span className="font-normal text-charcoal-400">&middot; {t.location}</span>
                </p>
                <p className="text-xs text-charcoal-400">{t.context}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
