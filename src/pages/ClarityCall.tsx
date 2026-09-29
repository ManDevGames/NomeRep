import { useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, Lock } from 'lucide-react'
import { PhotoPlaceholder } from '@/components/brand/PhotoPlaceholder'
import { Field } from '@/components/forms/Field'
import { inputClass } from '@/components/forms/inputClass'
import { site } from '@/config/site'
import { useLanguage } from '@/context/language'
import type { Bilingual } from '@/context/language'
import { situations, stages } from '@/data/quiz'
import { submitLead } from '@/lib/leads'
import { formatWhatsapp, isValidWhatsapp } from '@/lib/phone'

const ageRanges = ['18–24', '25–34', '35–44', '45+']

const languages: { id: string; label: Bilingual }[] = [
  { id: 'english', label: { en: 'English', hi: 'English' } },
  { id: 'hindi', label: { en: 'Hindi', hi: 'हिंदी' } },
  { id: 'bengali', label: { en: 'Bengali', hi: 'বাংলা' } },
]

const times: { id: string; label: Bilingual }[] = [
  { id: 'morning', label: { en: 'Morning', hi: 'सुबह' } },
  { id: 'afternoon', label: { en: 'Afternoon', hi: 'दोपहर' } },
  { id: 'evening', label: { en: 'Evening', hi: 'शाम' } },
]

const sources: { id: string; label: Bilingual }[] = [
  { id: 'instagram', label: { en: 'Instagram', hi: 'Instagram' } },
  { id: 'youtube', label: { en: 'YouTube', hi: 'YouTube' } },
  { id: 'whatsapp', label: { en: 'WhatsApp', hi: 'WhatsApp' } },
  { id: 'google', label: { en: 'Google search', hi: 'Google search' } },
  { id: 'friend', label: { en: 'A friend or family member', hi: 'किसी दोस्त या परिवार वाले से' } },
  { id: 'other', label: { en: 'Other', hi: 'कहीं और से' } },
]

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
  const [submitted, setSubmitted] = useState<{ name: string; email: string } | null>(null)

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
            {submitted && site.bookingUrl ? (
              <Scheduler name={submitted.name} email={submitted.email} />
            ) : (
              <ApplicationForm quiz={quiz} onDone={setSubmitted} />
            )}
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

interface ApplicationFormProps {
  quiz: ReturnType<typeof useQuizParams>
  onDone: (contact: { name: string; email: string }) => void
}

function ApplicationForm({ quiz, onDone }: ApplicationFormProps) {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    countryCode: '+91',
    phone: '',
    email: '',
    ageRange: '',
    city: '',
    situation: '',
    biggestChange: '',
    preferredLanguage: '',
    preferredTime: '',
    source: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [failed, setFailed] = useState(false)

  const set = (field: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    const errorKey = field === 'countryCode' ? 'phone' : field
    if (errors[errorKey]) setErrors(({ [errorKey]: _, ...rest }) => rest)
  }
  const describedBy = (field: string) => (errors[field] ? `cc-${field}-error` : undefined)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const required = t('Please fill this in.', 'कृपया यह भरें।')
    const choose = t('Please choose one.', 'कृपया एक चुनें।')
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = required
    if (!isValidWhatsapp(form.countryCode, form.phone))
      next.phone = t('Please enter a valid WhatsApp number (10 digits for India).', 'कृपया सही WhatsApp नंबर लिखें (भारत के लिए 10 अंक)।')
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t('Please check your email address.', 'कृपया अपना email जाँच लें।')
    if (!form.ageRange) next.ageRange = choose
    if (!form.situation) next.situation = choose
    if (!form.biggestChange.trim()) next.biggestChange = required
    if (!form.preferredLanguage) next.preferredLanguage = choose
    if (!form.preferredTime) next.preferredTime = choose
    setErrors(next)
    if (Object.keys(next).length > 0) {
      document.getElementById(`cc-${Object.keys(next)[0]}`)?.focus()
      return
    }

    setSubmitting(true)
    setFailed(false)
    const ok = await submitLead({
      type: 'clarity_call',
      name: form.name.trim(),
      whatsapp: formatWhatsapp(form.countryCode, form.phone),
      email: form.email.trim() || undefined,
      ageRange: form.ageRange,
      city: form.city.trim(),
      situation: form.situation,
      biggestChange: form.biggestChange.trim(),
      preferredLanguage: form.preferredLanguage,
      preferredTime: form.preferredTime,
      source: form.source,
      quizScore: quiz ? String(quiz.score) : undefined,
      quizStage: quiz?.stage.id,
    })
    setSubmitting(false)
    if (!ok) {
      setFailed(true)
      return
    }
    if (site.bookingUrl) onDone({ name: form.name.trim(), email: form.email.trim() })
    else navigate('/thank-you?status=requested')
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-semibold">{t('Tell me a little about you', 'थोड़ा अपने बारे में बताइए')}</h2>
        <p className="mt-1 text-sm text-charcoal-500">{t('Takes about 2 minutes.', 'लगभग 2 मिनट लगेंगे।')}</p>
      </div>

      <Field id="cc-name" label={t('Your name', 'आपका नाम')} error={errors.name}>
        <input id="cc-name" autoComplete="name" value={form.name} onChange={(e) => set('name')(e.target.value)} className={inputClass(!!errors.name)} aria-invalid={!!errors.name} aria-describedby={describedBy('name')} />
      </Field>

      <Field id="cc-phone" label={t('WhatsApp number', 'WhatsApp नंबर')} error={errors.phone}>
        <div className="flex gap-2">
          <input aria-label={t('Country code', 'Country code')} value={form.countryCode} onChange={(e) => set('countryCode')(e.target.value)} inputMode="tel" autoComplete="tel-country-code" className={`${inputClass(!!errors.phone)} !w-20 shrink-0 text-center`} />
          <input id="cc-phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210" value={form.phone} onChange={(e) => set('phone')(e.target.value)} className={inputClass(!!errors.phone)} aria-invalid={!!errors.phone} aria-describedby={describedBy('phone')} />
        </div>
      </Field>

      <Field id="cc-email" label={t('Email (optional)', 'Email (ज़रूरी नहीं)')} error={errors.email}>
        <input id="cc-email" type="email" autoComplete="email" value={form.email} onChange={(e) => set('email')(e.target.value)} className={inputClass(!!errors.email)} aria-invalid={!!errors.email} aria-describedby={describedBy('email')} />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="cc-ageRange" label={t('Age range', 'उम्र')} error={errors.ageRange}>
          <Select id="cc-ageRange" value={form.ageRange} onChange={set('ageRange')} invalid={!!errors.ageRange} describedBy={describedBy('ageRange')} placeholder={t('Choose…', 'चुनें…')}>
            {ageRanges.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </Select>
        </Field>
        <Field id="cc-city" label={t('City (optional)', 'शहर (ज़रूरी नहीं)')}>
          <input id="cc-city" autoComplete="address-level2" value={form.city} onChange={(e) => set('city')(e.target.value)} className={inputClass(false)} />
        </Field>
      </div>

      <Field id="cc-situation" label={t('Your current situation', 'आपकी अभी की स्थिति')} error={errors.situation}>
        <Select id="cc-situation" value={form.situation} onChange={set('situation')} invalid={!!errors.situation} describedBy={describedBy('situation')} placeholder={t('Choose…', 'चुनें…')}>
          {situations.map((s) => (
            <option key={s.id} value={s.id}>{t(s.label)}</option>
          ))}
        </Select>
      </Field>

      <Field id="cc-biggestChange" label={t("What's the biggest thing you want to change?", 'आप सबसे ज़्यादा क्या बदलना चाहती हैं?')} error={errors.biggestChange}>
        <textarea
          id="cc-biggestChange"
          rows={4}
          value={form.biggestChange}
          onChange={(e) => set('biggestChange')(e.target.value)}
          className={`${inputClass(!!errors.biggestChange)} py-3`}
          aria-invalid={!!errors.biggestChange}
          aria-describedby={describedBy('biggestChange')}
        />
      </Field>

      <ChoiceGroup id="cc-preferredLanguage" legend={t('Preferred language', 'पसंदीदा भाषा')} options={languages} value={form.preferredLanguage} onChange={set('preferredLanguage')} error={errors.preferredLanguage} />
      <ChoiceGroup id="cc-preferredTime" legend={t('Preferred time', 'पसंदीदा समय')} options={times} value={form.preferredTime} onChange={set('preferredTime')} error={errors.preferredTime} />

      <Field id="cc-source" label={t('How did you find me? (optional)', 'आपको मेरे बारे में कैसे पता चला? (ज़रूरी नहीं)')}>
        <Select id="cc-source" value={form.source} onChange={set('source')} placeholder={t('Choose…', 'चुनें…')}>
          {sources.map((s) => (
            <option key={s.id} value={s.id}>{t(s.label)}</option>
          ))}
        </Select>
      </Field>

      {failed && (
        <p role="alert" className="rounded-xl bg-blush-50 p-3 text-sm text-rose-500">
          {t(
            "Sorry, that didn't go through. Please try again, or message Shalinee on WhatsApp.",
            'माफ़ कीजिए, यह नहीं भेजा जा सका। कृपया फिर से कोशिश करें, या WhatsApp पर Shalinee को मैसेज करें।',
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-cta px-8 py-3 text-base font-semibold text-white shadow-soft transition-colors hover:bg-cta-hover disabled:opacity-60"
      >
        {submitting
          ? t('Sending…', 'भेजा जा रहा है…')
          : site.bookingUrl
            ? t('Continue to choose a time', 'आगे बढ़कर समय चुनें')
            : t('Request my Clarity Call', 'मेरी Clarity Call का अनुरोध भेजें')}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-xs text-charcoal-500">
        <Lock size={13} aria-hidden="true" /> {t('Your answers are private and only seen by Shalinee.', 'आपके जवाब निजी हैं और सिर्फ़ Shalinee देखती हैं।')}
      </p>
    </form>
  )
}

interface SelectProps {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  children: ReactNode
  invalid?: boolean
  describedBy?: string
}

function Select({ id, value, onChange, placeholder, children, invalid = false, describedBy }: SelectProps) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass(invalid)} ${value ? '' : 'text-charcoal-500'}`}
      aria-invalid={invalid}
      aria-describedby={describedBy}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {children}
    </select>
  )
}

interface ChoiceGroupProps {
  id: string
  legend: string
  options: { id: string; label: Bilingual }[]
  value: string
  onChange: (value: string) => void
  error?: string
}

function ChoiceGroup({ id, legend, options, value, onChange, error }: ChoiceGroupProps) {
  const { t } = useLanguage()

  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="mb-1.5 text-sm font-medium text-charcoal-800">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option, i) => (
          <label
            key={option.id}
            className={`flex min-h-12 cursor-pointer items-center rounded-full border px-5 text-base transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-rose-300 ${
              value === option.id ? 'border-rose-400 bg-blush-50 font-medium text-charcoal-900' : 'border-charcoal-300/50 text-charcoal-700 hover:border-rose-200'
            }`}
          >
            <input
              id={i === 0 ? id : undefined}
              type="radio"
              name={id}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
              className="sr-only"
            />
            {t(option.label)}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-rose-500">
          {error}
        </p>
      )}
    </fieldset>
  )
}

/**
 * Embedded Calendly / Cal.com scheduler, shown once the application is saved.
 * Calendly tells the page when a slot is booked, and we then move to /thank-you.
 * For Cal.com, set the event's "redirect on booking" to <site>/thank-you?status=booked.
 */
function Scheduler({ name, email }: { name: string; email: string }) {
  const { t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data === 'object' && e.data?.event === 'calendly.event_scheduled') navigate('/thank-you?status=booked')
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [navigate])

  const url = new URL(site.bookingUrl)
  url.searchParams.set('name', name)
  if (email) url.searchParams.set('email', email)
  url.searchParams.set('embed_domain', window.location.hostname)
  url.searchParams.set('embed_type', 'Inline')

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">{t('Now choose a time that suits you', 'अब अपनी सुविधा का समय चुनें')}</h2>
      <iframe src={url.toString()} title={t('Choose a time for your Clarity Call', 'अपनी Clarity Call का समय चुनें')} className="h-[680px] w-full rounded-2xl border border-charcoal-100 bg-white" />
    </div>
  )
}
