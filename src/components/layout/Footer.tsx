import { Link } from 'react-router-dom'
import { Instagram, MessageCircle, Youtube } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { site, whatsappLink } from '@/config/site'
import { useLanguage } from '@/context/language'

const columns = [
  {
    heading: { en: 'Work with me', hi: 'मेरे साथ काम करें' },
    links: [
      { label: { en: '1:1 Coaching', hi: '1:1 Coaching' }, to: '/coaching' },
      { label: { en: 'Clarity Call', hi: 'Clarity Call' }, to: '/clarity-call' },
      { label: { en: 'Workshop', hi: 'Workshop' }, to: '/workshop' },
      { label: { en: 'Free Quiz', hi: 'फ़्री Quiz' }, to: '/quiz' },
    ],
  },
  {
    heading: { en: 'About', hi: 'परिचय' },
    links: [
      { label: { en: 'About Shalinee', hi: 'Shalinee के बारे में' }, to: '/about' },
      { label: { en: 'Stories', hi: 'कहानियाँ' }, to: '/stories' },
      { label: { en: 'FAQ', hi: 'आम सवाल' }, to: '/#faq' },
      { label: { en: 'Contact', hi: 'संपर्क' }, to: '/about#contact' },
    ],
  },
  {
    heading: { en: 'Legal', hi: 'क़ानूनी' },
    links: [
      { label: { en: 'Privacy Policy', hi: 'प्राइवेसी पॉलिसी' }, to: '/privacy' },
      { label: { en: 'Terms', hi: 'नियम व शर्तें' }, to: '/terms' },
      { label: { en: 'Disclaimer', hi: 'डिस्क्लेमर' }, to: '/disclaimer' },
    ],
  },
]

const iconClass =
  'flex h-11 w-11 items-center justify-center rounded-full border border-charcoal-300/40 text-charcoal-600 transition-colors hover:border-rose-300 hover:text-rose-400'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-charcoal-100 bg-cream-100">
      <div className="container-app pb-24 pt-14 sm:py-16">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-charcoal-500">
              {t(
                'Scientist-turned-Relationship Coach helping women heal relationship stress at the root.',
                'साइंटिस्ट से बनीं रिलेशनशिप कोच, जो महिलाओं को रिश्तों का तनाव जड़ से ठीक करने में मदद करती हैं।',
              )}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className={iconClass}>
                <Instagram size={18} />
              </a>
              <a href={site.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className={iconClass}>
                <Youtube size={18} />
              </a>
              <a
                href={whatsappLink(t(site.contact.whatsappMessage))}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className={iconClass}
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading.en}>
              <h2 className="font-sans text-sm font-semibold text-charcoal-800">{t(col.heading)}</h2>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-charcoal-500 transition-colors hover:text-rose-400">
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-charcoal-300/30 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-charcoal-500">
            {t(
              'Coaching is not a substitute for therapy, medical care or emergency support. If you are in crisis, please contact local emergency services.',
              'Coaching, थेरेपी, मेडिकल देखभाल या इमरजेंसी मदद की जगह नहीं है। अगर आप किसी संकट में हैं, तो कृपया स्थानीय इमरजेंसी सेवाओं से संपर्क करें।',
            )}
          </p>
          <p className="mt-4 text-xs text-charcoal-500">
            &copy; {new Date().getFullYear()} {site.coachName}. {t('All rights reserved.', 'सर्वाधिकार सुरक्षित।')}
          </p>
        </div>
      </div>
    </footer>
  )
}
