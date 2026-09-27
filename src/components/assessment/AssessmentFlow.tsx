import { useNavigate } from 'react-router-dom'
import { AssessmentCard } from '@/components/assessment/AssessmentCard'
import { useAssessment } from '@/hooks/useAssessment'
import { useContent } from '@/hooks/useContent'

export function AssessmentFlow() {
  const navigate = useNavigate()
  const { questions } = useContent()
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    isLastQuestion,
    selectedOptionId,
    selectAnswer,
    goNext,
    goBack,
  } = useAssessment()

  const handleNext = () => {
    if (isLastQuestion) {
      navigate('/assessment/result')
      return
    }
    goNext()
  }

  if (!currentQuestion) {
    return null
  }

  const localizedQuestion = questions.find((q) => q.id === currentQuestion.id) ?? currentQuestion

  return (
    <AssessmentCard
      question={localizedQuestion}
      currentIndex={currentIndex}
      totalQuestions={totalQuestions}
      selectedOptionId={selectedOptionId}
      onSelect={selectAnswer}
      onBack={goBack}
      onNext={handleNext}
      isLastQuestion={isLastQuestion}
    />
  )
}
