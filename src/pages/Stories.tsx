import { ClientStories } from '@/components/brand/TestimonialCard'
import { VideoPlaceholder } from '@/components/brand/VideoPlaceholder'
import { FinalCTA } from '@/components/brand/FinalCTA'
import { site } from '@/config/site'
import { useLanguage } from '@/context/language'

/*
 * Only publish real testimonials with the client's written permission. Initials
 * (e.g. "P.K.") are fine for privacy. Add them to `testimonials` in
 * src/config/site.ts, then set showTestimonials to true.
 */
export function Stories() {
  const { t } = useLanguage()

  return (
    <>
      <section className="bg-cream-50 py-14 sm:py-20">
        <div className="container-app flex flex-col items-center gap-4 text-center">
          <span className="eyebrow">{t('Client stories', 'Clients की कहानियाँ')}</span>
          <h1 className="text-4xl font-semibold sm:text-5xl">{t('Stories of change', 'बदलाव की कहानियाँ')}</h1>
          <p className="max-w-xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
            {t(
              'Real women, in their own words, shared with their permission.',
              'असली महिलाएँ, उनके अपने शब्दों में, उनकी अनुमति से साझा।',
            )}
          </p>
        </div>
      </section>

      <section className="bg-sage-50 pb-20 pt-12 sm:pb-28">
        <div className="container-app flex flex-col gap-12">
          <ClientStories />
          {site.showTestimonials && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <VideoPlaceholder label="Client video testimonial (with permission)" />
              <VideoPlaceholder label="Client video testimonial (with permission)" />
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
