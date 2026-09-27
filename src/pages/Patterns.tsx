import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { PatternCard } from '@/components/patterns/PatternCard'
import { useContent } from '@/hooks/useContent'
import { useLanguage } from '@/context/language'

export function Patterns() {
  const { patterns } = useContent()
  const { t } = useLanguage()

  return (
    <section className="section-space bg-cream-50">
      <div className="container-app">
        <SectionHeading
          eyebrow={t('Relationship patterns', 'रिश्तों के पैटर्न')}
          title={t('Five common relationship patterns', 'रिश्तों के पाँच आम पैटर्न')}
          subtitle={t(
            'These are broad, common patterns people notice in themselves — offered here for reflection, not as fixed labels or diagnoses. Most people recognize a little of themselves in more than one.',
            'ये कुछ आम पैटर्न हैं जो लोग अक्सर ख़ुद में देखते हैं — इन्हें यहाँ सोचने-समझने के लिए दिया गया है, किसी पक्के लेबल या डायग्नोसिस के तौर पर नहीं। ज़्यादातर लोगों को एक से ज़्यादा पैटर्न में अपनी थोड़ी-बहुत झलक दिखती है।',
          )}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {patterns.map((pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-lg text-charcoal-600">
            {t(
              'Curious which pattern resonates most with your relationships?',
              'जानना चाहते हैं कि आपके रिश्तों से कौन-सा पैटर्न सबसे ज़्यादा मेल खाता है?',
            )}
          </p>
          <Button to="/assessment" size="lg">
            {t('Take the Free Assessment', 'मुफ़्त असेसमेंट शुरू करें')} <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  )
}
