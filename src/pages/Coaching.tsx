import { ArrowRight, BookOpen, Check, ClipboardList, Headphones, Languages, MessageCircle, Video, X } from 'lucide-react'
import { PrimaryCTA } from '@/components/brand/CTA'
import { PhotoPlaceholder } from '@/components/brand/PhotoPlaceholder'
import { ClientStories } from '@/components/brand/TestimonialCard'
import { FAQSection } from '@/components/brand/FAQAccordion'
import type { FAQ } from '@/components/brand/FAQAccordion'
import { FinalCTA } from '@/components/brand/FinalCTA'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { site } from '@/config/site'
import { useLanguage } from '@/context/language'

const forYou = [
  { en: 'The same arguments keep coming back, no matter how hard you try.', hi: 'चाहे आप कितनी भी कोशिश करें, वही बहस बार-बार लौट आती है।' },
  { en: 'You overthink his messages, his silence, his mood.', hi: 'आप उसके मैसेज, उसकी चुप्पी, उसके mood पर overthinking करती हैं।' },
  { en: "You feel distant from your husband or partner, even though you're together.", hi: 'साथ होते हुए भी आप अपने पति या partner से दूर महसूस करती हैं।' },
  { en: 'Trust feels hard, and you hate how anxious it makes you.', hi: 'भरोसा करना मुश्किल लगता है, और उससे होने वाली बेचैनी आपको परेशान करती है।' },
  { en: "You can't move on from a breakup or divorce.", hi: 'आप किसी breakup या divorce से आगे नहीं बढ़ पा रहीं।' },
  { en: "You're ready to look inward and change the pattern, not just the partner.", hi: 'आप अपने अंदर झाँकने और pattern बदलने को तैयार हैं, सिर्फ़ partner नहीं।' },
]

const notForYou = [
  { en: 'You want a quick fix or a magic answer.', hi: 'आपको तुरंत हल या कोई जादुई जवाब चाहिए।' },
  { en: "You're not willing to look inward.", hi: 'आप अपने अंदर झाँकने के लिए तैयार नहीं हैं।' },
  {
    en: "You're in an abusive or unsafe situation and need immediate professional or legal help. Please reach out to them first; your safety comes before everything.",
    hi: 'आप किसी हिंसक या असुरक्षित स्थिति में हैं और आपको तुरंत professional या क़ानूनी मदद चाहिए। कृपया पहले उनसे संपर्क करें; आपकी सुरक्षा सबसे पहले है।',
  },
  { en: 'You need clinical or medical treatment.', hi: 'आपको clinical या medical इलाज की ज़रूरत है।' },
]

const changes = [
  { before: { en: 'Constant fights', hi: 'लगातार झगड़े' }, after: { en: 'Calm conversations', hi: 'शांत बातचीत' } },
  { before: { en: 'Overthinking every message', hi: 'हर मैसेज पर overthinking' }, after: { en: 'Feeling secure', hi: 'सुरक्षित महसूस करना' } },
  { before: { en: 'Stuck on the past', hi: 'अतीत में अटकी रहना' }, after: { en: 'Free to move forward', hi: 'आगे बढ़ने की आज़ादी' } },
  { before: { en: 'Giving and feeling unseen', hi: 'देते रहना, फिर भी अनदेखा महसूस करना' }, after: { en: 'Asking for what you need', hi: 'अपनी ज़रूरत खुलकर कहना' } },
  { before: { en: 'Lonely together', hi: 'साथ होकर भी अकेलापन' }, after: { en: 'Feeling close again', hi: 'फिर से नज़दीकी महसूस करना' } },
]

const weeks = [
  { en: 'Clarity & Decode', hi: 'Clarity और Decode' },
  { en: 'Root patterns & triggers', hi: 'जड़ के patterns और triggers' },
  { en: 'Subconscious reprogramming I', hi: 'Subconscious reprogramming I' },
  { en: 'Emotional release & self-worth', hi: 'Emotional release और self-worth' },
  { en: 'Subconscious reprogramming II', hi: 'Subconscious reprogramming II' },
  { en: 'Communication that connects', hi: 'जोड़ने वाली बातचीत' },
  { en: 'Boundaries & trust', hi: 'Boundaries और भरोसा' },
  { en: 'Your new relationship blueprint', hi: 'आपके नए रिश्ते का blueprint' },
]

const includes = [
  { icon: Video, label: { en: '8 private 60-min sessions (video or audio)', hi: '8 निजी, 60 मिनट के sessions (video या audio)' } },
  { icon: Headphones, label: { en: 'Personalised reprogramming audios for daily practice', hi: 'रोज़ के अभ्यास के लिए आपके हिसाब से बने reprogramming audios' } },
  { icon: MessageCircle, label: { en: 'WhatsApp support between sessions (Mon–Sat)', hi: 'Sessions के बीच WhatsApp पर साथ (सोम–शनि)' } },
  { icon: BookOpen, label: { en: 'Heart Rewiring workbook', hi: 'Heart Rewiring workbook' } },
  { icon: ClipboardList, label: { en: 'A personalised action plan', hi: 'आपके लिए बना action plan' } },
  { icon: Languages, label: { en: 'Sessions in English, Hindi or Bengali', hi: 'English, हिंदी या বাংলা में sessions' } },
]

const faqs: FAQ[] = [
  {
    q: { en: 'How are sessions scheduled?', hi: 'Sessions का समय कैसे तय होता है?' },
    a: {
      en: 'We meet once a week at a time that suits you, usually on the same day each week. Sessions are online, so you can join from home, office or wherever you feel private.',
      hi: 'हम हफ़्ते में एक बार, आपकी सुविधा के समय पर मिलते हैं, आम तौर पर हर हफ़्ते एक ही दिन। Sessions online होते हैं, तो आप घर, office या जहाँ भी आपको निजता लगे, वहाँ से जुड़ सकती हैं।',
    },
  },
  {
    q: { en: 'What if I miss a session?', hi: 'अगर कोई session छूट जाए तो?' },
    a: {
      en: "Life happens. If you let me know at least 24 hours before, we'll simply reschedule. The program is designed with a little flexibility built in.",
      hi: 'ज़िंदगी में ऐसा होता है। अगर आप कम से कम 24 घंटे पहले बता दें, तो हम session आगे कर लेंगे। Program में इतनी गुंजाइश पहले से रखी गई है।',
    },
  },
  {
    q: { en: "What if my partner won't join?", hi: 'अगर मेरा partner साथ न आए तो?' },
    a: {
      en: "That's completely fine. This program is designed for you. As your reactions and patterns change, the way your relationship feels often changes too.",
      hi: 'यह बिल्कुल ठीक है। यह program आपके लिए बना है। जैसे-जैसे आपकी प्रतिक्रियाएँ और patterns बदलते हैं, अक्सर रिश्ते का एहसास भी बदलने लगता है।',
    },
  },
  {
    q: { en: 'Is what I share kept private?', hi: 'क्या मेरी बातें निजी रहेंगी?' },
    a: {
      en: 'Yes. Everything you share stays between us. Sessions are never recorded without your permission, and your details are never shared with anyone.',
      hi: 'हाँ। आप जो भी बताती हैं, वो हमारे बीच रहता है। आपकी अनुमति के बिना sessions कभी record नहीं होते, और आपकी जानकारी किसी से साझा नहीं की जाती।',
    },
  },
  {
    q: { en: 'What is the refund policy?', hi: 'Refund policy क्या है?' },
    a: {
      // TODO: replace with the final refund policy
      en: 'Refunds follow the policy in our Terms: [refund policy to be confirmed]. We talk it through on the Clarity Call so you know exactly what you are signing up for.',
      hi: 'Refund हमारी Terms में दी गई policy के अनुसार होते हैं: [refund policy तय होनी बाकी है]। Clarity Call पर हम इस पर बात करते हैं, ताकि आपको पूरी जानकारी हो।',
    },
  },
  {
    q: { en: 'Is it online only?', hi: 'क्या यह सिर्फ़ online है?' },
    a: {
      en: 'Yes. All sessions happen online by video or audio call, so you can join from anywhere in India or abroad.',
      hi: 'हाँ। सभी sessions video या audio call पर online होते हैं, तो आप भारत या विदेश में कहीं से भी जुड़ सकती हैं।',
    },
  },
]

export function Coaching() {
  const { t } = useLanguage()

  return (
    <>
      {/* 1. Hero */}
      <section className="bg-cream-50">
        <div className="container-app grid grid-cols-1 items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-24">
          <div className="flex flex-col items-start gap-6">
            <span className="eyebrow">{t('Private 1:1 coaching', 'निजी 1:1 coaching')}</span>
            <h1 className="text-4xl font-semibold leading-[1.12] sm:text-5xl lg:text-[3.3rem]">{site.programName}</h1>
            <p className="max-w-xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
              {t(
                '8 weeks of private, personalised coaching to heal relationship stress at the root and feel calm, secure and loved again.',
                '8 हफ़्तों की निजी, आपके हिसाब से बनी coaching, ताकि रिश्तों का तनाव जड़ से ठीक हो और आप फिर से सुकून, सुरक्षा और प्यार महसूस करें।',
              )}
            </p>
            <PrimaryCTA placement="hero" className="w-full sm:w-auto sm:px-8" />
          </div>
          <PhotoPlaceholder
            label="Shalinee on a video session, laptop, warm setting, 4:5"
            aspectRatio="4/5"
            className="mx-auto max-w-md lg:max-w-none"
            priority
          />
        </div>
      </section>

      {/* 2. Who it's for */}
      <section className="section-space bg-blush-50">
        <div className="container-app">
          <SectionHeading eyebrow={t("Who it's for", 'यह किसके लिए है')} title={t('Is this program right for you?', 'क्या यह program आपके लिए सही है?')} />
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-cream-50 p-7 shadow-soft">
              <h3 className="text-2xl font-semibold">{t('This is for you if…', 'यह आपके लिए है, अगर…')}</h3>
              <ul className="mt-5 flex flex-col gap-3.5">
                {forYou.map((item) => (
                  <li key={item.en} className="flex items-start gap-3 text-base leading-relaxed text-charcoal-700">
                    <Check size={18} className="mt-1 shrink-0 text-sage-500" aria-hidden="true" />
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-charcoal-100 bg-cream-100 p-7">
              <h3 className="text-2xl font-semibold">{t('This is NOT for you if…', 'यह आपके लिए नहीं है, अगर…')}</h3>
              <ul className="mt-5 flex flex-col gap-3.5">
                {notForYou.map((item) => (
                  <li key={item.en} className="flex items-start gap-3 text-base leading-relaxed text-charcoal-700">
                    <X size={18} className="mt-1 shrink-0 text-rose-500" aria-hidden="true" />
                    {t(item)}
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl bg-cream-50 p-4 text-sm leading-relaxed text-charcoal-600">
                {t(
                  'If you are in danger right now, please call 112 (India emergency) or reach out to someone you trust.',
                  'अगर आप अभी ख़तरे में हैं, तो कृपया 112 (भारत इमरजेंसी) पर कॉल करें या किसी भरोसेमंद इंसान से संपर्क करें।',
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What changes */}
      <section className="section-space bg-cream-50">
        <div className="container-app">
          <SectionHeading eyebrow={t('What changes', 'क्या बदलता है')} title={t('From where you are, to where you want to be', 'आप जहाँ हैं, वहाँ से जहाँ पहुँचना चाहती हैं')} />
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-charcoal-100">
            <div className="grid grid-cols-[1fr_auto_1fr] bg-cream-100 text-xs font-semibold uppercase tracking-[0.14em]">
              <span className="px-4 py-3 text-charcoal-500 sm:px-6">{t('Before', 'पहले')}</span>
              <span />
              <span className="px-4 py-3 text-sage-600 sm:px-6">{t('After', 'बाद में')}</span>
            </div>
            {changes.map((row) => (
              <div key={row.before.en} className="grid grid-cols-[1fr_auto_1fr] items-center border-t border-charcoal-100 bg-cream-50">
                <span className="px-4 py-4 text-base text-charcoal-600 sm:px-6">{t(row.before)}</span>
                <ArrowRight size={18} className="text-rose-300" aria-label={t('becomes', 'बनता है')} />
                <span className="px-4 py-4 font-serif text-lg text-charcoal-900 sm:px-6">{t(row.after)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The 8-week journey */}
      <section className="section-space bg-cream-100">
        <div className="container-app">
          <SectionHeading eyebrow={t('The 8-week journey', '8 हफ़्तों का सफ़र')} title={t('One gentle step each week', 'हर हफ़्ते एक सौम्य क़दम')} />
          <ol className="relative mx-auto mt-12 max-w-2xl">
            <span aria-hidden="true" className="absolute bottom-6 left-7 top-6 w-px bg-rose-200" />
            {weeks.map((week, i) => (
              <li key={week.en} className="relative flex items-center gap-5 py-3">
                <span className="relative z-10 flex h-14 w-14 shrink-0 flex-col items-center justify-center gap-1 rounded-full border border-rose-200 bg-cream-50 text-rose-500">
                  <span className="text-[0.6rem] font-semibold uppercase leading-none tracking-wider">{t('Week', 'हफ़्ता')}</span>
                  <span className="font-serif text-lg font-semibold leading-none">{i + 1}</span>
                </span>
                <span className="flex-1 rounded-2xl bg-cream-50 px-5 py-4 text-base font-medium text-charcoal-800 shadow-soft">{t(week)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. What you get */}
      <section className="section-space bg-cream-50">
        <div className="container-app">
          <SectionHeading eyebrow={t('What you get', 'आपको क्या मिलता है')} title={t("Everything that's included", 'इसमें क्या-क्या शामिल है')} />
          <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {includes.map(({ icon: Icon, label }) => (
              <li key={label.en} className="flex items-start gap-4 rounded-3xl border border-charcoal-100 bg-cream-100 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush-100 text-rose-500">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="text-base leading-relaxed text-charcoal-700">{t(label)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Why Shalinee */}
      <section className="section-space bg-sage-50">
        <div className="container-app grid grid-cols-1 items-center gap-10 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <PhotoPlaceholder label="Shalinee portrait, 1:1" aspectRatio="1/1" className="mx-auto max-w-sm" />
          <div className="flex flex-col items-start gap-5">
            <span className="eyebrow">{t('Why Shalinee', 'Shalinee ही क्यों')}</span>
            <h2 className="text-3xl font-semibold leading-[1.2] sm:text-4xl">
              {t('A scientist’s clarity, a coach’s compassion', 'एक साइंटिस्ट की स्पष्टता, एक कोच की करुणा')}
            </h2>
            {/* TODO: replace with Shalinee's own words and real credentials */}
            <ul className="flex flex-col gap-3 text-base leading-relaxed text-charcoal-700">
              {[
                t('Former DNA scientist, research in Germany', 'पूर्व DNA साइंटिस्ट, जर्मनी में research'),
                t('Trained in subconscious reprogramming and counselling-based coaching [certifications]', 'Subconscious reprogramming और counselling-based coaching में प्रशिक्षित [certifications]'),
                t(`${site.stats.clientsHelped} women supported · ${site.stats.yearsExperience} years of experience`, `${site.stats.clientsHelped} महिलाओं का साथ · ${site.stats.yearsExperience} साल का अनुभव`),
                t('Sessions in English, Hindi and Bengali', 'English, हिंदी और বাংলা में sessions'),
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <Check size={18} className="mt-1 shrink-0 text-sage-500" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Client stories */}
      <section className="section-space bg-cream-50">
        <div className="container-app">
          <SectionHeading eyebrow={t('Client stories', 'Clients की कहानियाँ')} title={t('Real women. Real change.', 'असली महिलाएँ। असली बदलाव।')} />
          <div className="mt-12">
            <ClientStories limit={3} />
          </div>
        </div>
      </section>

      {/* 8. Investment */}
      <section className="section-space bg-cream-100" id="investment">
        <div className="container-app">
          <SectionHeading eyebrow={t('Investment', 'निवेश')} title={t('One program. Everything included.', 'एक program। सब कुछ शामिल।')} />
          <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-5 rounded-3xl border-2 border-rose-300 bg-cream-50 p-8 text-center shadow-card">
            <h3 className="text-2xl font-semibold">{site.programName}</h3>
            <p className="text-sm text-charcoal-500">{t('8 weeks · Private 1:1 · Online', '8 हफ़्ते · निजी 1:1 · Online')}</p>
            <p className="font-serif text-5xl font-semibold text-charcoal-900">{site.prices.program}</p>
            {site.programEmiAvailable && (
              <p className="rounded-full bg-sage-100 px-4 py-1.5 text-sm font-medium text-charcoal-700">
                {t('EMI / 2 instalments available', 'EMI / 2 किस्तों में भी उपलब्ध')}
              </p>
            )}
            <p className="text-base leading-relaxed text-charcoal-600">
              {t(
                "We'll only recommend this program if it's genuinely right for you. It starts with a free Clarity Call.",
                'हम यह program तभी सुझाएँगे जब यह सच में आपके लिए सही हो। शुरुआत एक फ़्री Clarity Call से होती है।',
              )}
            </p>
            <PrimaryCTA fullWidth placement="pricing" />
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <FAQSection items={faqs} title={{ en: 'Questions about the program', hi: 'Program से जुड़े सवाल' }} />

      {/* 10. Final CTA */}
      <FinalCTA />
    </>
  )
}
