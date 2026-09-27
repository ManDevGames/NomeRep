import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useLanguage } from '@/context/language'

const struggles = [
  { en: 'I keep attracting the same kind of person.', hi: 'मेरी ज़िंदगी में बार-बार एक ही तरह के लोग आ जाते हैं।' },
  { en: 'I feel anxious when someone pulls away.', hi: 'कोई दूर होने लगे तो मुझे बेचैनी होने लगती है।' },
  { en: 'I struggle to communicate what I really need.', hi: 'मुझे असल में क्या चाहिए, यह कह पाना मुश्किल लगता है।' },
  { en: 'I give too much and receive too little.', hi: 'मेरी तरफ़ से देना बहुत होता है, पर बदले में मिलता बहुत कम है।' },
  { en: 'I shut down when conflict starts.', hi: 'झगड़ा शुरू होते ही मेरी बोलती बंद हो जाती है।' },
  { en: 'I don’t know why the same problems keep repeating.', hi: 'समझ नहीं आता कि वही परेशानियाँ बार-बार क्यों लौट आती हैं।' },
]

export function ProblemSection() {
  const { t } = useLanguage()

  return (
    <section className="section-space bg-cream-100">
      <div className="container-app">
        <SectionHeading
          eyebrow={t('You’re not imagining it', 'यह सिर्फ़ आपका वहम नहीं है')}
          title={t(
            'Sometimes the problem isn’t the relationship. It’s the pattern.',
            'कभी-कभी दिक़्क़त रिश्ते में नहीं, उस पैटर्न में होती है।',
          )}
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {struggles.map((line) => (
            <div
              key={line.en}
              className="rounded-3xl border border-charcoal-100 bg-cream-50 p-6 sm:p-7 shadow-soft transition-shadow hover:shadow-card"
            >
              <p className="text-lg leading-relaxed text-charcoal-700">&ldquo;{t(line)}&rdquo;</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-6 text-center">
          <p className="max-w-2xl text-xl sm:text-2xl font-serif text-charcoal-800 leading-snug">
            {t(
              'Your relationship patterns are learned. And learned patterns can be understood and changed.',
              'रिश्तों के पैटर्न हम सीखते हैं। और जो सीखा गया है, उसे समझा भी जा सकता है और बदला भी।',
            )}
          </p>
          <Button to="/assessment" size="lg">
            {t('Discover My Pattern', 'मेरा पैटर्न जानें')}
          </Button>
        </div>
      </div>
    </section>
  )
}
