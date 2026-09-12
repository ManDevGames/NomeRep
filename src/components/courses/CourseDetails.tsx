import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  BookOpen,
  CheckCircle2,
  Clock,
  PartyPopper,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { getCounselorById } from '@/data/counselors'
import { formatInr } from '@/utils/format'
import type { Course } from '@/types'

interface CourseDetailsProps {
  course: Course
}

export function CourseDetails({ course }: CourseDetailsProps) {
  const counselor = getCounselorById(course.counselorId)
  const [isEnrollOpen, setIsEnrollOpen] = useState(false)
  const [enrolled, setEnrolled] = useState(false)

  const handleEnroll = (e: FormEvent) => {
    e.preventDefault()
    setEnrolled(true)
  }

  const closeModal = () => {
    setIsEnrollOpen(false)
    setEnrolled(false)
  }

  return (
    <div className="pb-24 lg:pb-0">
      <div className="bg-cream-100 border-b border-charcoal-100">
        <div className="container-app py-12 sm:py-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <span className="eyebrow">{course.category}</span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold leading-tight text-charcoal-900">
              {course.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-charcoal-600">
              {course.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-charcoal-600">
              <span className="flex items-center gap-1.5">
                <Star size={16} className="fill-amber-400 text-amber-400" /> {course.rating}
                <span className="text-charcoal-400">({course.reviewCount} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} /> {course.durationWeeks} weeks
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={16} /> {course.curriculum.length} modules &middot; {course.lessons} lessons
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={16} /> {course.difficulty}
              </span>
            </div>

            {counselor && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-charcoal-100 bg-cream-50 p-4 max-w-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-200 font-serif text-lg text-charcoal-800">
                  {counselor.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal-900">{counselor.name}</p>
                  <p className="text-xs text-charcoal-500">{counselor.credentials}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sticky enrollment card - desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl border border-charcoal-100 bg-cream-50 p-7 shadow-card">
              <EnrollCardContent course={course} onEnroll={() => setIsEnrollOpen(true)} />
            </div>
          </div>
        </div>
      </div>

      <div className="container-app py-14 sm:py-16 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-14">
          <section>
            <h2 className="text-2xl font-semibold text-charcoal-900">What you&rsquo;ll learn</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {course.whatYouWillLearn.map((point) => (
                <div key={point} className="flex gap-3 rounded-2xl border border-charcoal-100 bg-cream-50 p-4">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-sage-500" />
                  <p className="text-sm leading-relaxed text-charcoal-700">{point}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal-900">Course curriculum</h2>
            <div className="mt-6 flex flex-col gap-3">
              {course.curriculum.map((module, i) => (
                <details
                  key={module.title}
                  className="group rounded-2xl border border-charcoal-100 bg-cream-50 p-5 open:shadow-soft"
                  open={i === 0}
                >
                  <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-charcoal-900">
                    {module.title}
                    <span className="text-xs text-charcoal-400">{module.lessons.length} lessons</span>
                  </summary>
                  <ul className="mt-4 flex flex-col gap-2 border-t border-charcoal-100 pt-4">
                    {module.lessons.map((lesson) => (
                      <li key={lesson} className="flex items-center gap-2 text-sm text-charcoal-600">
                        <Sparkles size={13} className="text-rose-300" /> {lesson}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal-900">Who this is for</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {course.whoThisIsFor.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-charcoal-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-300" />
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal-900">What you&rsquo;ll get</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {course.whatYouGet.map((point) => (
                <div key={point} className="flex gap-3 rounded-2xl bg-sage-50 p-4">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-sage-500" />
                  <p className="text-sm leading-relaxed text-charcoal-700">{point}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-charcoal-900">Frequently asked questions</h2>
            <div className="mt-6 flex flex-col gap-3">
              {course.faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl border border-charcoal-100 bg-cream-50 p-5">
                  <summary className="cursor-pointer text-base font-medium text-charcoal-900">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Fixed bottom CTA - mobile only */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-charcoal-100 bg-cream-50/95 p-4 backdrop-blur-md lg:hidden">
        <div>
          <p className="text-lg font-semibold text-charcoal-900">{formatInr(course.priceInr)}</p>
          {course.originalPriceInr && (
            <p className="text-xs text-charcoal-400 line-through">{formatInr(course.originalPriceInr)}</p>
          )}
        </div>
        <Button onClick={() => setIsEnrollOpen(true)} size="md">
          Enroll Now
        </Button>
      </div>

      <Modal isOpen={isEnrollOpen} onClose={closeModal} title={enrolled ? 'You’re enrolled!' : `Enroll in ${course.title}`}>
        {!enrolled ? (
          <form onSubmit={handleEnroll} className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-charcoal-600">
              This is a demo checkout. In a live version, you&rsquo;d complete payment via UPI, card, or netbanking.
            </p>
            <div className="rounded-2xl bg-cream-100 p-4 text-sm text-charcoal-700">
              <div className="flex justify-between">
                <span>{course.title}</span>
                <span className="font-medium">{formatInr(course.priceInr)}</span>
              </div>
            </div>
            <label htmlFor="enroll-email" className="text-sm font-medium text-charcoal-700">
              Email address
            </label>
            <input
              id="enroll-email"
              type="email"
              required
              placeholder="you@example.com"
              className="rounded-full border border-charcoal-200 px-5 py-3 text-sm focus:border-rose-300"
            />
            <Button type="submit" className="w-full">
              Confirm Enrollment (Demo)
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <PartyPopper size={40} className="text-rose-400" />
            <p className="text-base text-charcoal-700">
              Welcome in. In a live version of Relationship Guide, you&rsquo;d now have full access to {course.title}.
            </p>
            <Button onClick={closeModal} variant="secondary">
              Close
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}

function EnrollCardContent({ course, onEnroll }: { course: Course; onEnroll: () => void }) {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-charcoal-900">{formatInr(course.priceInr)}</span>
        {course.originalPriceInr && (
          <span className="text-base text-charcoal-400 line-through">{formatInr(course.originalPriceInr)}</span>
        )}
      </div>
      <Button onClick={onEnroll} className="mt-5 w-full" size="lg">
        Enroll Now
      </Button>
      <p className="mt-3 text-center text-xs text-charcoal-400">UPI, cards and netbanking accepted</p>
      <ul className="mt-6 flex flex-col gap-3 border-t border-charcoal-100 pt-6">
        <li className="flex items-center gap-2 text-sm text-charcoal-600">
          <CheckCircle2 size={16} className="text-sage-500" /> Lifetime access to lessons
        </li>
        <li className="flex items-center gap-2 text-sm text-charcoal-600">
          <CheckCircle2 size={16} className="text-sage-500" /> Downloadable worksheets
        </li>
        <li className="flex items-center gap-2 text-sm text-charcoal-600">
          <CheckCircle2 size={16} className="text-sage-500" /> Certificate of completion
        </li>
      </ul>
    </div>
  )
}
