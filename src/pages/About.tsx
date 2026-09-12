import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

const values = [
  {
    title: 'Understanding over judgment',
    description: 'We approach every pattern with curiosity, not criticism — patterns are learned, and can be understood.',
  },
  {
    title: 'Privacy by default',
    description: 'Your reflections and assessment responses are yours. We keep them private and never sell your data.',
  },
  {
    title: 'Practical, not performative',
    description: 'We favor small, doable practices over grand promises. Real change tends to happen gradually.',
  },
  {
    title: 'Rooted in India, open to everyone',
    description: 'Built with Indian languages, pricing, and context in mind — while staying relevant for anyone, anywhere.',
  },
]

export function About() {
  return (
    <>
      <section className="section-space bg-cream-50">
        <div className="container-app">
          <SectionHeading
            eyebrow="About Relationship Guide"
            title="A calm place to understand yourself and your relationships"
            subtitle="That’s what we set out to build — a steady, honest guide for the parts of relationships that are hardest to talk about."
          />

          <div className="mt-14 mx-auto max-w-3xl text-base leading-relaxed text-charcoal-600 space-y-5">
            <p>
              Most of us weren&rsquo;t taught how relationship patterns form, or how to recognize the ones we&rsquo;re
              carrying. We repeat what feels familiar, often without knowing why &mdash; until the same dynamic shows
              up again, in a different relationship, with a different person.
            </p>
            <p>
              Relationship Guide started as a simple idea: give people a clear, compassionate mirror for their relationship
              patterns, and practical tools to work with what they find. No jargon, no judgment, and no promise of
              instant fixes &mdash; just honest reflection and steady practice.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-cream-100">
        <div className="container-app">
          <SectionHeading eyebrow="What guides us" title="Our approach" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-3xl border border-charcoal-100 bg-cream-50 p-7 shadow-soft">
                <h3 className="text-lg font-semibold text-charcoal-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-cream-50" id="contact">
        <div className="container-app">
          <div className="mx-auto max-w-2xl rounded-3xl border border-charcoal-100 bg-blush-50 p-8 sm:p-10 text-center">
            <SectionHeading eyebrow="Get in touch" title="We’d love to hear from you" />
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="mailto:hello@relationshipguide.app" variant="outline" size="md">
                <Mail size={16} /> hello@relationshipguide.app
              </Button>
              <Button href="https://wa.me/919311088577" variant="outline" size="md">
                <MessageCircle size={16} /> WhatsApp Us
              </Button>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-charcoal-500">
              <MapPin size={15} /> Bengaluru, India &middot; Sessions available nationwide
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
