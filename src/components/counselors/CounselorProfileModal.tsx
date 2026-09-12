import { useState } from 'react'
import type { FormEvent } from 'react'
import { CalendarCheck, Globe2, Star, Video } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { formatInr } from '@/utils/format'
import type { Counselor } from '@/types'

const timeSlots = ['Today, 6:00 PM', 'Tomorrow, 10:30 AM', 'Tomorrow, 5:00 PM', 'Sat, 11:00 AM']

interface CounselorProfileModalProps {
  counselor: Counselor | null
  onClose: () => void
}

export function CounselorProfileModal({ counselor, onClose }: CounselorProfileModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [booked, setBooked] = useState(false)

  if (!counselor) return null

  const handleClose = () => {
    setSelectedSlot(null)
    setBooked(false)
    onClose()
  }

  const handleBook = (e: FormEvent) => {
    e.preventDefault()
    if (!selectedSlot) return
    setBooked(true)
  }

  return (
    <Modal isOpen={!!counselor} onClose={handleClose} title={counselor.name}>
      {!booked ? (
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm text-charcoal-500">{counselor.credentials}</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-charcoal-600">
              <Star size={14} className="fill-amber-400 text-amber-400" /> {counselor.rating} &middot;{' '}
              {counselor.reviewCount} reviews &middot; {counselor.experienceYears}+ yrs experience
            </p>
          </div>

          <p className="text-sm leading-relaxed text-charcoal-700">{counselor.bio}</p>

          <div className="flex flex-wrap gap-1.5">
            {counselor.specializations.map((s) => (
              <span key={s} className="rounded-full bg-sage-100 px-3 py-1 text-xs text-charcoal-700">
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-sm text-charcoal-600">
            <p className="flex items-center gap-1.5">
              <Globe2 size={15} /> {counselor.languages.join(', ')}
            </p>
            <p className="flex items-center gap-1.5">
              <Video size={15} /> {counselor.sessionFormats.join(', ')}
            </p>
          </div>

          <form onSubmit={handleBook} className="border-t border-charcoal-100 pt-5">
            <p className="flex items-center gap-2 text-sm font-medium text-charcoal-800">
              <CalendarCheck size={16} /> Choose a session time
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-xl border px-3 py-2.5 text-xs sm:text-sm transition-colors ${
                    selectedSlot === slot
                      ? 'border-rose-300 bg-blush-50 text-charcoal-900'
                      : 'border-charcoal-200 text-charcoal-600 hover:border-rose-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl bg-cream-100 p-4 text-sm">
              <span className="text-charcoal-600">Session fee</span>
              <span className="font-semibold text-charcoal-900">{formatInr(counselor.pricePerSessionInr)}</span>
            </div>

            <Button type="submit" disabled={!selectedSlot} className="mt-4 w-full">
              Book a Session
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <CalendarCheck size={40} className="text-sage-500" />
          <p className="text-base text-charcoal-700">
            Your session with {counselor.name} is booked for {selectedSlot}. In a live version of Relationship Guide, you&rsquo;d
            receive a confirmation with a secure video link and UPI payment receipt.
          </p>
          <Button onClick={handleClose} variant="secondary">
            Done
          </Button>
        </div>
      )}
    </Modal>
  )
}
