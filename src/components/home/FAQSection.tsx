import { ChevronDown } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { faqs } from '@/data/faqs'

export function FAQSection() {
  return (
    <section className="section-space bg-cream-50" id="faq">
      <div className="container-app">
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" />

        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
          {faqs.map((faq) => (
            <details key={faq.id} className="group rounded-2xl border border-charcoal-100 bg-cream-100 p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-charcoal-900">
                {faq.question}
                <ChevronDown size={18} className="shrink-0 text-charcoal-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
