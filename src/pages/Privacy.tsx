import { useLanguage } from '@/context/language'

const sections = [
  {
    title: { en: 'What we collect', hi: 'हम कौन-सी जानकारी लेते हैं' },
    body: {
      en: 'Assessment responses, reflection notes, and contact details you provide (such as when downloading a guide or booking a session) are stored to personalize your experience on Shalinee Sen.',
      hi: 'असेसमेंट के जवाब, आत्म-चिंतन के नोट्स, और आपके दिए संपर्क विवरण (जैसे गाइड डाउनलोड करते या सेशन बुक करते समय) सेव किए जाते हैं, ताकि Shalinee Sen पर आपका अनुभव आपके हिसाब से ढल सके।',
    },
  },
  {
    title: { en: 'How we use it', hi: 'हम इसका इस्तेमाल कैसे करते हैं' },
    body: {
      en: 'Your data is used only to run and improve Shalinee Sen — to generate your personalized pattern, save your reflections, and manage bookings. We do not sell your personal data.',
      hi: 'आपका डेटा सिर्फ़ Shalinee Sen को चलाने और बेहतर बनाने के लिए इस्तेमाल होता है — आपका पैटर्न तैयार करने, आपका आत्म-चिंतन सेव करने और बुकिंग सँभालने के लिए। हम आपका निजी डेटा नहीं बेचते।',
    },
  },
  {
    title: { en: 'Where it’s stored', hi: 'यह कहाँ सेव होता है' },
    body: {
      en: 'In this prototype, assessment and reflection data is stored locally on your device. A production version would use encrypted, access-controlled storage.',
      hi: 'इस प्रोटोटाइप में असेसमेंट और आत्म-चिंतन का डेटा सिर्फ़ आपके डिवाइस पर सेव होता है। असली वर्ज़न में एन्क्रिप्टेड और सुरक्षित एक्सेस वाली स्टोरेज इस्तेमाल होगी।',
    },
  },
  {
    title: { en: 'Your choices', hi: 'आपके अधिकार' },
    body: {
      en: 'You can clear your assessment and reflection data at any time by clearing your browser’s local storage for this site, or by contacting us directly.',
      hi: 'आप कभी भी इस साइट के लिए अपने ब्राउज़र की लोकल स्टोरेज साफ़ करके, या सीधे हमसे संपर्क करके, अपना असेसमेंट और आत्म-चिंतन का डेटा मिटा सकते हैं।',
    },
  },
]

export function Privacy() {
  const { t } = useLanguage()

  return (
    <section className="section-space bg-cream-50">
      <div className="container-app max-w-3xl">
        <span className="eyebrow">{t('Legal', 'क़ानूनी जानकारी')}</span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">{t('Privacy Policy', 'प्राइवेसी पॉलिसी')}</h1>
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
