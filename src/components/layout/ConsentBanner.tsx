import { useState } from 'react'
import { Link } from 'react-router-dom'
import { analyticsConfigured, getConsent, setConsent } from '@/lib/analytics'
import type { Consent } from '@/lib/analytics'
import { useLanguage } from '@/context/language'

/** Asks before loading analytics. Only appears once GA4 or Meta Pixel IDs are set in the site config. */
export function ConsentBanner() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(() => analyticsConfigured && getConsent() === null)

  if (!open) return null

  const choose = (value: Consent) => {
    setConsent(value)
    setOpen(false)
  }

  return (
    <div role="region" aria-label={t('Cookie notice', 'Cookie सूचना')} className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:left-6 sm:max-w-md">
      <div className="flex flex-col gap-4 rounded-2xl border border-charcoal-100 bg-cream-50 p-5 shadow-lift">
        <p className="text-sm leading-relaxed text-charcoal-700">
          {t(
            'We use cookies to understand how visitors use this site, so we can improve it. ',
            'हम यह समझने के लिए cookies इस्तेमाल करते हैं कि लोग इस साइट का उपयोग कैसे करते हैं, ताकि इसे बेहतर बना सकें। ',
          )}
          <Link to="/privacy" className="underline underline-offset-2 hover:text-rose-500">
            {t('Privacy Policy', 'प्राइवेसी पॉलिसी')}
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => choose('granted')}
            className="min-h-11 flex-1 rounded-full bg-charcoal-900 px-5 text-sm font-semibold text-cream-50 hover:bg-charcoal-800"
          >
            {t('Accept', 'स्वीकार करें')}
          </button>
          <button
            type="button"
            onClick={() => choose('denied')}
            className="min-h-11 flex-1 rounded-full border border-charcoal-300/50 px-5 text-sm font-medium text-charcoal-800 hover:bg-charcoal-100/60"
          >
            {t('Decline', 'मना करें')}
          </button>
        </div>
      </div>
    </div>
  )
}
