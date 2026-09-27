import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ProgressIndicator } from '@/components/ui/ProgressIndicator'
import { useLanguage } from '@/context/language'
import type { AssessmentQuestion } from '@/types'

interface AssessmentCardProps {
  question: AssessmentQuestion
  currentIndex: number
  totalQuestions: number
  selectedOptionId?: string
  onSelect: (optionId: string) => void
  onBack: () => void
  onNext: () => void
  isLastQuestion: boolean
}

export function AssessmentCard({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  onSelect,
  onBack,
  onNext,
  isLastQuestion,
}: AssessmentCardProps) {
  const { t } = useLanguage()

  return (
    <div className="rounded-3xl border border-charcoal-100 bg-cream-50 p-6 sm:p-10 shadow-card">
      <ProgressIndicator current={currentIndex + 1} total={totalQuestions} />

      <div className="mt-8 sm:mt-10">
        <span className="eyebrow">
          {t(`Question ${currentIndex + 1} of ${totalQuestions}`, `सवाल ${currentIndex + 1} / ${totalQuestions}`)}
        </span>
        <h2 className="mt-3 text-2xl sm:text-3xl font-semibold leading-snug text-charcoal-900">
          {question.prompt}
        </h2>
        {question.helper && <p className="mt-2 text-sm text-charcoal-500">{question.helper}</p>}
      </div>

      <fieldset className="mt-8 flex flex-col gap-3">
        <legend className="sr-only">{question.prompt}</legend>
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border px-5 py-4 transition-all ${
                isSelected
                  ? 'border-rose-300 bg-blush-50 shadow-soft'
                  : 'border-charcoal-100 bg-cream-50 hover:border-rose-200 hover:bg-blush-50/50'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={option.id}
                checked={isSelected}
                onChange={() => onSelect(option.id)}
                className="sr-only"
              />
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected ? 'border-rose-400 bg-rose-400' : 'border-charcoal-300'
                }`}
                aria-hidden="true"
              >
                {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
              </span>
              <span className="text-base leading-snug text-charcoal-700">{option.label}</span>
            </label>
          )
        })}
      </fieldset>

      <div className="mt-10 flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={currentIndex === 0}
          aria-label={t('Go to previous question', 'पिछले सवाल पर जाएँ')}
        >
          <ArrowLeft size={18} /> {t('Back', 'पीछे')}
        </Button>
        <Button onClick={onNext} disabled={!selectedOptionId}>
          {isLastQuestion ? t('See My Relationship Pattern', 'मेरा रिलेशनशिप पैटर्न देखें') : t('Continue', 'आगे बढ़ें')} <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  )
}
