import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PhotoPlaceholder } from '@/components/brand/PhotoPlaceholder'
import { useLanguage } from '@/context/language'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-cream-50">
      <div
        className="pointer-events-none absolute inset-0 bg-noise opacity-[0.35]"
        aria-hidden="true"
      />
      <div className="container-app relative grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col items-start gap-6 animate-fade-in-up">
          <span className="eyebrow">
            {t('Free · 5 minutes · Private · Personalized', 'मुफ़्त · 5 मिनट · पूरी तरह निजी · सिर्फ़ आपके लिए')}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.1] text-charcoal-900">
            {t('Discover Your Relationship Pattern', 'अपना रिलेशनशिप पैटर्न जानें')}
            <span className="block text-rose-400">{t('Free 5-Minute Assessment', 'मुफ़्त 5 मिनट का असेसमेंट')}</span>
          </h1>
          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-charcoal-600">
            {t(
              'Understand the patterns shaping your relationships, discover what may be holding you back, and get practical guidance to start creating healthier connections.',
              'समझें कि कौन-से पैटर्न आपके रिश्तों को आकार दे रहे हैं, जानें कि आपको क्या रोक रहा है, और बेहतर रिश्तों की शुरुआत के लिए काम की सलाह पाएँ।',
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button to="/assessment" size="lg">
              {t('Take the Free Assessment', 'मुफ़्त असेसमेंट शुरू करें')} <ArrowRight size={18} />
            </Button>
            <Button to="/programs" variant="outline" size="lg">
              {t('Explore Relationship Programs', 'रिलेशनशिप प्रोग्राम देखें')}
            </Button>
          </div>
        </div>

        <div className="relative flex items-center justify-center animate-fade-in">
          <PhotoPlaceholder
            label="Shalinee – hero portrait, warm genuine smile, soft natural light, 4:5"
            aspectRatio="4/5"
            className="max-w-md"
            priority
          />
        </div>
      </div>
    </section>
  )
}
