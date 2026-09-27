import { ClipboardList, Heart, Sparkles } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AssessmentFlow } from '@/components/assessment/AssessmentFlow'
import { useLanguage } from '@/context/language'

const howItWorks = [
  {
    icon: ClipboardList,
    title: { en: 'Answer honestly', hi: 'ईमानदारी से जवाब दें' },
    description: {
      en: 'Seven quick questions about how you typically show up in relationships.',
      hi: 'सात छोटे सवाल, इस बारे में कि रिश्तों में आप आमतौर पर कैसे पेश आते हैं।',
    },
  },
  {
    icon: Sparkles,
    title: { en: 'See your pattern', hi: 'अपना पैटर्न देखें' },
    description: {
      en: 'Get a personalized reflection on the pattern your responses suggest.',
      hi: 'आपके जवाबों से जो पैटर्न झलकता है, उस पर सिर्फ़ आपके लिए तैयार विश्लेषण पाएँ।',
    },
  },
  {
    icon: Heart,
    title: { en: 'Explore next steps', hi: 'आगे का रास्ता चुनें' },
    description: {
      en: 'Discover programs and guidance suited to where you are right now.',
      hi: 'ऐसे प्रोग्राम और सलाह पाएँ, जो आपकी अभी की स्थिति के हिसाब से सही हों।',
    },
  },
]

export function AssessmentPromo() {
  const { t } = useLanguage()

  return (
    <section className="section-space bg-cream-50" id="assessment">
      <div className="container-app">
        <SectionHeading
          eyebrow={t('Relationship Pattern Assessment', 'रिलेशनशिप पैटर्न असेसमेंट')}
          title={t('Relationship Pattern Assessment', 'रिलेशनशिप पैटर्न असेसमेंट')}
          subtitle={t(
            'Five minutes can give you a clearer picture of the patterns influencing your relationships.',
            'सिर्फ़ पाँच मिनट में आप साफ़ देख पाएँगे कि कौन-से पैटर्न आपके रिश्तों पर असर डाल रहे हैं।',
          )}
        />

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
          {howItWorks.map((item) => (
            <div key={item.title.en} className="flex flex-col items-center gap-2 rounded-2xl bg-cream-100 p-5 text-center">
              <item.icon size={22} className="text-rose-400" />
              <h3 className="text-sm font-semibold text-charcoal-800">{t(item.title)}</h3>
              <p className="text-xs leading-relaxed text-charcoal-500">{t(item.description)}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <AssessmentFlow />
        </div>
      </div>
    </section>
  )
}
