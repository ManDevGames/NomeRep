import { SectionHeading } from '@/components/ui/SectionHeading'
import { site } from '@/config/site'
import { useLanguage } from '@/context/language'

const steps = [
  {
    title: 'Decode',
    gloss: 'समझना',
    body: {
      en: 'Understand the hidden patterns, beliefs and past experiences shaping how you love and react today.',
      hi: 'उन छिपे patterns, मान्यताओं और पुराने अनुभवों को समझें जो आज आपके प्यार करने और react करने के तरीके को आकार दे रहे हैं।',
    },
  },
  {
    title: 'Rewire',
    gloss: 'नए सिरे से जोड़ना',
    body: {
      en: 'Calm old emotional triggers through subconscious reprogramming and guided sessions, so you respond instead of react.',
      hi: 'Subconscious reprogramming और guided sessions से पुराने emotional triggers को शांत करें, ताकि आप react करने के बजाय सोच-समझकर जवाब दें।',
    },
  },
  {
    title: 'Rebuild',
    gloss: 'फिर से बनाना',
    body: {
      en: 'Create a relationship, with your partner or with yourself, built on calm communication, healthy boundaries and trust.',
      hi: 'अपने partner के साथ या ख़ुद के साथ, एक ऐसा रिश्ता बनाएँ जिसकी नींव शांत बातचीत, सेहतमंद boundaries और भरोसे पर हो।',
    },
  },
]

export function MethodSection() {
  const { t, lang } = useLanguage()

  return (
    <section className="section-space bg-cream-100" id="method">
      <div className="container-app">
        <SectionHeading
          eyebrow={t('My method', 'मेरा तरीका')}
          title={t(`The ${site.methodName}`, site.methodName)}
          subtitle={t(
            'A gentle, science-informed 3-step process that works at the root, not just the surface.',
            'यानी दिल की पुरानी wiring को प्यार से नए सिरे से जोड़ना। विज्ञान से प्रेरित, 3 क़दमों का एक सौम्य तरीका, जो सिर्फ़ ऊपर-ऊपर नहीं, जड़ पर काम करता है।',
          )}
        />

        <ol className="relative mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-rose-200 md:block" />
          <span aria-hidden="true" className="absolute bottom-10 left-7 top-10 w-px bg-rose-200 md:hidden" />
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-rose-200 bg-cream-50 font-serif text-lg font-semibold text-rose-500">
                0{i + 1}
              </span>
              <div className="flex-1 rounded-3xl bg-cream-50 p-6 shadow-soft md:mt-5">
                <h3 className="text-2xl font-semibold">
                  {step.title}
                  {lang === 'hi' && <span className="ml-2 font-sans text-base font-normal text-charcoal-500">({step.gloss})</span>}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-charcoal-600">{t(step.body)}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-12 max-w-2xl rounded-2xl border border-charcoal-100 bg-cream-50 p-5 text-center text-base leading-relaxed text-charcoal-600">
          <strong className="font-semibold text-charcoal-900">
            {t('How is this different from regular counselling? ', 'यह आम counselling से कैसे अलग है? ')}
          </strong>
          {t(
            'Counselling helps you understand. Rewiring helps you actually feel and respond differently.',
            'Counselling आपको समझने में मदद करती है। Rewiring आपको सच में अलग महसूस करने और अलग तरह से जवाब देने में मदद करती है।',
          )}
        </p>
      </div>
    </section>
  )
}
