import { useLanguage } from '@/context/language'

// TODO: review with a professional (full text comes in Phase 10).
const sections = [
  {
    title: { en: 'Coaching, not therapy', hi: 'Coaching, थेरेपी नहीं' },
    body: {
      en: 'Shalinee Sen is a relationship coach. Coaching is not a substitute for therapy, psychiatric or medical care, and nothing on this site is a diagnosis or treatment.',
      hi: 'Shalinee Sen एक रिलेशनशिप कोच हैं। Coaching, थेरेपी, मनोचिकित्सा या मेडिकल देखभाल की जगह नहीं है, और इस साइट पर कुछ भी डायग्नोसिस या इलाज नहीं है।',
    },
  },
  {
    title: { en: 'No guaranteed outcomes', hi: 'नतीजों की कोई गारंटी नहीं' },
    body: {
      en: 'Every person and relationship is different. Coaching supports your own effort and choices; results cannot be promised.',
      hi: 'हर इंसान और हर रिश्ता अलग होता है। Coaching आपकी अपनी मेहनत और फ़ैसलों में साथ देती है; नतीजों का वादा नहीं किया जा सकता।',
    },
  },
  {
    title: { en: 'If you are in crisis', hi: 'अगर आप संकट में हैं' },
    body: {
      en: 'If you are in danger or thinking of harming yourself, please call 112 (India emergency) or contact local emergency services right away.',
      hi: 'अगर आप ख़तरे में हैं या ख़ुद को नुक़सान पहुँचाने का सोच रही हैं, तो कृपया तुरंत 112 (भारत इमरजेंसी) पर कॉल करें या स्थानीय इमरजेंसी सेवाओं से संपर्क करें।',
    },
  },
]

export function Disclaimer() {
  const { t } = useLanguage()

  return (
    <section className="section-space bg-cream-50">
      <div className="container-app max-w-3xl">
        <span className="eyebrow">{t('Legal', 'क़ानूनी जानकारी')}</span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">{t('Disclaimer', 'डिस्क्लेमर')}</h1>

        <div className="mt-10 flex flex-col gap-8">
          {sections.map((s) => (
            <div key={s.title.en}>
              <h2 className="text-xl font-semibold text-charcoal-900">{t(s.title)}</h2>
              <p className="mt-2 text-base leading-relaxed text-charcoal-600">{t(s.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
