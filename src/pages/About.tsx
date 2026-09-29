import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/context/language'

const values = [
  {
    title: { en: 'Understanding over judgment', hi: 'परखने से पहले समझना' },
    description: {
      en: 'We approach every pattern with curiosity, not criticism — patterns are learned, and can be understood.',
      hi: 'हम हर पैटर्न को आलोचना से नहीं, जिज्ञासा से देखते हैं — पैटर्न सीखे जाते हैं, और उन्हें समझा जा सकता है।',
    },
  },
  {
    title: { en: 'Privacy by default', hi: 'प्राइवेसी सबसे पहले' },
    description: {
      en: 'Your reflections and assessment responses are yours. We keep them private and never sell your data.',
      hi: 'आपका आत्म-चिंतन और असेसमेंट के जवाब सिर्फ़ आपके हैं। हम इन्हें निजी रखते हैं और आपका डेटा कभी नहीं बेचते।',
    },
  },
  {
    title: { en: 'Practical, not performative', hi: 'दिखावा नहीं, असली बदलाव' },
    description: {
      en: 'We favor small, doable practices over grand promises. Real change tends to happen gradually.',
      hi: 'बड़े-बड़े वादों के बजाय हम छोटे, आसानी से अपनाए जा सकने वाले अभ्यासों पर भरोसा करते हैं। असली बदलाव धीरे-धीरे ही आता है।',
    },
  },
  {
    title: { en: 'Rooted in India, open to everyone', hi: 'जड़ें भारत में, दरवाज़े सबके लिए खुले' },
    description: {
      en: 'Built with Indian languages, pricing, and context in mind — while staying relevant for anyone, anywhere.',
      hi: 'भारतीय भाषाओं, क़ीमतों और माहौल को ध्यान में रखकर बनाया गया — ताकि कहीं भी, कोई भी इसका फ़ायदा उठा सके।',
    },
  },
]

export function About() {
  const { t } = useLanguage()

  return (
    <>
      <section className="section-space bg-cream-50">
        <div className="container-app">
          <SectionHeading
            eyebrow={t('About Shalinee Sen', 'Shalinee Sen के बारे में')}
            title={t(
              'A calm place to understand yourself and your relationships',
              'ख़ुद को और अपने रिश्तों को समझने की एक सुकून भरी जगह',
            )}
            subtitle={t(
              'That’s what we set out to build — a steady, honest guide for the parts of relationships that are hardest to talk about.',
              'हम यही बनाना चाहते थे — रिश्तों की उन बातों के लिए एक भरोसेमंद, ईमानदार साथी, जिन पर बात करना सबसे मुश्किल होता है।',
            )}
          />

          <div className="mt-14 mx-auto max-w-3xl text-base leading-relaxed text-charcoal-600 space-y-5">
            <p>
              {t(
                'Most of us weren’t taught how relationship patterns form, or how to recognize the ones we’re carrying. We repeat what feels familiar, often without knowing why — until the same dynamic shows up again, in a different relationship, with a different person.',
                'हममें से ज़्यादातर को कभी यह नहीं सिखाया गया कि रिश्तों के पैटर्न बनते कैसे हैं, या अपने भीतर के पैटर्न पहचानें कैसे। जो जाना-पहचाना लगता है, हम वही दोहराते रहते हैं — अक्सर बिना यह जाने कि क्यों — जब तक वही सिलसिला किसी नए रिश्ते में, किसी नए इंसान के साथ फिर से सामने नहीं आ जाता।',
              )}
            </p>
            <p>
              {t(
                'Shalinee Sen started as a simple idea: give people a clear, compassionate mirror for their relationship patterns, and practical tools to work with what they find. No jargon, no judgment, and no promise of instant fixes — just honest reflection and steady practice.',
                'Shalinee Sen की शुरुआत एक सीधे-से ख़याल से हुई: लोगों को उनके रिश्तों के पैटर्न का एक साफ़ और हमदर्द आईना देना, और जो दिखे उस पर काम करने के व्यावहारिक तरीके देना। न भारी-भरकम शब्द, न कोई परख, न रातों-रात सब ठीक करने का वादा — बस ईमानदार आत्म-चिंतन और लगातार अभ्यास।',
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-cream-100">
        <div className="container-app">
          <SectionHeading eyebrow={t('What guides us', 'हमारी सोच')} title={t('Our approach', 'हमारा नज़रिया')} />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title.en} className="rounded-3xl border border-charcoal-100 bg-cream-50 p-7 shadow-soft">
                <h3 className="text-lg font-semibold text-charcoal-900">{t(v.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{t(v.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-cream-50" id="contact">
        <div className="container-app">
          <div className="mx-auto max-w-2xl rounded-3xl border border-charcoal-100 bg-blush-50 p-8 sm:p-10 text-center">
            <SectionHeading
              eyebrow={t('Get in touch', 'संपर्क करें')}
              title={t('We’d love to hear from you', 'हमें आपसे बात करके ख़ुशी होगी')}
            />
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="mailto:hello@relationshipguide.app" variant="outline" size="md">
                <Mail size={16} /> hello@relationshipguide.app
              </Button>
              <Button href="https://wa.me/919311088577" variant="outline" size="md">
                <MessageCircle size={16} /> {t('WhatsApp Us', 'WhatsApp करें')}
              </Button>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-charcoal-500">
              <MapPin size={15} />{' '}
              {t('Bengaluru, India · Sessions available nationwide', 'बेंगलुरु, भारत · पूरे देश में सेशन उपलब्ध')}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
