import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Check, ClipboardList, Instagram, MessageCircle } from 'lucide-react'
import { VideoPlaceholder } from '@/components/brand/VideoPlaceholder'
import { site } from '@/config/site'
import { useLanguage } from '@/context/language'
import { track } from '@/lib/analytics'

function hasTakenQuiz() {
  try {
    return sessionStorage.getItem('shalinee-sen:quiz-result') !== null
  } catch {
    return false
  }
}

export function ThankYou() {
  const { t } = useLanguage()
  const [params] = useSearchParams()
  const booked = params.get('status') === 'booked'
  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current) return
    tracked.current = true
    track('clarity_call_booked', { status: booked ? 'booked' : 'requested' })
  }, [booked])

  const quizDone = hasTakenQuiz()

  return (
    <section className="bg-cream-100 py-12 sm:py-20">
      <div className="container-app flex max-w-3xl flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-200 text-sage-500">
            <Check size={28} strokeWidth={2.5} aria-hidden="true" />
          </span>
          <h1 className="text-3xl font-semibold sm:text-5xl">
            {booked ? t("You're booked in, thank you!", 'आपकी call बुक हो गई, शुक्रिया!') : t("We've received your request", 'आपका अनुरोध हमें मिल गया है')}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
            {booked
              ? t("I'm looking forward to speaking with you. Here's what happens next.", 'आपसे बात करने का इंतज़ार रहेगा। आगे ऐसे होगा:')
              : t(
                  "Shalinee will personally reach out on WhatsApp to fix a time that suits you.",
                  'Shalinee ख़ुद WhatsApp पर आपसे संपर्क करेंगी, ताकि आपकी सुविधा का समय तय हो सके।',
                )}
          </p>
        </div>

        <ol className="grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-3">
          <Step n={1} icon={MessageCircle} title={t('Check WhatsApp', 'WhatsApp देखें')}>
            {t('Your confirmation will arrive there.', 'Confirmation वहीं आएगा।')}
          </Step>
          <Step n={2} icon={ClipboardList} title={t('Take the quiz', 'Quiz लें')}>
            {quizDone ? (
              t("Done. We'll talk about your result.", 'हो गया। हम आपके result पर बात करेंगे।')
            ) : (
              <Link to="/quiz" className="font-medium text-rose-500 underline underline-offset-4 hover:text-rose-400">
                {t('2 minutes, before the call', 'Call से पहले, बस 2 मिनट')}
              </Link>
            )}
          </Step>
          <Step n={3} icon={Instagram} title={t('Join me on Instagram', 'Instagram पर जुड़ें')}>
            <a href={site.social.instagram} target="_blank" rel="noreferrer" className="font-medium text-rose-500 underline underline-offset-4 hover:text-rose-400">
              {t('Daily tips and reflections', 'रोज़ की tips और विचार')}
            </a>
          </Step>
        </ol>

        <VideoPlaceholder label="30-sec 'see you on the call' video from Shalinee" className="max-w-2xl" />
      </div>
    </section>
  )
}

interface StepProps {
  n: number
  icon: typeof Check
  title: string
  children: ReactNode
}

function Step({ n, icon: Icon, title, children }: StepProps) {
  return (
    <li className="flex flex-col gap-2 rounded-3xl bg-cream-50 p-6 shadow-soft">
      <span className="flex items-center gap-2 text-sm font-semibold text-rose-500">
        <Icon size={18} aria-hidden="true" /> {n}
      </span>
      <span className="font-serif text-lg font-semibold text-charcoal-900">{title}</span>
      <span className="text-base text-charcoal-600">{children}</span>
    </li>
  )
}
