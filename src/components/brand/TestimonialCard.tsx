import { ArrowDown, Heart } from 'lucide-react'
import { site } from '@/config/site'
import type { SiteTestimonial } from '@/config/site'
import { useLanguage } from '@/context/language'

export function TestimonialCard({ testimonial }: { testimonial: SiteTestimonial }) {
  const { t } = useLanguage()
  const initials = testimonial.name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

  return (
    <figure className="flex h-full flex-col gap-5 rounded-3xl border border-charcoal-100 bg-cream-50 p-7 shadow-soft">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal-500">{t('Before', 'पहले')}</p>
        <p className="mt-2 leading-relaxed text-charcoal-600">&ldquo;{t(testimonial.before)}&rdquo;</p>
      </div>
      <ArrowDown size={18} className="text-rose-300" aria-hidden="true" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage-600">{t('After', 'अब')}</p>
        <blockquote className="mt-2 font-serif text-lg leading-relaxed text-charcoal-900">
          &ldquo;{t(testimonial.after)}&rdquo;
        </blockquote>
      </div>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-charcoal-100 pt-4">
        {testimonial.photo ? (
          <img src={testimonial.photo} alt="" loading="lazy" className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-500">
            {initials}
          </span>
        )}
        <span className="text-sm">
          <span className="block font-semibold text-charcoal-900">{testimonial.name}</span>
          <span className="text-charcoal-500">{t(testimonial.city)}</span>
        </span>
      </figcaption>
    </figure>
  )
}

/**
 * Testimonial grid, controlled by `site.showTestimonials`. While it's false, a
 * "coming soon" note shows instead — the site never shows placeholder reviews to visitors.
 */
export function ClientStories({ limit }: { limit?: number }) {
  const { t } = useLanguage()

  if (!site.showTestimonials) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 rounded-3xl border border-dashed border-rose-200 bg-cream-50 px-6 py-10 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-500">
          <Heart size={20} aria-hidden="true" />
        </span>
        <p className="font-serif text-xl text-charcoal-900">{t('Client stories coming soon', 'Clients की कहानियाँ जल्द आ रही हैं')}</p>
        <p className="text-sm leading-relaxed text-charcoal-500">
          {t(
            "We only share real stories, with each client's permission. They'll appear here soon.",
            'हम सिर्फ़ असली कहानियाँ, हर client की अनुमति से ही साझा करते हैं। वे जल्द यहाँ दिखेंगी।',
          )}
        </p>
      </div>
    )
  }

  const items = limit ? site.testimonials.slice(0, limit) : site.testimonials

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <TestimonialCard key={item.id} testimonial={item} />
      ))}
    </div>
  )
}
