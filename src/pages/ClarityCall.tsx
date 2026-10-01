import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, CheckCircle2, Lock, MessageCircle } from 'lucide-react'
import { PhotoPlaceholder } from '@/components/brand/PhotoPlaceholder'
import { Field } from '@/components/forms/Field'
import { inputClass } from '@/components/forms/inputClass'
import { site, whatsappLink } from '@/config/site'
import { useLanguage } from '@/context/language'
import { stages } from '@/data/quiz'
import { track } from '@/lib/analytics'
import { submitLead } from '@/lib/leads'
import { formatWhatsapp, isValidWhatsapp } from '@/lib/phone'

/** How long the "Submitted successfully" message shows before WhatsApp opens. */
const REDIRECT_DELAY_MS = 1800

/** Reads ?score=&stage= from the quiz result link, ignoring anything malformed. */
function useQuizParams() {
  const [params] = useSearchParams()
  const score = Number(params.get('score'))
  const stage = stages.find((s) => s.id === params.get('stage'))
  if (!stage || !Number.isInteger(score) || score < 0 || score > 100 || params.get('score') === null) return null
  return { score, stage }
}

export function ClarityCall() {
  const { t } = useLanguage()
  const quiz = useQuizParams()
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null)

  return (
    <>
      <section className="bg-cream-50">
        <div className="container-app grid grid-cols-1 items-center gap-10 py-12 sm:py-16 md:grid-cols-[1.3fr_1fr] lg:gap-16 lg:py-20">
          <div className="flex flex-col items-start gap-5">
            <span className="eyebrow">{t('Free · 20 minutes · Private', 'फ़्री · 20 मिनट · निजी')}</span>
            <h1 className="text-4xl font-semibold leading-[1.12] sm:text-5xl">
              {t('Book Your Free 20-Min Clarity Call', 'अपनी फ़्री 20 मिनट की Clarity Call बुक करें')}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
              {t(
                "A private, no-pressure conversation to understand where you're stuck and what could help.",
                'एक निजी, बिना दबाव की बातचीत, यह समझने के लिए कि आप कहाँ अटकी हैं और क्या मदद कर सकता है।',
              )}
            </p>
          </div>
          <PhotoPlaceholder label="Shalinee, friendly close-up, 1:1" aspectRatio="1/1" className="mx-auto max-w-xs md:max-w-sm" priority />
        </div>
      </section>

      <section className="bg-cream-100 py-14 sm:py-20">
        <div className="container-app grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold sm:text-3xl">{t('On this call we will…', 'इस call में हम…')}</h2>
            <ol className="flex flex-col gap-4">
              {[
                t('Understand your situation, in your own words.', 'आपकी स्थिति को, आपके अपने शब्दों में समझेंगे।'),
                t('Identify the root pattern behind what keeps happening.', 'बार-बार होने वाली बातों के पीछे के असली pattern को पहचानेंगे।'),
                t(
                  "See if the Heart Rewiring Program is right for you, and if it isn't, point you in the right direction.",
                  'देखेंगे कि Heart Rewiring Program आपके लिए सही है या नहीं, और अगर नहीं, तो आपको सही दिशा बताएँगे।',
                ),
              ].map((point, i) => (
                <li key={point} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush-100 font-serif font-semibold text-rose-500">{i + 1}</span>
                  <span className="pt-1.5 text-base leading-relaxed text-charcoal-700">{point}</span>
                </li>
              ))}
            </ol>
            {quiz && (
              <p className="rounded-2xl border border-rose-200 bg-cream-50 p-4 text-sm leading-relaxed text-charcoal-700">
                {t(
                  `We'll also talk about your quiz result: ${quiz.stage.name.en} (${quiz.score}/100).`,
                  `हम आपके quiz result पर भी बात करेंगे: ${quiz.stage.name.hi} (${quiz.score}/100)।`,
                )}
              </p>
            )}
          </div>

          <div className="rounded-3xl bg-cream-50 p-6 shadow-card sm:p-10">
            {whatsappUrl ? <Submitted whatsappUrl={whatsappUrl} /> : <BookingForm quiz={quiz} onDone={setWhatsappUrl} />}
            <ul className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-charcoal-100 pt-5 text-sm text-charcoal-600">
              {[t('100% confidential', '100% गोपनीय'), t('No obligation', 'कोई बाध्यता नहीं'), t('Limited slots each week', 'हर हफ़्ते सीमित slots')].map((note) => (
                <li key={note} className="flex items-center gap-1.5">
                  <Check size={15} className="text-sage-500" aria-hidden="true" /> {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

interface BookingFormProps {
  quiz: ReturnType<typeof useQuizParams>
  /** Called with the prefilled WhatsApp link once the details are saved. */
  onDone: (whatsappUrl: string) => void
}

function BookingForm({ quiz, onDone }: BookingFormProps) {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', countryCode: '+91', phone: '', email: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const set = (field: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    const errorKey = field === 'countryCode' ? 'phone' : field
    if (errors[errorKey]) setErrors(({ [errorKey]: _, ...rest }) => rest)
  }
  const describedBy = (field: string) => (errors[field] ? `cc-${field}-error` : undefined)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = t('Please enter your full name.', 'कृपया अपना पूरा नाम लिखें।')
    if (!isValidWhatsapp(form.countryCode, form.phone))
      next.phone = t('Please enter a valid WhatsApp number (10 digits for India).', 'कृपया सही WhatsApp नंबर लिखें (भारत के लिए 10 अंक)।')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = t('Please enter a valid email address.', 'कृपया सही email लिखें।')
    setErrors(next)
    if (Object.keys(next).length > 0) {
      document.getElementById(`cc-${Object.keys(next)[0]}`)?.focus()
      return
    }

    const name = form.name.trim()
    const whatsapp = formatWhatsapp(form.countryCode, form.phone)
    const email = form.email.trim()

    setSubmitting(true)
    await submitLead({
      type: 'clarity_call',
      name,
      whatsapp,
      email,
      quizScore: quiz ? String(quiz.score) : undefined,
      quizStage: quiz?.stage.id,
    })
    track('lead_submitted', { form: 'clarity_call' })
    track('clarity_call_booked')

    onDone(whatsappLink(`Free 20-Min Clarity Call with ${site.coachName}\n\nName: ${name}\nNumber: ${whatsapp}\nEmail: ${email}`))
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-semibold">{t('Tell me a little about you', 'थोड़ा अपने बारे में बताइए')}</h2>
        <p className="mt-1 text-sm text-charcoal-500">{t('Takes less than a minute.', 'एक मिनट से भी कम लगेगा।')}</p>
      </div>

      <Field id="cc-name" label={t('Your full name', 'आपका पूरा नाम')} error={errors.name}>
        <input
          id="cc-name"
          autoComplete="name"
          value={form.name}
          onChange={(e) => set('name')(e.target.value)}
          className={inputClass(!!errors.name)}
          aria-invalid={!!errors.name}
          aria-describedby={describedBy('name')}
        />
      </Field>

      <Field id="cc-phone" label={t('WhatsApp number', 'WhatsApp नंबर')} error={errors.phone}>
        <div className="flex gap-2">
          <input
            aria-label={t('Country code', 'Country code')}
            value={form.countryCode}
            onChange={(e) => set('countryCode')(e.target.value)}
            inputMode="tel"
            autoComplete="tel-country-code"
            className={`${inputClass(!!errors.phone)} !w-20 shrink-0 text-center`}
          />
          <input
            id="cc-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="98765 43210"
            value={form.phone}
            onChange={(e) => set('phone')(e.target.value)}
            className={inputClass(!!errors.phone)}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy('phone')}
          />
        </div>
      </Field>

      <Field id="cc-email" label={t('Email', 'Email')} error={errors.email}>
        <input
          id="cc-email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => set('email')(e.target.value)}
          className={inputClass(!!errors.email)}
          aria-invalid={!!errors.email}
          aria-describedby={describedBy('email')}
        />
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-cta px-8 py-3 text-base font-semibold text-white shadow-soft transition-colors hover:bg-cta-hover disabled:opacity-60"
      >
        {submitting ? t('Submitting…', 'भेजा जा रहा है…') : t('Submit', 'Submit करें')}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-xs text-charcoal-500">
        <Lock size={13} aria-hidden="true" /> {t('Your details are private and only seen by Shalinee.', 'आपकी जानकारी निजी है और सिर्फ़ Shalinee देखती हैं।')}
      </p>
    </form>
  )
}

/** Confirms the submission, then hands over to WhatsApp with the details prefilled. */
function Submitted({ whatsappUrl }: { whatsappUrl: string }) {
  const { t } = useLanguage()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
    const id = window.setTimeout(() => window.location.assign(whatsappUrl), REDIRECT_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [whatsappUrl])

  return (
    <div className="flex flex-col items-center gap-4 py-6 text-center" role="status">
      <CheckCircle2 size={48} className="text-sage-500" aria-hidden="true" />
      <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
        {t('Submitted successfully!', 'सफलतापूर्वक भेज दिया गया!')}
      </h2>
      <p className="text-base text-charcoal-600">{t('Taking you to WhatsApp to confirm your call…', 'आपकी call पक्की करने के लिए WhatsApp खोला जा रहा है…')}</p>
      <a
        href={whatsappUrl}
        onClick={() => track('whatsapp_click', { location: 'clarity-call' })}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-charcoal-300/50 px-6 text-base font-medium text-charcoal-800 hover:border-rose-300 hover:bg-blush-50"
      >
        <MessageCircle size={18} aria-hidden="true" /> {t('Open WhatsApp', 'WhatsApp खोलें')}
      </a>
    </div>
  )
}
