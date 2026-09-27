import { useState } from 'react'
import type { FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LeadGuideCard } from '@/components/home/LeadGuideCard'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useContent } from '@/hooks/useContent'
import { useLanguage } from '@/context/language'

export function LeadGuidesSection() {
  const { guides } = useContent()
  const { t } = useLanguage()
  const [activeGuideId, setActiveGuideId] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  // Looked up by id so the modal title follows a language switch while it's open.
  const activeGuide = guides.find((g) => g.id === activeGuideId)

  const closeModal = () => {
    setActiveGuideId(null)
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
        <SectionHeading
          eyebrow={t('Free resources', 'मुफ़्त संसाधन')}
          title={t('Start With These Free Guides', 'इन मुफ़्त गाइड से शुरुआत करें')}
        />

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {guides.map((guide) => (
            <LeadGuideCard key={guide.id} guide={guide} onDownload={(g) => setActiveGuideId(g.id)} />
          ))}
        </div>
      </div>

      <Modal isOpen={!!activeGuide} onClose={closeModal} title={activeGuide?.title ?? ''}>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-charcoal-600">
              {t(
                'Enter your email and we’ll send this guide straight to your inbox.',
                'अपना ईमेल डालें, हम यह गाइड सीधे आपके इनबॉक्स में भेज देंगे।',
              )}
            </p>
            <label htmlFor="guide-email" className="sr-only">
              {t('Email address', 'ईमेल पता')}
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
              {t('Send Me the Guide', 'मुझे गाइड भेजें')}
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <CheckCircle2 size={40} className="text-sage-500" />
            <p className="text-base text-charcoal-700">
              {t(
                `You’re all set. In a live version of Relationship Guide, this guide would now be on its way to ${email || 'your inbox'}.`,
                `सब तैयार है। Relationship Guide के असली वर्ज़न में यह गाइड अब तक ${email || 'आपके इनबॉक्स'} की ओर भेजी जा चुकी होती।`,
              )}
            </p>
            <Button onClick={closeModal} variant="secondary">
              {t('Close', 'बंद करें')}
            </Button>
          </div>
        )}
      </Modal>
    </section>
  )
}
