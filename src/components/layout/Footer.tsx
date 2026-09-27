import { Link } from 'react-router-dom'
import { Instagram, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/context/language'

const columns = [
  {
    heading: { en: 'Explore', hi: 'देखें' },
    links: [
      { label: { en: 'Assessment', hi: 'असेसमेंट' }, to: '/assessment' },
      { label: { en: 'Relationship Patterns', hi: 'रिश्तों के पैटर्न' }, to: '/patterns' },
      { label: { en: 'Programs', hi: 'प्रोग्राम' }, to: '/programs' },
      { label: { en: '1:1 Reprogramming', hi: '1:1 रीप्रोग्रामिंग' }, to: '/reprogramming' },
    ],
  },
  {
    heading: { en: 'Resources', hi: 'संसाधन' },
    links: [
      { label: { en: 'Free Guides', hi: 'मुफ़्त गाइड' }, to: '/resources#guides' },
      { label: { en: 'Reflection', hi: 'आत्म-चिंतन' }, to: '/resources#reflection' },
      { label: { en: 'Blog', hi: 'ब्लॉग' }, to: '/resources#blog' },
      { label: { en: 'FAQ', hi: 'आम सवाल' }, to: '/resources#faq' },
    ],
  },
  {
    heading: { en: 'Company', hi: 'कंपनी' },
    links: [
      { label: { en: 'About', hi: 'हमारे बारे में' }, to: '/about' },
      { label: { en: 'Contact', hi: 'संपर्क करें' }, to: '/about#contact' },
      { label: { en: 'Privacy', hi: 'प्राइवेसी' }, to: '/privacy' },
      { label: { en: 'Terms', hi: 'नियम व शर्तें' }, to: '/terms' },
    ],
  },
]

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-charcoal-100 bg-cream-100">
      <div className="container-app py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="font-serif text-xl font-semibold text-charcoal-900">
              Relationship Guide
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-charcoal-500">
              {t(
                'A calm place to understand your relationship patterns and build healthier connections.',
                'अपने रिश्तों के पैटर्न को समझने और बेहतर रिश्ते बनाने की एक सुकून भरी जगह।',
              )}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://instagram.com/relationshipguide"
                target="_blank"
                rel="noreferrer"
                aria-label={t('Follow Relationship Guide on Instagram', 'Instagram पर Relationship Guide को फ़ॉलो करें')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 transition-colors hover:border-rose-300 hover:text-rose-400"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/919311088577"
                target="_blank"
                rel="noreferrer"
                aria-label={t('Message Relationship Guide on WhatsApp', 'WhatsApp पर Relationship Guide को मैसेज करें')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 transition-colors hover:border-sage-300 hover:text-sage-500"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading.en}>
              <h4 className="text-sm font-semibold text-charcoal-800">{t(col.heading)}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-charcoal-500 hover:text-rose-400 transition-colors">
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-charcoal-200/70 pt-8">
          <p className="text-xs leading-relaxed text-charcoal-400 max-w-3xl">
            {t(
              'This platform provides educational and self-reflection resources and is not a substitute for emergency or medical care. If you are in crisis or need immediate support, please contact a licensed mental health professional or local emergency services.',
              'यह प्लेटफ़ॉर्म शिक्षा और आत्म-चिंतन के लिए संसाधन देता है, और यह इमरजेंसी या मेडिकल देखभाल की जगह नहीं ले सकता। अगर आप किसी संकट में हैं या आपको तुरंत मदद चाहिए, तो कृपया किसी लाइसेंसधारी मानसिक स्वास्थ्य विशेषज्ञ या स्थानीय इमरजेंसी सेवाओं से संपर्क करें।',
            )}
          </p>
          <p className="mt-4 text-xs text-charcoal-400">
            &copy; {new Date().getFullYear()} Relationship Guide. {t('All rights reserved.', 'सर्वाधिकार सुरक्षित।')}
          </p>
        </div>
      </div>
    </footer>
  )
}
