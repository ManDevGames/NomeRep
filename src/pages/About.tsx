import { Compass, FlaskConical, GraduationCap, HeartHandshake, Languages, Leaf, Mail, MessageCircle, Microscope, Sprout } from 'lucide-react'
import { PhotoPlaceholder } from '@/components/brand/PhotoPlaceholder'
import { VideoPlaceholder } from '@/components/brand/VideoPlaceholder'
import { FinalCTA } from '@/components/brand/FinalCTA'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { site, whatsappLink } from '@/config/site'
import { useLanguage } from '@/context/language'

// TODO: replace with Shalinee's own words
const story = [
  {
    heading: { en: 'The scientist years', hi: 'साइंटिस्ट के साल' },
    body: [
      {
        en: 'I spent years in research labs in Germany as a DNA scientist. My work was about one question: how do living systems change? I loved the patience of it, the careful looking, the moment a pattern finally made sense.',
        hi: 'मैंने कई साल जर्मनी की research labs में DNA साइंटिस्ट के तौर पर बिताए। मेरा काम एक सवाल के इर्द-गिर्द था: जीवित systems बदलते कैसे हैं? मुझे उसका धैर्य पसंद था, ध्यान से देखना, और वो पल जब कोई pattern आख़िरकार समझ में आ जाता।',
      },
    ],
  },
  {
    heading: { en: 'The turning point', hi: 'मोड़' },
    body: [
      {
        en: '[A personal moment: the conversation, experience or realisation that changed Shalinee’s direction.] Slowly I understood that the change people long for most isn’t in their cells. It’s in their hearts, and in the relationships that shape their days.',
        hi: '[एक निजी पल: वो बातचीत, अनुभव या एहसास जिसने Shalinee की दिशा बदल दी।] धीरे-धीरे मैंने समझा कि लोग जिस बदलाव के लिए सबसे ज़्यादा तरसते हैं, वो उनकी cells में नहीं, उनके दिल में होता है, और उन रिश्तों में जो उनके हर दिन को आकार देते हैं।',
      },
    ],
  },
  {
    heading: { en: 'Why I do this now', hi: 'मैं आज यह क्यों करती हूँ' },
    body: [
      {
        en: 'Today I bring together a scientist’s way of thinking with subconscious reprogramming and counselling-based coaching. I help women understand why they react the way they do, and gently change it at the root, so they can feel calm, secure and loved again.',
        hi: 'आज मैं एक साइंटिस्ट की सोच को subconscious reprogramming और counselling-based coaching के साथ जोड़ती हूँ। मैं महिलाओं को यह समझने में मदद करती हूँ कि वे जैसे react करती हैं, वैसा क्यों करती हैं, और उसे जड़ से धीरे-धीरे बदलने में, ताकि वे फिर से सुकून, सुरक्षा और प्यार महसूस कर सकें।',
      },
    ],
  },
]

// TODO: replace the bracketed placeholders with real credentials
const credentials = [
  { icon: GraduationCap, label: { en: 'Education', hi: 'शिक्षा' }, value: { en: '[Degree, University]', hi: '[डिग्री, यूनिवर्सिटी]' } },
  { icon: Microscope, label: { en: 'Research', hi: 'Research' }, value: { en: '[DNA research role, Institute, Germany]', hi: '[DNA research भूमिका, संस्थान, जर्मनी]' } },
  { icon: HeartHandshake, label: { en: 'Coaching', hi: 'Coaching' }, value: { en: '[Coaching / reprogramming certifications]', hi: '[Coaching / reprogramming certifications]' } },
  { icon: Languages, label: { en: 'Languages', hi: 'भाषाएँ' }, value: { en: 'English · हिंदी · বাংলা', hi: 'English · हिंदी · বাংলা' } },
]

const values = [
  {
    icon: Leaf,
    title: { en: 'No judgment', hi: 'कोई परख नहीं' },
    body: {
      en: 'Whatever you’re feeling, it makes sense. You can say it here exactly as it is.',
      hi: 'आप जो भी महसूस कर रही हैं, उसकी वजह है। यहाँ आप अपनी बात बिल्कुल वैसे ही कह सकती हैं जैसी वो है।',
    },
  },
  {
    icon: Sprout,
    title: { en: 'Root, not surface', hi: 'जड़, सतह नहीं' },
    body: {
      en: 'We don’t just manage the fights. We gently change what keeps creating them.',
      hi: 'हम सिर्फ़ झगड़ों को सँभालते नहीं। हम उस चीज़ को धीरे से बदलते हैं जो उन्हें बार-बार पैदा करती है।',
    },
  },
  {
    icon: FlaskConical,
    title: { en: 'Science-informed', hi: 'विज्ञान से प्रेरित' },
    body: {
      en: 'Curious, careful and practical. No big promises, just what genuinely helps.',
      hi: 'जिज्ञासु, सावधान और व्यावहारिक। कोई बड़े वादे नहीं, बस वही जो सच में मदद करे।',
    },
  },
  {
    icon: Compass,
    title: { en: 'Your pace', hi: 'आपकी रफ़्तार' },
    body: {
      en: 'Healing isn’t a race. We move at the speed that feels safe for you.',
      hi: 'Healing कोई दौड़ नहीं है। हम उसी रफ़्तार से चलते हैं जो आपके लिए सुरक्षित लगे।',
    },
  },
]

export function About() {
  const { t } = useLanguage()

  return (
    <>
      {/* 1. Hero */}
      <section className="bg-cream-50">
        <div className="container-app grid grid-cols-1 items-center gap-12 py-12 sm:py-16 md:grid-cols-2 lg:gap-16 lg:py-24">
          <div className="flex flex-col items-start gap-5">
            <span className="eyebrow">{t('About Shalinee', 'Shalinee के बारे में')}</span>
            <h1 className="text-5xl font-semibold leading-[1.1] sm:text-6xl">{t("Hi, I'm Shalinee.", 'नमस्ते, मैं Shalinee हूँ।')}</h1>
            <p className="max-w-lg text-lg leading-relaxed text-charcoal-600 sm:text-xl">
              {t(
                'Former DNA scientist. Now a relationship coach helping women heal at the root.',
                'पूर्व DNA साइंटिस्ट। अब एक relationship coach, जो महिलाओं को जड़ से healing में मदद करती हैं।',
              )}
            </p>
          </div>
          <PhotoPlaceholder label="Shalinee main portrait, 4:5" aspectRatio="4/5" className="mx-auto max-w-md" priority />
        </div>
      </section>

      {/* 2. Story */}
      <section className="section-space bg-cream-100">
        <div className="container-app max-w-3xl">
          <span className="eyebrow">{t('My story', 'मेरी कहानी')}</span>
          <div className="mt-8 flex flex-col gap-12">
            {story.map((part, i) => (
              <div key={part.heading.en} className="flex flex-col gap-4">
                <h2 className="text-3xl font-semibold sm:text-4xl">{t(part.heading)}</h2>
                {part.body.map((p) => (
                  <p key={p.en} className="text-base leading-relaxed text-charcoal-700 sm:text-lg">
                    {t(p)}
                  </p>
                ))}
                {i === 0 && <PhotoPlaceholder label="Shalinee in Germany / lab days, 3:2" aspectRatio="3/2" className="mt-4" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Credentials */}
      <section className="border-y border-charcoal-100 bg-cream-50 py-12">
        <ul className="container-app grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map(({ icon: Icon, label, value }) => (
            <li key={label.en} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-500">
                <Icon size={19} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-charcoal-500">{t(label)}</span>
                <span className="mt-1 block text-base text-charcoal-800">{t(value)}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. What I believe */}
      <section className="section-space bg-cream-50">
        <div className="container-app">
          <SectionHeading eyebrow={t('What I believe', 'मेरा विश्वास')} title={t('How I work with you', 'मैं आपके साथ कैसे काम करती हूँ')} />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title.en} className="flex flex-col gap-3 rounded-3xl border border-charcoal-100 bg-cream-100 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blush-100 text-rose-400">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold">{t(title)}</h3>
                <p className="text-base leading-relaxed text-charcoal-600">{t(body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Video */}
      <section className="section-space bg-cream-100">
        <div className="container-app flex flex-col items-center gap-8">
          <h2 className="text-center text-3xl font-semibold sm:text-4xl">{t('In my own words', 'मेरे अपने शब्दों में')}</h2>
          <VideoPlaceholder label="Shalinee tells her story, 2 min" className="max-w-3xl" />
        </div>
      </section>

      {/* Contact (the footer's "Contact" link lands here) */}
      <section className="bg-cream-50 py-14" id="contact">
        <div className="container-app flex flex-col items-center gap-5 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">{t('Get in touch', 'संपर्क करें')}</h2>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={whatsappLink(t(site.contact.whatsappMessage))}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-charcoal-300/50 px-6 text-base font-medium text-charcoal-800 hover:border-rose-300 hover:bg-blush-50"
            >
              <MessageCircle size={18} aria-hidden="true" /> WhatsApp
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-charcoal-300/50 px-6 text-base font-medium text-charcoal-800 hover:border-rose-300 hover:bg-blush-50"
            >
              <Mail size={18} aria-hidden="true" /> {site.contact.email}
            </a>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <FinalCTA />
    </>
  )
}
