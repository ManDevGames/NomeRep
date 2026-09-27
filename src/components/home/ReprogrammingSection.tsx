import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/context/language'

const steps = [
  { en: 'Understand your pattern', hi: 'अपने पैटर्न को समझें' },
  { en: 'Identify recurring triggers', hi: 'बार-बार उभरने वाले ट्रिगर पहचानें' },
  { en: 'Work through relationship challenges', hi: 'रिश्तों की मुश्किलों पर साथ मिलकर काम करें' },
  { en: 'Build healthier responses', hi: 'बेहतर प्रतिक्रिया देना सीखें' },
  { en: 'Create a personalized action plan', hi: 'अपने लिए एक ख़ास एक्शन प्लान बनाएँ' },
]

export function ReprogrammingSection() {
  const { t } = useLanguage()

  return (
    <section className="section-space bg-blush-50">
      <div className="container-app grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Relationship Reprogramming &mdash; 1:1</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold leading-tight text-charcoal-900">
            {t('Sometimes you don’t need more information.', 'कभी-कभी आपको और जानकारी की ज़रूरत नहीं होती।')}
          </h2>
          <p className="mt-4 max-w-lg text-base sm:text-lg leading-relaxed text-charcoal-600">
            {t(
              'You need someone to help you understand what’s happening in your relationship and work through it with you.',
              'ज़रूरत होती है किसी ऐसे की, जो आपके रिश्ते में चल रही बातों को समझने में मदद करे और उन्हें सुलझाने में आपके साथ रहे।',
            )}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button to="/reprogramming" size="lg">
              {t('Talk to a Counselor', 'काउंसलर से बात करें')} <ArrowRight size={18} />
            </Button>
            <Button to="/reprogramming" variant="outline" size="lg">
              {t('How 1:1 Reprogramming Works', '1:1 रीप्रोग्रामिंग कैसे काम करती है')}
            </Button>
          </div>
        </div>

        <ol className="flex flex-col gap-3">
          {steps.map((step, i) => (
            <li
              key={step.en}
              className="flex items-center gap-4 rounded-2xl border border-charcoal-100 bg-cream-50 px-5 py-4 shadow-soft"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-500">
                {i + 1}
              </span>
              <span className="text-sm sm:text-base text-charcoal-700">{t(step)}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
