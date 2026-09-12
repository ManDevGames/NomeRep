import { questions } from '@/data/questions'
import { patterns } from '@/data/patterns'
import type { AssessmentAnswer, PatternId, RelationshipPattern } from '@/types'

/**
 * Tallies weighted points per pattern from the user's answers and returns the
 * highest-scoring pattern. Ties resolve by pattern order in `patterns.ts`,
 * with `secure-builder` intentionally last so a clear lean toward a growth
 * pattern is favored over a marginal secure score.
 */
export function scoreAssessment(answers: AssessmentAnswer[]): RelationshipPattern {
  const totals: Partial<Record<PatternId, number>> = {}

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId)
    const option = question?.options.find((o) => o.id === answer.optionId)
    if (!option) continue

    for (const [patternId, weight] of Object.entries(option.weights)) {
      const id = patternId as PatternId
      totals[id] = (totals[id] ?? 0) + (weight ?? 0)
    }
  }

  let winner: RelationshipPattern = patterns[0]
  let bestScore = -Infinity

  for (const pattern of patterns) {
    const score = totals[pattern.id] ?? 0
    if (score > bestScore) {
      bestScore = score
      winner = pattern
    }
  }

  return winner
}
