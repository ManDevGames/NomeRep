import { ChevronDown } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useLanguage } from '@/context/language'
import type { Bilingual } from '@/context/language'

export interface FAQ {
  q: Bilingual
  a: Bilingual
}

interface FAQSectionProps {
  items: FAQ[]
  title?: Bilingual
  className?: string
}

export function FAQSection({ items, title, className = 'bg-cream-50' }: FAQSectionProps) {
  const { t } = useLanguage()

  return (
    <section className={`section-space ${className}`} id="faq">
      <div className="container-app">
        <SectionHeading
          eyebrow={t('Questions', 'सवाल')}
          title={t(title ?? { en: 'Questions you might have', hi: 'आपके मन में उठने वाले सवाल' })}
        />

        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
          {items.map((faq) => (
            <details key={faq.q.en} className="group rounded-2xl border border-charcoal-100 bg-cream-100 px-5 sm:px-6">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-charcoal-900 [&::-webkit-details-marker]:hidden">
                {t(faq.q)}
                <ChevronDown size={18} aria-hidden="true" className="shrink-0 text-charcoal-500 transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-base leading-relaxed text-charcoal-600">{t(faq.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
