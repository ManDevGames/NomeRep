import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Award, Flame, Lightbulb, ListChecks, MapPin, MessageCircleQuestion, Repeat, Sprout } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAssessment } from '@/hooks/useAssessment'
import { useContent } from '@/hooks/useContent'
import { useLanguage } from '@/context/language'
import { useReflection } from '@/hooks/useReflection'

const accentText: Record<string, string> = {
  blush: 'text-rose-400',
  sage: 'text-sage-500',
  lavender: 'text-lavender-300',
  rose: 'text-rose-400',
}

function ReportBlock({
  icon: Icon,
  number,
  title,
  children,
}: {
  icon: typeof Award
  number: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="border-t border-charcoal-100 py-10 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush-100 text-rose-400">
          <Icon size={17} />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">{number}</span>
        <h2 className="text-xl sm:text-2xl font-semibold text-charcoal-900">{title}</h2>
      </div>
      <div className="mt-5 pl-12">{children}</div>
    </section>
  )
}

export function AssessmentReport() {
  const { result: scored } = useAssessment()
  const { getPattern, reflectionPrompts } = useContent()
  const { t } = useLanguage()
  const result = scored && getPattern(scored.id)
  const { notes } = useReflection()
  const navigate = useNavigate()

  useEffect(() => {
    if (!result) {
      navigate('/assessment', { replace: true })
    }
  }, [result, navigate])

  if (!result) return null

  const answeredReflections = reflectionPrompts.filter((p) => notes[p.id]?.trim())

  return (
    <section className="section-space bg-cream-50">
      <div className="container-app max-w-3xl">
        <div className="text-center">
          <span className="eyebrow">{t('Your full report', 'आपकी पूरी रिपोर्ट')}</span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold">
            {t('Your Relationship Pattern Report', 'आपकी रिलेशनशिप पैटर्न रिपोर्ट')}
          </h1>
        </div>

        <div className="mt-14">
          <ReportBlock icon={Award} number="01" title={t('Your relationship pattern', 'आपका रिलेशनशिप पैटर्न')}>
            <h3 className={`text-2xl font-semibold ${accentText[result.accent]}`}>{result.name}</h3>
            <p className="mt-3 text-base leading-relaxed text-charcoal-600">{result.description}</p>
          </ReportBlock>

          <ReportBlock icon={Sprout} number="02" title={t('Your strongest pattern', 'आपका सबसे मज़बूत पैटर्न')}>
            <p className="rounded-2xl bg-sage-50 p-5 text-base italic leading-relaxed text-charcoal-700">
              &ldquo;{result.tagline}&rdquo;
            </p>
          </ReportBlock>

          <ReportBlock icon={MapPin} number="03" title={t('Issue #1', 'मुद्दा #1')}>
            <h3 className="text-lg font-semibold text-charcoal-900">{result.issues[0].title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{result.issues[0].description}</p>
          </ReportBlock>

          <ReportBlock icon={MapPin} number="04" title={t('Issue #2', 'मुद्दा #2')}>
            <h3 className="text-lg font-semibold text-charcoal-900">{result.issues[1].title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{result.issues[1].description}</p>
          </ReportBlock>

          <ReportBlock icon={Flame} number="05" title={t('Emotional triggers', 'भावनात्मक ट्रिगर')}>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {result.emotionalTriggers.map((t) => (
                <li key={t} className="flex gap-2 text-sm text-charcoal-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-300" /> {t}
                </li>
              ))}
            </ul>
          </ReportBlock>

          <ReportBlock icon={Repeat} number="06" title={t('Common behaviors', 'आम आदतें')}>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {result.commonBehaviors.map((b) => (
                <li key={b} className="flex gap-2 text-sm text-charcoal-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-400" /> {b}
                </li>
              ))}
            </ul>
          </ReportBlock>

          <ReportBlock icon={Lightbulb} number="07" title={t('What may be reinforcing the pattern', 'यह पैटर्न किन वजहों से मज़बूत हो सकता है')}>
            <ul className="flex flex-col gap-2">
              {result.reinforcingFactors.map((f) => (
                <li key={f} className="text-sm leading-relaxed text-charcoal-700">
                  {f}
                </li>
              ))}
            </ul>
          </ReportBlock>

          <ReportBlock icon={ListChecks} number="08" title={t('Healthier alternatives', 'बेहतर विकल्प')}>
            <ul className="flex flex-col gap-2">
              {result.healthierAlternatives.map((h) => (
                <li key={h} className="flex gap-2 text-sm leading-relaxed text-charcoal-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-300" /> {h}
                </li>
              ))}
            </ul>
          </ReportBlock>

          <ReportBlock icon={MessageCircleQuestion} number="09" title={t('Reflection questions', 'आत्म-चिंतन के सवाल')}>
            {answeredReflections.length > 0 ? (
              <div className="flex flex-col gap-4">
                {answeredReflections.map((p) => (
                  <div key={p.id} className="rounded-2xl bg-cream-100 p-4">
                    <p className="text-sm font-medium text-charcoal-800">{p.prompt}</p>
                    <p className="mt-2 text-sm text-charcoal-600">{notes[p.id]}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-charcoal-500">
                {t('You haven’t saved any reflections yet. Revisit the', 'आपने अभी तक कोई आत्म-चिंतन सेव नहीं किया है। जब मन करे,')}{' '}
                <Link to="/#reflection" className="text-rose-400 underline underline-offset-2">
                  {t('reflection prompts', 'आत्म-चिंतन के सवालों')}
                </Link>{' '}
                {t('whenever you’re ready.', 'पर दोबारा लौटें।')}
              </p>
            )}
          </ReportBlock>

          <ReportBlock icon={ArrowRight} number="10" title={t('Recommended next steps', 'आगे के सुझाए गए क़दम')}>
            <ul className="flex flex-col gap-2">
              {result.nextSteps.map((step) => (
                <li key={step} className="flex gap-2 text-sm leading-relaxed text-charcoal-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal-400" /> {step}
                </li>
              ))}
            </ul>
          </ReportBlock>
        </div>

        <div className="keep-light-palette mt-14 rounded-3xl bg-charcoal-900 p-8 sm:p-10 text-center text-cream-50">
          <p className="mx-auto max-w-xl text-xl sm:text-2xl font-serif leading-snug">
            {t(
              'Your pattern isn’t your identity. It is something you can learn to understand and work with.',
              'आपका पैटर्न आपकी पहचान नहीं है। यह ऐसी चीज़ है जिसे आप समझना और बदलना सीख सकते हैं।',
            )}
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button to="/programs" size="lg">
              {t('Explore Your Next Step', 'अपना अगला क़दम चुनें')} <ArrowRight size={18} />
            </Button>
            <Button to="/reprogramming" variant="outlineOnDark" size="lg">
              {t('Talk to a Counselor', 'काउंसलर से बात करें')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
