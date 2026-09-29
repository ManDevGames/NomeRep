// Core domain types. Designed so a real API could replace the local mock
// data modules in `src/data` without changing component contracts.

export type PatternId =
  | 'over-giver'
  | 'anxious-connector'
  | 'guarded-independent'
  | 'conflict-avoider'
  | 'secure-builder'

export interface RelationshipPattern {
  id: PatternId
  name: string
  tagline: string
  description: string
  whatMayBeHappening: string[]
  strengths: string[]
  growthAreas: string[]
  issues: [PatternIssue, PatternIssue]
  emotionalTriggers: string[]
  commonBehaviors: string[]
  reinforcingFactors: string[]
  healthierAlternatives: string[]
  nextSteps: string[]
  accent: 'blush' | 'sage' | 'lavender' | 'rose'
}

export interface PatternIssue {
  title: string
  description: string
}

export interface AssessmentOption {
  id: string
  label: string
  /** Points this option contributes to each pattern, used by the scoring util. */
  weights: Partial<Record<PatternId, number>>
}

export interface AssessmentQuestion {
  id: string
  prompt: string
  helper?: string
  options: AssessmentOption[]
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface ReflectionPrompt {
  id: string
  prompt: string
}

export interface AssessmentAnswer {
  questionId: string
  optionId: string
}

export interface VideoHighlight {
  id: string
  title: string
  /** Any YouTube link: watch?v=, youtu.be/, shorts/ or embed/ URLs all work. */
  url: string
  /** Optional custom thumbnail. Falls back to YouTube's own thumbnail. */
  thumbnail?: string
  subtitle?: string
  /** Optional Hindi title/subtitle, shown when the site is in Hindi. Falls back to English. */
  titleHi?: string
  subtitleHi?: string
}
