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

export type CourseCategory =
  | 'Communication'
  | 'Boundaries'
  | 'Self-Worth'
  | 'Conflict'
  | 'Emotional Patterns'
  | 'Couples'
  | 'Personal Growth'

export type CourseDifficulty = 'Beginner' | 'Intermediate' | 'All levels'

export interface CourseModule {
  title: string
  lessons: string[]
}

export interface Course {
  id: string
  title: string
  category: CourseCategory
  shortDescription: string
  description: string
  lessons: number
  durationWeeks: number
  difficulty: CourseDifficulty
  counselorId: string
  rating: number
  reviewCount: number
  priceInr: number
  originalPriceInr?: number
  accent: 'blush' | 'sage' | 'lavender' | 'rose' | 'peach'
  whatYouWillLearn: string[]
  curriculum: CourseModule[]
  whoThisIsFor: string[]
  whatYouGet: string[]
  faqs: { question: string; answer: string }[]
}

export type IndianLanguage = 'English' | 'Hindi' | 'Gujarati' | 'Marathi' | 'Bengali' | 'Tamil'

export interface Counselor {
  id: string
  name: string
  credentials: string
  specializations: string[]
  experienceYears: number
  languages: IndianLanguage[]
  sessionFormats: ('Video' | 'Audio' | 'Chat' | 'In-person')[]
  rating: number
  reviewCount: number
  pricePerSessionInr: number
  bio: string
  avatarHue: 'blush' | 'sage' | 'lavender' | 'rose' | 'peach'
}

export interface Testimonial {
  id: string
  name: string
  location: string
  quote: string
  context: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface Guide {
  id: string
  number: string
  title: string
  description: string
  pages: number
  ctaLabel: string
}

export interface ReflectionPrompt {
  id: string
  prompt: string
}

export interface AssessmentAnswer {
  questionId: string
  optionId: string
}
