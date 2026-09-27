import { ArrowRight, Compass, Eye, RefreshCw, Sprout } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/context/language'

const steps = [
  {
    icon: Eye,
    title: { en: 'Understand', hi: 'समझें' },
    description: {
      en: 'Recognize the patterns affecting your relationships.',
      hi: 'उन पैटर्न को पहचानें जो आपके रिश्तों पर असर डाल रहे हैं।',
    },
  },
  {
    icon: Compass,
    title: { en: 'Reflect', hi: 'सोचें' },
    description: {
      en: 'Understand your emotional triggers and needs.',
      hi: 'अपने भावनात्मक ट्रिगर और ज़रूरतों को समझें।',
    },
  },
  {
    icon: RefreshCw,
    title: { en: 'Reprogram', hi: 'बदलें' },
    description: {
      en: 'Practice healthier responses and communication.',
      hi: 'बेहतर प्रतिक्रिया देने और बात करने का अभ्यास करें।',
    },
  },
  {
    icon: Sprout,
    title: { en: 'Grow', hi: 'आगे बढ़ें' },
    description: {
      en: 'Build sustainable relationship habits.',
      hi: 'रिश्तों की ऐसी आदतें बनाएँ जो लंबे समय तक टिकें।',
    },
  },
]

export function ERPSection() {
  const { t } = useLanguage()

  return (
    // keep-light-palette: this band is dark by design in both themes.
    <section className="keep-light-palette section-space bg-charcoal-900 text-cream-50">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-rose-300">ERP &mdash; Explore Relationship Program</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-cream-50">
            {t('Go beyond understanding your pattern.', 'सिर्फ़ पैटर्न समझने से आगे बढ़ें।')}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-charcoal-100/80">
            {t(
              'Learn practical tools to change the way you communicate, respond, and connect.',
              'ऐसे व्यावहारिक तरीके सीखें जिनसे आपके बात करने, प्रतिक्रिया देने और जुड़ने का ढंग बदल सके।',
            )}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title.en}
              className="relative rounded-3xl border border-cream-50/10 bg-cream-50/5 p-7 backdrop-blur-sm"
            >
              <span className="text-xs font-semibold text-rose-300">{String(i + 1).padStart(2, '0')}</span>
              <step.icon size={26} className="mt-4 text-sage-300" />
              <h3 className="mt-4 text-lg font-semibold text-cream-50">{t(step.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-100/70">{t(step.description)}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button to="/reprogramming" size="lg">
            {t('Explore the Relationship Program', 'रिलेशनशिप प्रोग्राम देखें')} <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  )
}
