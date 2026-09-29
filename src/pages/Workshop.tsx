import { useEffect, useState } from 'react'
import { CalendarDays, Check, Clock, Video } from 'lucide-react'
import { PhotoPlaceholder } from '@/components/brand/PhotoPlaceholder'
import { FAQSection } from '@/components/brand/FAQAccordion'
import type { FAQ } from '@/components/brand/FAQAccordion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { site, whatsappLink } from '@/config/site'
import { useLanguage } from '@/context/language'
import { track } from '@/lib/analytics'

const learn = [
  { en: 'Why your mind overthinks in love', hi: 'प्यार में मन overthinking क्यों करता है' },
  { en: 'The 3 subconscious triggers behind most fights', hi: 'ज़्यादातर झगड़ों के पीछे के 3 subconscious triggers' },
  { en: 'A 5-minute calming technique you can use anywhere', hi: '5 मिनट की शांत करने वाली technique, जो कहीं भी काम आए' },
  { en: 'How to express your needs without starting a fight', hi: 'बिना झगड़ा शुरू किए अपनी ज़रूरतें कैसे कहें' },
  { en: 'Your next step, whatever your situation', hi: 'आपका अगला क़दम, चाहे आपकी स्थिति जो भी हो' },
]

const forWho = [
  { en: "You replay conversations and read into every silence or 'seen' message.", hi: 'आप बातें दोहराती रहती हैं और हर चुप्पी या "seen" मैसेज का मतलब निकालती हैं।' },
  { en: 'Small things turn into big fights, and you want to break the loop.', hi: 'छोटी बातें बड़े झगड़ों में बदल जाती हैं, और आप यह चक्र तोड़ना चाहती हैं।' },
  { en: 'You want to try working with Shalinee before a bigger commitment.', hi: 'आप किसी बड़े फ़ैसले से पहले Shalinee के साथ काम करके देखना चाहती हैं।' },
]

const faqs: FAQ[] = [
  {
    q: { en: 'Will there be a recording?', hi: 'क्या recording मिलेगी?' },
    a: {
      // TODO: confirm the recording policy
      en: '[Yes, registered participants receive the recording for 7 days after the workshop.] Joining live is best, so you can ask your questions.',
      hi: '[हाँ, registered participants को workshop के बाद 7 दिनों के लिए recording मिलती है।] Live जुड़ना सबसे अच्छा है, ताकि आप अपने सवाल पूछ सकें।',
    },
  },
  {
    q: { en: 'What language is it in?', hi: 'यह किस भाषा में है?' },
    a: {
      // TODO: confirm the workshop language
      en: '[The workshop is in an easy mix of Hindi and English.] You can ask questions in English, Hindi or Bengali.',
      hi: '[Workshop हिंदी और English के आसान मेल में है।] आप English, हिंदी या বাংলা में सवाल पूछ सकती हैं।',
    },
  },
  {
    q: { en: 'Can I get a refund?', hi: 'क्या refund मिल सकता है?' },
    a: {
      // TODO: replace with the final refund policy
      en: 'Refunds follow the policy in our Terms: [workshop refund policy to be confirmed].',
      hi: 'Refund हमारी Terms में दी गई policy के अनुसार होते हैं: [workshop की refund policy तय होनी बाकी है]।',
    },
  },
  {
    q: { en: 'Will my camera need to be on?', hi: 'क्या मुझे camera on रखना होगा?' },
    a: {
      en: 'No. You can keep your camera and mic off and simply listen. Many women prefer that, and it is completely fine.',
      hi: 'नहीं। आप camera और mic बंद रखकर सिर्फ़ सुन सकती हैं। कई महिलाएँ ऐसा ही पसंद करती हैं, और यह बिल्कुल ठीक है।',
    },
  },
]

export function Workshop() {
  const { t } = useLanguage()

  return (
    <>
      {/* 1. Hero */}
      <section className="bg-cream-50">
        <div className="container-app grid grid-cols-1 items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:py-24">
          <div className="flex flex-col items-start gap-6">
            <span className="eyebrow">{t('Live online workshop · 90 minutes', 'Live online workshop · 90 मिनट')}</span>
            <h1 className="text-4xl font-semibold leading-[1.12] sm:text-5xl lg:text-[3.3rem]">{t(site.workshop.title)}</h1>
            <p className="max-w-xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
              {t(
                'Understand why your mind races in love, and leave with simple tools to feel calmer, starting the same evening.',
                'समझिए कि प्यार में मन इतना क्यों दौड़ता है, और ऐसे आसान tools लेकर जाइए जिनसे उसी शाम से ज़्यादा शांत महसूस करें।',
              )}
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base text-charcoal-700">
              <li className="flex items-center gap-2">
                <CalendarDays size={18} className="text-sage-500" aria-hidden="true" /> {t(site.workshop.dateLabel)}
              </li>
              <li className="flex items-center gap-2">
                <Clock size={18} className="text-sage-500" aria-hidden="true" /> {t('90 minutes', '90 मिनट')}
              </li>
              <li className="flex items-center gap-2">
                <Video size={18} className="text-sage-500" aria-hidden="true" /> {t('Online, live', 'Online, live')}
              </li>
            </ul>
            <Countdown />
            <div className="flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
              <ReserveButton location="hero" />
              <p className="font-serif text-3xl font-semibold text-charcoal-900">{site.prices.workshop}</p>
            </div>
          </div>
          <PhotoPlaceholder label="Shalinee hosting a live online workshop, 4:5" aspectRatio="4/5" className="mx-auto max-w-md lg:max-w-none" priority />
        </div>
      </section>

      {/* 2. What you'll learn */}
      <section className="section-space bg-blush-50">
        <div className="container-app">
          <SectionHeading eyebrow={t("What you'll learn", 'आप क्या सीखेंगी')} title={t("In 90 minutes you'll learn…", '90 मिनट में आप सीखेंगी…')} />
          <ol className="mx-auto mt-12 flex max-w-2xl flex-col gap-3">
            {learn.map((item, i) => (
              <li key={item.en} className="flex items-center gap-4 rounded-2xl bg-cream-50 p-5 shadow-soft">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush-100 font-serif font-semibold text-rose-500">{i + 1}</span>
                <span className="text-base font-medium text-charcoal-800">{t(item)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Who it's for + about Shalinee */}
      <section className="section-space bg-cream-50">
        <div className="container-app grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <span className="eyebrow">{t("Who it's for", 'यह किसके लिए है')}</span>
            <h2 className="text-3xl font-semibold sm:text-4xl">{t('This workshop is for you if…', 'यह workshop आपके लिए है, अगर…')}</h2>
            <ul className="flex flex-col gap-3.5">
              {forWho.map((item) => (
                <li key={item.en} className="flex items-start gap-3 text-base leading-relaxed text-charcoal-700">
                  <Check size={18} className="mt-1 shrink-0 text-sage-500" aria-hidden="true" />
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-start gap-5 rounded-3xl bg-cream-100 p-7">
            <PhotoPlaceholder label="Shalinee portrait, 1:1" aspectRatio="1/1" compact className="w-20 shrink-0 rounded-full" />
            <div className="flex flex-col gap-2">
              <span className="eyebrow">{t('Your host', 'आपकी host')}</span>
              <h3 className="text-2xl font-semibold">{site.coachName}</h3>
              <p className="text-base leading-relaxed text-charcoal-600">
                {t(
                  'Former DNA scientist in Germany, now a relationship coach. Shalinee helps women heal relationship stress at the root through subconscious reprogramming and counselling-based coaching.',
                  'जर्मनी में पूर्व DNA साइंटिस्ट, अब relationship coach। Shalinee subconscious reprogramming और counselling-based coaching के ज़रिए महिलाओं को रिश्तों का तनाव जड़ से ठीक करने में मदद करती हैं।',
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection items={faqs} title={{ en: 'Workshop questions', hi: 'Workshop से जुड़े सवाल' }} className="bg-cream-100" />

      {/* Final reserve */}
      <section className="section-space bg-blush-100">
        <div className="container-app flex flex-col items-center gap-5 text-center">
          <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">{t('Save your seat for a calmer mind', 'शांत मन के लिए अपनी seat पक्की करें')}</h2>
          <p className="text-base text-charcoal-600 sm:text-lg">
            {t(site.workshop.dateLabel)} · {site.prices.workshop}
          </p>
          <ReserveButton location="footer" />
        </div>
      </section>
    </>
  )
}

/** Goes to the payment link from config; until one is set, opens WhatsApp so seats can still be reserved. */
function ReserveButton({ location }: { location: string }) {
  const { t } = useLanguage()
  const href =
    site.workshop.paymentUrl ||
    whatsappLink(t(`Hi Shalinee, I'd like to reserve a seat for the "${site.workshop.title.en}" workshop.`, `नमस्ते Shalinee जी, मैं "${site.workshop.title.hi}" workshop के लिए seat reserve करना चाहती हूँ।`))

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => track('workshop_checkout_click', { location })}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-cta px-8 py-3 text-base font-semibold text-white shadow-soft transition-colors hover:bg-cta-hover sm:w-auto"
    >
      {t('Reserve my seat', 'मेरी seat reserve करें')}
    </a>
  )
}

function Countdown() {
  const { t } = useLanguage()
  const target = site.workshop.dateISO ? new Date(site.workshop.dateISO).getTime() : NaN
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (Number.isNaN(target)) return
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [target])

  if (Number.isNaN(target) || target <= now) return null

  const s = Math.floor((target - now) / 1000)
  const parts = [
    { value: Math.floor(s / 86400), label: t('days', 'दिन') },
    { value: Math.floor((s % 86400) / 3600), label: t('hours', 'घंटे') },
    { value: Math.floor((s % 3600) / 60), label: t('min', 'मिनट') },
    { value: s % 60, label: t('sec', 'सेकंड') },
  ]

  return (
    <div className="flex gap-2" role="timer" aria-label={t('Time until the workshop starts', 'Workshop शुरू होने में बाकी समय')}>
      {parts.map((p) => (
        <div key={p.label} className="flex w-16 flex-col items-center rounded-2xl bg-cream-100 py-2">
          <span className="font-serif text-2xl font-semibold tabular-nums text-charcoal-900">{String(p.value).padStart(2, '0')}</span>
          <span className="text-xs text-charcoal-500">{p.label}</span>
        </div>
      ))}
    </div>
  )
}
