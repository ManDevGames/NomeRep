import { useMemo } from 'react'
import { useLanguage } from '@/context/language'
import { patterns } from '@/data/patterns'
import { questions } from '@/data/questions'
import { courses } from '@/data/courses'
import { counselors } from '@/data/counselors'
import { faqs } from '@/data/faqs'
import { guides, reflectionPrompts } from '@/data/guides'
import { testimonials } from '@/data/testimonials'
import { videoHighlights } from '@/data/videos'
import { patternsHi } from '@/data/hi/patterns'
import { questionsHi } from '@/data/hi/questions'
import {
  categoryLabelsHi,
  counselorsHi,
  coursesHi,
  difficultyLabelsHi,
  faqsHi,
  guidesHi,
  languageLabelsHi,
  reflectionPromptsHi,
  sessionFormatLabelsHi,
  testimonialsHi,
} from '@/data/hi/content'
import type { Counselor, CourseCategory, CourseDifficulty, IndianLanguage, VideoHighlight } from '@/types'

/** Merges Hindi text (keyed by id) over the English records; missing entries fall back to English. */
function overlay<T extends { id: string }>(items: T[], hi: Record<string, Partial<T>>): T[] {
  return items.map((item) => ({ ...item, ...hi[item.id] }))
}

const hindiContent = {
  patterns: overlay(patterns, patternsHi),
  questions: questions.map((q) => {
    const hi = questionsHi[q.id]
    if (!hi) return q
    return {
      ...q,
      prompt: hi.prompt,
      helper: hi.helper ?? q.helper,
      options: q.options.map((o) => ({ ...o, label: hi.options[o.id] ?? o.label })),
    }
  }),
  courses: overlay(courses, coursesHi),
  counselors: overlay(counselors, counselorsHi),
  faqs: overlay(faqs, faqsHi),
  guides: overlay(guides, guidesHi),
  reflectionPrompts: overlay(reflectionPrompts, reflectionPromptsHi),
  testimonials: overlay(testimonials, testimonialsHi),
  videos: videoHighlights.map((v): VideoHighlight => ({ ...v, title: v.titleHi ?? v.title, subtitle: v.subtitleHi ?? v.subtitle })),
}

const englishContent: typeof hindiContent = {
  patterns,
  questions,
  courses,
  counselors,
  faqs,
  guides,
  reflectionPrompts,
  testimonials,
  videos: videoHighlights,
}

/** Site data in the active language, plus labels for enum-like values. */
export function useContent() {
  const { lang } = useLanguage()

  return useMemo(() => {
    const content = lang === 'hi' ? hindiContent : englishContent
    const isHi = lang === 'hi'

    return {
      ...content,
      getPattern: (id: string) => content.patterns.find((p) => p.id === id),
      getCourse: (id: string) => content.courses.find((c) => c.id === id),
      getCounselor: (id: string) => content.counselors.find((c) => c.id === id),
      categoryLabel: (c: CourseCategory | 'All Programs') => (isHi ? categoryLabelsHi[c] : c),
      difficultyLabel: (d: CourseDifficulty) => (isHi ? difficultyLabelsHi[d] : d),
      languageLabel: (l: IndianLanguage) => (isHi ? languageLabelsHi[l] : l),
      sessionFormatLabel: (f: Counselor['sessionFormats'][number]) => (isHi ? sessionFormatLabelsHi[f] : f),
    }
  }, [lang])
}
