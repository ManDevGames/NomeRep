import { useState } from 'react'
import type { FormEvent } from 'react'
import { CalendarCheck, Globe2, Star, Video } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { formatInr } from '@/utils/format'
import { useContent } from '@/hooks/useContent'
import { useLanguage } from '@/context/language'
import type { Counselor } from '@/types'

const timeSlots = [
  { en: 'Today, 6:00 PM', hi: 'आज, शाम 6:00 बजे' },
  { en: 'Tomorrow, 10:30 AM', hi: 'कल, सुबह 10:30 बजे' },
  { en: 'Tomorrow, 5:00 PM', hi: 'कल, शाम 5:00 बजे' },
  { en: 'Sat, 11:00 AM', hi: 'शनिवार, सुबह 11:00 बजे' },
]

interface CounselorProfileModalProps {
  counselor: Counselor | null
  onClose: () => void
}

export function CounselorProfileModal({ counselor, onClose }: CounselorProfileModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [booked, setBooked] = useState(false)
  const { languageLabel, sessionFormatLabel } = useContent()
  const { t } = useLanguage()

  if (!counselor) return null

  const handleClose = () => {
    setSelectedSlot(null)
    setBooked(false)
    onClose()
  }

  const handleBook = (e: FormEvent) => {
    e.preventDefault()
    if (selectedSlot === null) return
    setBooked(true)
  }

  const slotLabel = selectedSlot === null ? '' : t(timeSlots[selectedSlot])

  return (
    <Modal isOpen={!!counselor} onClose={handleClose} title={counselor.name}>
      {!booked ? (
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm text-charcoal-500">{counselor.credentials}</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-charcoal-600">
              <Star size={14} className="fill-amber-400 text-amber-400" /> {counselor.rating} &middot;{' '}
              {t(
                `${counselor.reviewCount} reviews · ${counselor.experienceYears}+ yrs experience`,
                `${counselor.reviewCount} रिव्यू · ${counselor.experienceYears}+ साल का अनुभव`,
              )}
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
              <Globe2 size={15} /> {counselor.languages.map(languageLabel).join(', ')}
            </p>
            <p className="flex items-center gap-1.5">
              <Video size={15} /> {counselor.sessionFormats.map(sessionFormatLabel).join(', ')}
            </p>
          </div>

          <form onSubmit={handleBook} className="border-t border-charcoal-100 pt-5">
            <p className="flex items-center gap-2 text-sm font-medium text-charcoal-800">
              <CalendarCheck size={16} /> {t('Choose a session time', 'सेशन का समय चुनें')}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {timeSlots.map((slot, i) => (
                <button
                  type="button"
                  key={slot.en}
                  onClick={() => setSelectedSlot(i)}
                  className={`rounded-xl border px-3 py-2.5 text-xs sm:text-sm transition-colors ${
                    selectedSlot === i
                      ? 'border-rose-300 bg-blush-50 text-charcoal-900'
                      : 'border-charcoal-200 text-charcoal-600 hover:border-rose-200'
                  }`}
                >
                  {t(slot)}
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl bg-cream-100 p-4 text-sm">
              <span className="text-charcoal-600">{t('Session fee', 'सेशन फ़ीस')}</span>
              <span className="font-semibold text-charcoal-900">{formatInr(counselor.pricePerSessionInr)}</span>
            </div>

            <Button type="submit" disabled={selectedSlot === null} className="mt-4 w-full">
              {t('Book a Session', 'सेशन बुक करें')}
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <CalendarCheck size={40} className="text-sage-500" />
          <p className="text-base text-charcoal-700">
            {t(
              `Your session with ${counselor.name} is booked for ${slotLabel}. In a live version of Relationship Guide, you’d receive a confirmation with a secure video link and UPI payment receipt.`,
              `${counselor.name} के साथ आपका सेशन ${slotLabel} के लिए बुक हो गया है। Relationship Guide के असली वर्ज़न में आपको एक सुरक्षित वीडियो लिंक और UPI पेमेंट की रसीद के साथ कन्फ़र्मेशन मिलता।`,
            )}
          </p>
          <Button onClick={handleClose} variant="secondary">
            {t('Done', 'ठीक है')}
          </Button>
        </div>
      )}
    </Modal>
  )
}
