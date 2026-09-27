import { BookOpen } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LeadGuidesSection } from '@/components/home/LeadGuidesSection'
import { ReflectionSection } from '@/components/home/ReflectionSection'
import { FAQSection } from '@/components/home/FAQSection'
import { useLanguage } from '@/context/language'

const blogPosts = [
  {
    title: {
      en: 'Why the same relationship problem keeps showing up',
      hi: 'रिश्तों में वही परेशानी बार-बार क्यों लौट आती है',
    },
    excerpt: {
      en: 'A look at how relationship patterns form early and quietly repeat across very different relationships.',
      hi: 'रिश्तों के पैटर्न कैसे बचपन में ही बन जाते हैं और बिल्कुल अलग-अलग रिश्तों में चुपचाप दोहराए जाते हैं — इस पर एक नज़र।',
    },
    readMinutes: 6,
  },
  {
    title: {
      en: 'The difference between a boundary and a wall',
      hi: 'सीमा और दीवार में क्या फ़र्क़ है',
    },
    excerpt: {
      en: 'Boundaries are meant to bring people closer, not shut them out. Here’s how to tell the two apart.',
      hi: 'सीमाएँ लोगों को दूर करने के लिए नहीं, क़रीब लाने के लिए होती हैं। जानिए इन दोनों में फ़र्क़ कैसे पहचानें।',
    },
    readMinutes: 5,
  },
  {
    title: {
      en: 'What secure communication actually sounds like',
      hi: 'भरोसे भरी बातचीत असल में कैसी होती है',
    },
    excerpt: {
      en: 'Real examples of how to say hard things without attacking or withdrawing.',
      hi: 'बिना चोट पहुँचाए या पीछे हटे मुश्किल बातें कैसे कहें — असली उदाहरणों के साथ।',
    },
    readMinutes: 7,
  },
]

export function Resources() {
  const { t } = useLanguage()

  return (
    <>
      <section className="section-space bg-cream-50 pb-0 sm:pb-0 lg:pb-0">
        <div className="container-app">
          <SectionHeading
            eyebrow={t('Resources', 'संसाधन')}
            title={t(
              'Tools for understanding yourself and your relationships',
              'ख़ुद को और अपने रिश्तों को समझने के साधन',
            )}
            subtitle={t(
              'Free guides, reflection prompts, and articles to support you between sessions and programs.',
              'मुफ़्त गाइड, आत्म-चिंतन के सवाल और लेख — ताकि सेशन और प्रोग्राम के बीच भी आपका साथ बना रहे।',
            )}
          />
        </div>
      </section>

      <LeadGuidesSection />
      <ReflectionSection />

      <section className="section-space bg-cream-50" id="blog">
        <div className="container-app">
          <SectionHeading eyebrow={t('Blog', 'ब्लॉग')} title={t('From the journal', 'हमारी डायरी से')} />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.title.en}
                className="flex flex-col gap-4 rounded-3xl border border-charcoal-100 bg-cream-100 p-7 shadow-soft"
              >
                <BookOpen size={22} className="text-rose-400" />
                <h3 className="text-lg font-semibold text-charcoal-900">{t(post.title)}</h3>
                <p className="text-sm leading-relaxed text-charcoal-600">{t(post.excerpt)}</p>
                <p className="mt-auto text-xs text-charcoal-400">
                  {t(`${post.readMinutes} min read`, `${post.readMinutes} मिनट में पढ़ें`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  )
}
