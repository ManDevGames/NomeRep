import { useState } from 'react'
import { Check, PenLine } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { reflectionPrompts } from '@/data/guides'
import { useReflection } from '@/hooks/useReflection'

export function ReflectionSection() {
  const { notes, updateNote, save, saved } = useReflection()
  const [activePrompt, setActivePrompt] = useState(reflectionPrompts[0].id)

  return (
    <section className="section-space bg-cream-100" id="reflection">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Reflection</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold">Reflection</h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-500 leading-relaxed">
            Understanding your pattern is the first step. Reflection helps you decide what you want to change.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {reflectionPrompts.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePrompt(p.id)}
                className={`flex shrink-0 items-start gap-2 rounded-2xl border px-4 py-3 text-left text-sm transition-colors lg:shrink ${
                  activePrompt === p.id
                    ? 'border-rose-300 bg-blush-50 text-charcoal-900'
                    : 'border-charcoal-100 bg-cream-50 text-charcoal-600 hover:border-rose-200'
                }`}
              >
                <PenLine size={16} className="mt-0.5 shrink-0 text-rose-300" />
                <span className="whitespace-nowrap lg:whitespace-normal">{p.prompt}</span>
              </button>
            ))}
          </div>

          <div className="rounded-3xl border border-charcoal-100 bg-cream-50 p-6 sm:p-8 shadow-soft">
            <label htmlFor="reflection-textarea" className="text-base font-medium text-charcoal-800">
              {reflectionPrompts.find((p) => p.id === activePrompt)?.prompt}
            </label>
            <textarea
              id="reflection-textarea"
              value={notes[activePrompt] ?? ''}
              onChange={(e) => updateNote(activePrompt, e.target.value)}
              rows={6}
              placeholder="Write freely — there’s no right answer here."
              className="mt-4 w-full resize-none rounded-2xl border border-charcoal-200 bg-cream-50 p-4 text-sm leading-relaxed text-charcoal-800 placeholder:text-charcoal-400 focus:border-rose-300"
            />
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-xs text-charcoal-400">Saved privately to this device.</p>
              <Button onClick={save} size="sm" variant={saved ? 'secondary' : 'primary'}>
                {saved ? (
                  <>
                    <Check size={16} /> Saved
                  </>
                ) : (
                  'Save My Reflection'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
