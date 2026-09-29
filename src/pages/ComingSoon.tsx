import { MessageCircle } from 'lucide-react'
import { SecondaryCTA } from '@/components/brand/CTA'
import { site, whatsappLink } from '@/config/site'
import { useLanguage } from '@/context/language'
import type { Bilingual } from '@/context/language'

/** Temporary stand-in for pages that are still being built, so nav links never 404. */
export function ComingSoon({ title }: { title: Bilingual }) {
  const { t } = useLanguage()

  return (
    <section className="section-space flex min-h-[60vh] items-center bg-cream-50">
      <div className="container-app flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">{t(title)}</h1>
        <p className="max-w-md text-base text-charcoal-500">
          {t(
            'This page is being prepared. Meanwhile, message Shalinee directly on WhatsApp.',
            'यह पेज तैयार हो रहा है। तब तक आप WhatsApp पर सीधे Shalinee को मैसेज कर सकती हैं।',
          )}
        </p>
        <a
          href={whatsappLink(t(site.contact.whatsappMessage))}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-rose-400 px-6 py-3 text-base font-semibold text-white shadow-soft hover:bg-rose-500"
        >
          <MessageCircle size={18} aria-hidden="true" /> {t('Message on WhatsApp', 'WhatsApp पर मैसेज करें')}
        </a>
        <SecondaryCTA />
      </div>
    </section>
  )
}
