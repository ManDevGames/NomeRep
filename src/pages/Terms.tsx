import { useLanguage } from '@/context/language'

const sections = [
  {
    title: { en: 'Educational purpose', hi: 'शैक्षिक उद्देश्य' },
    body: {
      en: 'Relationship Guide provides educational and self-reflection content, including a free assessment, guided programs, and access to independent counselors. It is not a medical or mental health diagnostic service.',
      hi: 'Relationship Guide शिक्षा और आत्म-चिंतन से जुड़ी सामग्री देता है, जिसमें एक मुफ़्त असेसमेंट, गाइडेड प्रोग्राम और स्वतंत्र काउंसलर तक पहुँच शामिल है। यह कोई मेडिकल या मानसिक स्वास्थ्य डायग्नोसिस सेवा नहीं है।',
    },
  },
  {
    title: { en: 'Not a crisis service', hi: 'संकट के समय की सेवा नहीं' },
    body: {
      en: 'If you are in crisis or need immediate support, please contact a licensed mental health professional or local emergency services. Relationship Guide is not equipped for emergency intervention.',
      hi: 'अगर आप किसी संकट में हैं या आपको तुरंत मदद चाहिए, तो कृपया किसी लाइसेंसधारी मानसिक स्वास्थ्य विशेषज्ञ या स्थानीय इमरजेंसी सेवाओं से संपर्क करें। Relationship Guide इमरजेंसी में मदद देने के लिए नहीं बना है।',
    },
  },
  {
    title: { en: 'Programs and sessions', hi: 'प्रोग्राम और सेशन' },
    body: {
      en: 'Programs are self-paced and delivered as described on each program page. 1:1 sessions are conducted by independent counselors; scheduling and fees are shown at the time of booking.',
      hi: 'प्रोग्राम आप अपनी रफ़्तार से कर सकते हैं, और ये हर प्रोग्राम के पेज पर बताए गए तरीके से दिए जाते हैं। 1:1 सेशन स्वतंत्र काउंसलर लेते हैं; समय और फ़ीस बुकिंग के वक़्त दिखाई जाती है।',
    },
  },
  {
    title: { en: 'Payments', hi: 'पेमेंट' },
    body: {
      en: 'All prices are listed in Indian Rupees (₹). This prototype does not process real payments; a production version would integrate secure payment gateways including UPI.',
      hi: 'सभी क़ीमतें भारतीय रुपये (₹) में दी गई हैं। यह प्रोटोटाइप असली पेमेंट नहीं लेता; असली वर्ज़न में UPI समेत सुरक्षित पेमेंट गेटवे जोड़े जाएँगे।',
    },
  },
]

export function Terms() {
  const { t } = useLanguage()

  return (
    <section className="section-space bg-cream-50">
      <div className="container-app max-w-3xl">
        <span className="eyebrow">{t('Legal', 'क़ानूनी जानकारी')}</span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">{t('Terms of Service', 'सेवा की शर्तें')}</h1>
        <p className="mt-4 text-sm text-charcoal-500">{t('Last updated September 2026', 'आख़िरी अपडेट: सितंबर 2026')}</p>

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
