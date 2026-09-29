import { Check } from 'lucide-react'
import { PrimaryCTA } from '@/components/brand/CTA'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useLanguage } from '@/context/language'

const pains = [
  {
    en: 'Every small thing turns into a fight, and you regret it later.',
    hi: 'हर छोटी बात झगड़े में बदल जाती है, और बाद में आपको पछतावा होता है।',
  },
  {
    en: 'You give and give, but feel unseen in return.',
    hi: 'आप बस देती रहती हैं, पर बदले में ख़ुद को अनदेखा महसूस करती हैं।',
  },
  {
    en: "You can't relax until you know what he's doing or who he's talking to.",
    hi: 'जब तक पता न चले कि वो क्या कर रहा है या किससे बात कर रहा है, आपको चैन नहीं आता।',
  },
  {
    en: 'Months after the breakup, your mind is still stuck there.',
    hi: 'Breakup को महीनों हो गए, पर मन अब भी वहीं अटका है।',
  },
  {
    en: "You're married, but the talking and closeness have faded.",
    hi: 'शादी तो है, पर बातें और नज़दीकियाँ कहीं खो गई हैं।',
  },
  {
    en: 'Every new relationship ends up following the same painful story.',
    hi: 'हर नया रिश्ता आख़िर में उसी दर्द भरी कहानी पर पहुँच जाता है।',
  },
  {
    en: 'You overthink every message, every silence, every change in tone.',
    hi: 'हर मैसेज, हर चुप्पी, आवाज़ के हर बदलाव पर आप overthinking करती हैं।',
  },
  {
    en: 'You feel lonely even when you’re together.',
    hi: 'साथ होते हुए भी आप अकेलापन महसूस करती हैं।',
  },
]

export function PainSection() {
  const { t } = useLanguage()

  return (
    <section className="section-space bg-blush-50">
      <div className="container-app">
        <SectionHeading
          eyebrow={t("You're not imagining it", 'यह आपका वहम नहीं है')}
          title={t('Does any of this feel familiar?', 'क्या इनमें से कुछ जाना-पहचाना लगता है?')}
        />

        <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          {pains.map((pain) => (
            <li key={pain.en} className="flex items-start gap-3 rounded-2xl bg-cream-50 p-5 shadow-soft">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-400">
                <Check size={14} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="text-base leading-relaxed text-charcoal-700">{t(pain)}</span>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-12 max-w-3xl text-center font-serif text-xl leading-relaxed text-charcoal-900 sm:text-2xl">
          {t(
            "If more than two of these feel true, it's not your fault. It's your subconscious programming, and programming can be changed.",
            'अगर इनमें से दो से ज़्यादा बातें सच लगती हैं, तो इसमें आपकी कोई ग़लती नहीं है। यह आपकी subconscious programming है, और programming बदली जा सकती है।',
          )}
        </p>
        <div className="mt-8 flex justify-center">
          <PrimaryCTA />
        </div>
      </div>
    </section>
  )
}
