import { useCallback, useEffect, useMemo, useState } from 'react'
import { questions } from '@/data/questions'
import { scoreAssessment } from '@/utils/scoring'
import type { AssessmentAnswer } from '@/types'

const STORAGE_KEY = 'relationship-guide:assessment-answers'

function loadAnswers(): AssessmentAnswer[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AssessmentAnswer[]) : []
  } catch {
    return []
  }
}

export function useAssessment() {
  const [answers, setAnswers] = useState<AssessmentAnswer[]>(() => loadAnswers())
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
    } catch {
      // Storage unavailable (e.g. private browsing) — assessment still works in-memory.
    }
  }, [answers])

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length
  const isLastQuestion = currentIndex === totalQuestions - 1
  const selectedOptionId = answers.find((a) => a.questionId === currentQuestion?.id)?.optionId

  const selectAnswer = useCallback(
    (optionId: string) => {
      setAnswers((prev) => {
        const withoutCurrent = prev.filter((a) => a.questionId !== currentQuestion.id)
        return [...withoutCurrent, { questionId: currentQuestion.id, optionId }]
      })
    },
    [currentQuestion],
  )

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, totalQuestions - 1))
  }, [totalQuestions])

  const goBack = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0))
  }, [])

  const reset = useCallback(() => {
    setAnswers([])
    setCurrentIndex(0)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const result = useMemo(() => {
    if (answers.length < totalQuestions) return null
    return scoreAssessment(answers)
  }, [answers, totalQuestions])

  return {
    questions,
    currentQuestion,
    currentIndex,
    totalQuestions,
    isLastQuestion,
    selectedOptionId,
    answers,
    selectAnswer,
    goNext,
    goBack,
    reset,
    result,
  }
}

export function getStoredResult() {
  const answers = loadAnswers()
  if (answers.length < questions.length) return null
  return scoreAssessment(answers)
}
