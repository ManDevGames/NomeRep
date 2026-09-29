import { useEffect, useRef, useState } from 'react'
import type { FormEvent, RefObject } from 'react'
import { ArrowLeft, Lock, MessageCircle, RotateCcw } from 'lucide-react'
import { PrimaryCTA } from '@/components/brand/CTA'
import { PhotoPlaceholder } from '@/components/brand/PhotoPlaceholder'
import { site, whatsappLink } from '@/config/site'
import { useLanguage } from '@/context/language'
import { isWithoutPartner, quizQuestions, situations, stageFor, stages, toPercentScore } from '@/data/quiz'
import type { SituationId, Stage, StageId } from '@/data/quiz'
import { track } from '@/lib/analytics'
import { submitLead } from '@/lib/leads'
import { formatWhatsapp, isValidWhatsapp } from '@/lib/phone'
import { Field } from '@/components/forms/Field'
import { inputClass as fieldClass } from '@/components/forms/inputClass'

const RESULT_KEY = 'shalinee-sen:quiz-result'

interface SavedResult {
  name: string
  score: number
  stageId: StageId
}

function loadResult(): SavedResult | null {
  try {
    const raw = sessionStorage.getItem(RESULT_KEY)
    return raw ? (JSON.parse(raw) as SavedResult) : null
  } catch {
    return null
  }
}

/** Screens: intro → situation → 7 questions → lead form → result. */
type Screen = { kind: 'intro' } | { kind: 'situation' } | { kind: 'question'; index: number } | { kind: 'lead' } | { kind: 'result' }

export function Quiz() {
  const saved = useRef(loadResult()).current
  const [screen, setScreen] = useState<Screen>(saved ? { kind: 'result' } : { kind: 'intro' })
  const [situation, setSituation] = useState<SituationId | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<SavedResult | null>(saved)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const advanceTimer = useRef<number>()

  // Move focus to each new screen's heading so keyboard and screen-reader users follow along.
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo({ top: 0 })
    headingRef.current?.focus({ preventScroll: true })
  }, [screen])

  useEffect(() => () => window.clearTimeout(advanceTimer.current), [])

  const advance = (next: Screen) => {
    window.clearTimeout(advanceTimer.current)
    advanceTimer.current = window.setTimeout(() => setScreen(next), 220)
  }

  const start = () => {
    track('quiz_start')
    setScreen({ kind: 'situation' })
  }

  const chooseSituation = (id: SituationId) => {
    setSituation(id)
    advance({ kind: 'question', index: 0 })
  }

  const answer = (questionId: string, score: number, index: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }))
    if (index === quizQuestions.length - 1) {
      track('quiz_complete')
      advance({ kind: 'lead' })
    } else {
      advance({ kind: 'question', index: index + 1 })
    }
  }

  const back = () => {
    window.clearTimeout(advanceTimer.current)
    if (screen.kind === 'situation') setScreen({ kind: 'intro' })
    else if (screen.kind === 'question') setScreen(screen.index === 0 ? { kind: 'situation' } : { kind: 'question', index: screen.index - 1 })
    else if (screen.kind === 'lead') setScreen({ kind: 'question', index: quizQuestions.length - 1 })
  }

  const finish = async (contact: { name: string; whatsapp: string; email: string }) => {
    const score = toPercentScore(answers)
    const stage = stageFor(score)
    await submitLead({
      type: 'quiz',
      name: contact.name,
      whatsapp: contact.whatsapp,
      email: contact.email || undefined,
      situation: situation ?? '',
      answers,
      score,
      stage: stage.id,
    })
    track('lead_submitted', { form: 'quiz', score, stage: stage.id })
    const saved = { name: contact.name, score, stageId: stage.id }
    try {
      sessionStorage.setItem(RESULT_KEY, JSON.stringify(saved))
    } catch {
      // Result still shows; it just won't survive a refresh.
    }
    setResult(saved)
    setScreen({ kind: 'result' })
  }

  const retake = () => {
    try {
      sessionStorage.removeItem(RESULT_KEY)
    } catch {
      // Nothing to clear.
    }
    setAnswers({})
    setSituation(null)
    setResult(null)
    setScreen({ kind: 'intro' })
  }

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-cream-100 py-10 sm:py-16">
      <div className="container-app max-w-2xl">
        {screen.kind === 'intro' && <Intro headingRef={headingRef} onStart={start} />}
        {screen.kind === 'situation' && (
          <QuestionScreen
            headingRef={headingRef}
            step={0}
            prompt={{ en: 'First, your current situation', hi: 'पहले, आपकी अभी की स्थिति' }}
            options={situations.map((s) => ({ label: s.label, selected: situation === s.id, onSelect: () => chooseSituation(s.id) }))}
            onBack={back}
          />
        )}
        {screen.kind === 'question' && (
          <QuestionScreen
            headingRef={headingRef}
            step={screen.index + 1}
            prompt={
              isWithoutPartner(situation)
                ? (quizQuestions[screen.index].promptWithoutPartner ?? quizQuestions[screen.index].prompt)
                : quizQuestions[screen.index].prompt
            }
            options={quizQuestions[screen.index].options.map((o) => ({
              label: o.label,
              selected: answers[quizQuestions[screen.index].id] === o.score,
              onSelect: () => answer(quizQuestions[screen.index].id, o.score, screen.index),
            }))}
            onBack={back}
          />
        )}
        {screen.kind === 'lead' && <LeadForm headingRef={headingRef} onBack={back} onSubmit={finish} />}
        {screen.kind === 'result' && result && <Result headingRef={headingRef} result={result} onRetake={retake} />}
      </div>
    </section>
  )
}

type HeadingRef = RefObject<HTMLHeadingElement>

function Intro({ headingRef, onStart }: { headingRef: HeadingRef; onStart: () => void }) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center gap-6 rounded-3xl bg-cream-50 px-6 py-10 text-center shadow-card sm:px-12 sm:py-14">
      <span className="eyebrow">{t('Free quiz', 'फ़्री quiz')}</span>
      <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-semibold leading-tight outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-5xl">
        {t("What's your Relationship Stress Score?", 'आपका Relationship Stress Score क्या है?')}
      </h1>
      <p className="text-base text-charcoal-600 sm:text-lg">
        {t('7 honest questions · 2 minutes · private', '7 सच्चे सवाल · 2 मिनट · पूरी तरह निजी')}
      </p>
      <div className="flex items-center gap-3">
        <PhotoPlaceholder label="Shalinee small avatar, circle" aspectRatio="1/1" compact className="w-14 shrink-0 rounded-full" />
        <p className="text-left text-sm text-charcoal-600">
          {t('Created by', 'बनाया है')} <strong className="font-semibold text-charcoal-900">{site.coachName}</strong>,
          <br />
          {t(site.tagline)}
        </p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-cta px-8 py-3 text-base font-semibold text-white shadow-soft transition-colors hover:bg-cta-hover sm:w-auto"
      >
        {t('Start the quiz', 'Quiz शुरू करें')}
      </button>
    </div>
  )
}

interface QuestionScreenProps {
  headingRef: HeadingRef
  /** 0 = situation question, 1–7 = scored questions. */
  step: number
  prompt: { en: string; hi: string }
  options: { label: { en: string; hi: string }; selected: boolean; onSelect: () => void }[]
  onBack: () => void
}

function QuestionScreen({ headingRef, step, prompt, options, onBack }: QuestionScreenProps) {
  const { t } = useLanguage()
  const total = quizQuestions.length
  const progress = (step / (total + 1)) * 100 + 100 / (total + 1)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <button type="button" onClick={onBack} className="-ml-2 inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-sm font-medium text-charcoal-600 hover:text-charcoal-900">
          <ArrowLeft size={17} aria-hidden="true" /> {t('Back', 'पीछे')}
        </button>
        <span className="text-sm text-charcoal-500">
          {step === 0 ? t('Before we begin', 'शुरू करने से पहले') : t(`Question ${step} of ${total}`, `सवाल ${step} / ${total}`)}
        </span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-charcoal-100"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label={t('Quiz progress', 'Quiz की प्रगति')}
      >
        <div className="h-full rounded-full bg-rose-400 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <h1 ref={headingRef} tabIndex={-1} className="mt-2 text-2xl font-semibold leading-snug outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-3xl">
        {t(prompt)}
      </h1>

      <div className="flex flex-col gap-3" role="group" aria-label={t(prompt)}>
        {options.map((option) => (
          <button
            key={option.label.en}
            type="button"
            onClick={option.onSelect}
            aria-pressed={option.selected}
            className={`flex min-h-14 w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left text-base font-medium transition-all ${
              option.selected
                ? 'border-rose-400 bg-blush-50 text-charcoal-900'
                : 'border-transparent bg-cream-50 text-charcoal-700 shadow-soft hover:border-rose-200'
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${option.selected ? 'border-rose-400' : 'border-charcoal-300'}`}
            >
              {option.selected && <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />}
            </span>
            {t(option.label)}
          </button>
        ))}
      </div>
    </div>
  )
}

interface LeadFormProps {
  headingRef: HeadingRef
  onBack: () => void
  onSubmit: (contact: { name: string; whatsapp: string; email: string }) => Promise<void>
}

function LeadForm({ headingRef, onBack, onSubmit }: LeadFormProps) {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = t('Please enter your first name.', 'कृपया अपना पहला नाम लिखें।')
    if (!isValidWhatsapp(countryCode, phone))
      next.phone = t('Please enter a valid WhatsApp number (10 digits for India).', 'कृपया सही WhatsApp नंबर लिखें (भारत के लिए 10 अंक)।')
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t('Please check your email address.', 'कृपया अपना email जाँच लें।')
    if (!consent) next.consent = t('Please tick the box so we can send your result.', 'Result भेजने के लिए कृपया box पर tick करें।')
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    await onSubmit({
      name: name.trim(),
      whatsapp: formatWhatsapp(countryCode, phone),
      email: email.trim(),
    })
  }

  const inputClass = (field: string) => fieldClass(!!errors[field])
  const clearError = (field: string) => {
    if (errors[field]) setErrors(({ [field]: _, ...rest }) => rest)
  }

  return (
    <div className="flex flex-col gap-6">
      <button type="button" onClick={onBack} className="-ml-2 inline-flex min-h-11 items-center gap-1.5 self-start rounded-full px-2 text-sm font-medium text-charcoal-600 hover:text-charcoal-900">
        <ArrowLeft size={17} aria-hidden="true" /> {t('Back', 'पीछे')}
      </button>
      <div className="rounded-3xl bg-cream-50 p-6 shadow-card sm:p-10">
        <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold leading-snug outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-3xl">
          {t('Where should we send your personal result?', 'आपका personal result कहाँ भेजें?')}
        </h1>
        <p className="mt-2 text-sm text-charcoal-500">{t('Your result shows on the next screen too.', 'Result अगली screen पर भी दिखेगा।')}</p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-5">
          <Field id="quiz-name" label={t('First name', 'पहला नाम')} error={errors.name}>
            <input
              id="quiz-name"
              autoComplete="given-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                clearError('name')
              }}
              className={inputClass('name')}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'quiz-name-error' : undefined}
            />
          </Field>

          <Field id="quiz-phone" label={t('WhatsApp number', 'WhatsApp नंबर')} error={errors.phone}>
            <div className="flex gap-2">
              <input
                aria-label={t('Country code', 'Country code')}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                inputMode="tel"
                autoComplete="tel-country-code"
                className={`${inputClass('phone')} !w-20 shrink-0 text-center`}
              />
              <input
                id="quiz-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  clearError('phone')
                }}
                className={inputClass('phone')}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'quiz-phone-error' : undefined}
              />
            </div>
          </Field>

          <Field id="quiz-email" label={t('Email (optional)', 'Email (ज़रूरी नहीं)')} error={errors.email}>
            <input
              id="quiz-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                clearError('email')
              }}
              className={inputClass('email')}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'quiz-email-error' : undefined}
            />
          </Field>

          <div>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-charcoal-600">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked)
                  clearError('consent')
                }}
                className="mt-0.5 h-5 w-5 shrink-0 accent-rose-400"
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? 'quiz-consent-error' : undefined}
              />
              {t(
                'I agree to receive my result and helpful tips on WhatsApp. I can opt out anytime.',
                'मैं WhatsApp पर अपना result और काम की tips पाने के लिए सहमत हूँ। मैं कभी भी मना कर सकती हूँ।',
              )}
            </label>
            {errors.consent && <p id="quiz-consent-error" className="mt-1.5 text-sm text-rose-500">{errors.consent}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-cta px-8 py-3 text-base font-semibold text-white shadow-soft transition-colors hover:bg-cta-hover disabled:opacity-60"
          >
            {submitting ? t('Just a moment…', 'बस एक पल…') : t('Show my result', 'मेरा result दिखाएँ')}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-charcoal-500">
            <Lock size={13} aria-hidden="true" /> {t('Private. Never shared.', 'पूरी तरह निजी। किसी से साझा नहीं।')}
          </p>
        </form>
      </div>
    </div>
  )
}

function Result({ headingRef, result, onRetake }: { headingRef: HeadingRef; result: SavedResult; onRetake: () => void }) {
  const { t } = useLanguage()
  const stage: Stage = stages.find((s) => s.id === result.stageId) ?? stageFor(result.score)
  const whatsappMessage = t(
    `Hi Shalinee, I'm ${result.name}. I just took the Relationship Stress Quiz. My score is ${result.score}/100 (${stage.name.en}). I'd like to talk about my result.`,
    `नमस्ते Shalinee जी, मैं ${result.name} हूँ। मैंने अभी Relationship Stress Quiz लिया। मेरा score ${result.score}/100 (${stage.name.hi}) है। मैं अपने result के बारे में बात करना चाहती हूँ।`,
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-cream-50 px-6 py-10 text-center shadow-card sm:px-12">
        <p className="text-sm text-charcoal-500">
          {t(`${result.name}, your Relationship Stress Score`, `${result.name}, आपका Relationship Stress Score`)}
        </p>
        <ScoreRing score={result.score} />
        <span className="eyebrow">{t('Your stage', 'आपकी stage')}</span>
        <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-semibold outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-4xl">
          {t(stage.name)}
        </h1>
        <p className="max-w-lg text-base leading-relaxed text-charcoal-600 sm:text-lg">{t(stage.description)}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-cream-50 p-6 shadow-soft">
          <h2 className="text-lg font-semibold">{t("What's likely happening underneath", 'अंदर शायद क्या चल रहा है')}</h2>
          <p className="mt-2 text-base leading-relaxed text-charcoal-600">{t(stage.underneath)}</p>
        </div>
        <div className="rounded-3xl bg-blush-50 p-6 shadow-soft">
          <h2 className="text-lg font-semibold">{t('Your next step', 'आपका अगला क़दम')}</h2>
          <p className="mt-2 text-base leading-relaxed text-charcoal-600">{t(stage.nextStep)}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <PrimaryCTA
          fullWidth
          placement="quiz-result"
          label={{ en: 'Book a Free Clarity Call to discuss your result', hi: 'अपने result पर बात करने के लिए फ़्री Clarity Call बुक करें' }}
          search={`?score=${result.score}&stage=${stage.id}`}
          onClick={() => track('result_cta_click', { target: 'clarity_call', score: result.score, stage: stage.id })}
        />
        <a
          href={whatsappLink(whatsappMessage)}
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            track('result_cta_click', { target: 'whatsapp', score: result.score, stage: stage.id })
            track('whatsapp_click', { location: 'quiz_result' })
          }}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-charcoal-300/50 px-6 py-3 text-base font-medium text-charcoal-800 transition-colors hover:border-rose-300 hover:bg-blush-50"
        >
          <MessageCircle size={18} aria-hidden="true" /> {t('Send my result on WhatsApp', 'मेरा result WhatsApp पर भेजें')}
        </a>
        <button type="button" onClick={onRetake} className="inline-flex min-h-11 items-center gap-1.5 text-sm text-charcoal-500 hover:text-charcoal-800">
          <RotateCcw size={14} aria-hidden="true" /> {t('Retake the quiz', 'Quiz फिर से लें')}
        </button>
      </div>

      <p className="text-center text-xs leading-relaxed text-charcoal-500">
        {t('This quiz is for self-reflection, not a clinical assessment.', 'यह quiz आत्म-चिंतन के लिए है, कोई clinical जाँच नहीं।')}
      </p>
    </div>
  )
}

function ScoreRing({ score }: { score: number }) {
  const [shown, setShown] = useState(0)
  const radius = 54
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(score)
      return
    }
    let frame = 0
    const startTime = performance.now()
    const duration = 1200
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setShown(Math.round(score * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [score])

  return (
    <div className="relative h-40 w-40" role="img" aria-label={`${score} / 100`}>
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
        <circle cx="64" cy="64" r={radius} strokeWidth="10" className="fill-none stroke-charcoal-100" />
        <circle
          cx="64"
          cy="64"
          r={radius}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - shown / 100)}
          className="fill-none stroke-rose-400"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
        <span className="font-serif text-5xl font-semibold text-charcoal-900">{shown}</span>
        <span className="text-xs text-charcoal-500">/ 100</span>
      </div>
    </div>
  )
}
