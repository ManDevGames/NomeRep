import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { ClientStories } from '@/components/brand/TestimonialCard'
import { PrimaryCTA, SecondaryCTA } from '@/components/brand/CTA'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { site } from '@/config/site'
import { useCurrency } from '@/context/currency'
import { useLanguage } from '@/context/language'

export function StoriesPreviewSection() {
  const { t } = useLanguage()

  return (
    <section className="section-space bg-sage-50">
      <div className="container-app">
        <SectionHeading eyebrow={t('Client stories', 'Clients की कहानियाँ')} title={t('Real people. Real change.', 'असली लोग। असली बदलाव।')} />
        <div className="mt-12">
          <ClientStories limit={3} />
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/stories" className="inline-flex min-h-12 items-center gap-1.5 font-medium text-rose-500 hover:text-rose-400">
            {t('Read more stories', 'और कहानियाँ पढ़ें')} <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

const cardLink =
  'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-charcoal-300/50 px-6 py-3 text-base font-medium text-charcoal-800 transition-colors hover:border-rose-300 hover:bg-blush-50'

export function OffersSection() {
  const { t } = useLanguage()
  const { formatPrice } = useCurrency()

  return (
    <section className="section-space bg-cream-50">
      <div className="container-app">
        <SectionHeading eyebrow={t('Ways to work with me', 'मेरे साथ काम करने के तरीके')} title={t('Start where you feel ready', 'जहाँ से आप तैयार हों, वहीं से शुरू करें')} />

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          <OfferCard
            title={t('Free Clarity Call', 'फ़्री Clarity Call')}
            meta={t('20 minutes · Free', '20 मिनट · फ़्री')}
            points={[
              t('Understand where you’re stuck', 'समझें कि आप कहाँ अटकी हैं'),
              t('See whether coaching is right for you', 'जानें कि coaching आपके लिए सही है या नहीं'),
              t('Private, no pressure', 'पूरी तरह निजी, कोई दबाव नहीं'),
            ]}
            action={<PrimaryCTA fullWidth placement="offers" />}
          />
          <OfferCard
            highlighted
            badge={t('Most chosen', 'सबसे ज़्यादा चुना गया')}
            title={site.programName}
            meta={t('1, 3 or 8 weeks · Private 1:1', '1, 3 या 8 हफ़्ते · निजी 1:1')}
            points={[
              t('Customisable: 1, 3 or 8 weeks', 'आपके हिसाब से: 1, 3 या 8 हफ़्ते'),
              t('Private coaching sessions', 'निजी coaching sessions'),
              t('Reprogramming audios for daily practice', 'रोज़ के अभ्यास के लिए reprogramming audios'),
              t('WhatsApp support between sessions', 'Sessions के बीच WhatsApp पर साथ'),
            ]}
            note={t('Starts after a free Clarity Call', 'फ़्री Clarity Call के बाद शुरू होता है')}
            action={
              <Link to="/coaching" className={cardLink}>
                {t('See the full program', 'पूरा program देखें')} <ArrowRight size={17} aria-hidden="true" />
              </Link>
            }
          />
          <OfferCard
            title={`${t('Live Workshop', 'Live Workshop')}: ${t(site.workshop.title)}`}
            meta={`${t('90 minutes', '90 मिनट')} · Online · ${formatPrice(site.prices.workshopINR)}`}
            points={[
              t('Why your mind overthinks in love', 'प्यार में मन overthinking क्यों करता है'),
              t('A 5-minute calming technique', '5 मिनट की एक शांत करने वाली technique'),
              t('Live, with Q&A', 'Live, सवाल-जवाब के साथ'),
            ]}
            action={
              <Link to="/workshop" className={cardLink}>
                {t('Join the workshop', 'Workshop से जुड़ें')} <ArrowRight size={17} aria-hidden="true" />
              </Link>
            }
          />
        </div>
      </div>
    </section>
  )
}

interface OfferCardProps {
  title: string
  meta: string
  points: string[]
  action: ReactNode
  note?: string
  badge?: string
  highlighted?: boolean
}

function OfferCard({ title, meta, points, action, note, badge, highlighted }: OfferCardProps) {
  return (
    <div
      className={`relative flex flex-col gap-5 rounded-3xl p-7 ${
        highlighted ? 'border-2 border-rose-300 bg-blush-50 shadow-card lg:-my-3 lg:py-10' : 'border border-charcoal-100 bg-cream-100'
      }`}
    >
      {badge && (
        <span className="absolute -top-3.5 left-7 rounded-full bg-cta px-3 py-1 text-xs font-semibold text-white">{badge}</span>
      )}
      <div>
        <h3 className="text-2xl font-semibold leading-snug">{title}</h3>
        <p className="mt-1 text-sm font-medium text-rose-500">{meta}</p>
      </div>
      <ul className="flex flex-col gap-3">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-base text-charcoal-700">
            <Check size={18} className="mt-0.5 shrink-0 text-sage-500" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col gap-3 pt-2">
        {note && <p className="text-sm text-charcoal-500">{note}</p>}
        {action}
      </div>
    </div>
  )
}

export function QuizBand() {
  const { t } = useLanguage()

  return (
    <section className="bg-sage-200 py-16 sm:py-20">
      <div className="container-app flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          {t("What's your Relationship Stress Score?", 'आपका Relationship Stress Score क्या है?')}
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-charcoal-700 sm:text-lg">
          {t(
            '7 honest questions. 2 minutes. A personal result sent to your WhatsApp.',
            '7 सच्चे सवाल। 2 मिनट। आपका personal result, सीधे आपके WhatsApp पर।',
          )}
        </p>
        <SecondaryCTA variant="button" label={{ en: 'Take the Free Quiz', hi: 'फ़्री Quiz लें' }} className="mt-2" />
      </div>
    </section>
  )
}
