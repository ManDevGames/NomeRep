import { useNavigate } from 'react-router-dom'
import { AssessmentCard } from '@/components/assessment/AssessmentCard'
import { useAssessment } from '@/hooks/useAssessment'

export function AssessmentFlow() {
  const navigate = useNavigate()
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

  return (
    <AssessmentCard
      question={currentQuestion}
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
