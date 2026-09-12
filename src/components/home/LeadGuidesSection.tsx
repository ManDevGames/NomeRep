import { useState } from 'react'
import type { FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LeadGuideCard } from '@/components/home/LeadGuideCard'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { guides } from '@/data/guides'
import type { Guide } from '@/types'

export function LeadGuidesSection() {
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const closeModal = () => {
    setActiveGuide(null)
    setSubmitted(false)
    setEmail('')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="section-space bg-cream-50" id="guides">
      <div className="container-app">
        <SectionHeading eyebrow="Free resources" title="Start With These Free Guides" />

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {guides.map((guide) => (
            <LeadGuideCard key={guide.id} guide={guide} onDownload={setActiveGuide} />
          ))}
        </div>
      </div>

      <Modal isOpen={!!activeGuide} onClose={closeModal} title={activeGuide?.title ?? ''}>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-charcoal-600">
              Enter your email and we’ll send this guide straight to your inbox.
            </p>
            <label htmlFor="guide-email" className="sr-only">
              Email address
            </label>
            <input
              id="guide-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-full border border-charcoal-200 px-5 py-3 text-sm focus:border-rose-300"
            />
            <Button type="submit" className="w-full">
              Send Me the Guide
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <CheckCircle2 size={40} className="text-sage-500" />
            <p className="text-base text-charcoal-700">
              You’re all set. In a live version of Relationship Guide, this guide would now be on its way to {email || 'your inbox'}.
            </p>
            <Button onClick={closeModal} variant="secondary">
              Close
            </Button>
          </div>
        )}
      </Modal>
    </section>
  )
}
