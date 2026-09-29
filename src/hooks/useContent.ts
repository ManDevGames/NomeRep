import { useMemo } from 'react'
import { useLanguage } from '@/context/language'
import { patterns } from '@/data/patterns'
import { questions } from '@/data/questions'
import { faqs } from '@/data/faqs'
import { reflectionPrompts } from '@/data/guides'
import { patternsHi } from '@/data/hi/patterns'
import { questionsHi } from '@/data/hi/questions'
import { faqsHi, reflectionPromptsHi } from '@/data/hi/content'

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
  faqs: overlay(faqs, faqsHi),
  reflectionPrompts: overlay(reflectionPrompts, reflectionPromptsHi),
}

const englishContent: typeof hindiContent = {
  patterns,
  questions,
  faqs,
  reflectionPrompts,
}

/** Site data in the active language. */
export function useContent() {
  const { lang } = useLanguage()

  return useMemo(() => {
    const content = lang === 'hi' ? hindiContent : englishContent

    return {
      ...content,
      getPattern: (id: string) => content.patterns.find((p) => p.id === id),
    }
  }, [lang])
}
