import { AssessmentFlow } from '@/components/assessment/AssessmentFlow'
import { useLanguage } from '@/context/language'

export function Assessment() {
  const { t } = useLanguage()

  return (
    <section className="section-space bg-cream-50 min-h-[80vh]">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <span className="eyebrow">{t('Free · 5 minutes · Private', 'मुफ़्त · 5 मिनट · पूरी तरह निजी')}</span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">
            {t('Relationship Pattern Assessment', 'रिलेशनशिप पैटर्न असेसमेंट')}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal-500 leading-relaxed">
            {t(
              'Answer honestly — there are no right or wrong answers. Your responses stay private to you.',
              'ईमानदारी से जवाब दें — यहाँ कोई जवाब सही या ग़लत नहीं है। आपके जवाब सिर्फ़ आप तक रहते हैं।',
            )}
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <AssessmentFlow />
        </div>
      </div>
    </section>
  )
}
