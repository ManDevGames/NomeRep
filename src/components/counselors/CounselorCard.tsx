import { Globe2, Star, Video } from 'lucide-react'
import { formatInr } from '@/utils/format'
import type { Counselor } from '@/types'

const avatarBg: Record<Counselor['avatarHue'], string> = {
  blush: 'bg-blush-200',
  sage: 'bg-sage-200',
  lavender: 'bg-lavender-200',
  rose: 'bg-rose-200',
  peach: 'bg-amber-100',
}

interface CounselorCardProps {
  counselor: Counselor
  onViewProfile: (counselor: Counselor) => void
}

export function CounselorCard({ counselor, onViewProfile }: CounselorCardProps) {
  return (
    <div className="flex h-full flex-col gap-5 rounded-3xl border border-charcoal-100 bg-cream-50 p-6 sm:p-7 shadow-soft transition-shadow hover:shadow-card">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-serif text-2xl text-charcoal-800 ${avatarBg[counselor.avatarHue]}`}
          aria-hidden="true"
        >
          {counselor.name.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-charcoal-900">{counselor.name}</h3>
          <p className="text-xs text-charcoal-500">{counselor.credentials}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-charcoal-600">
            <Star size={13} className="fill-amber-400 text-amber-400" /> {counselor.rating}
            <span className="text-charcoal-400">({counselor.reviewCount})</span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {counselor.specializations.map((s) => (
          <span key={s} className="rounded-full bg-sage-100 px-3 py-1 text-xs text-charcoal-700">
            {s}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2 text-sm text-charcoal-600">
        <p>{counselor.experienceYears}+ years of experience</p>
        <p className="flex items-center gap-1.5">
          <Globe2 size={15} className="shrink-0 text-charcoal-400" /> {counselor.languages.join(', ')}
        </p>
        <p className="flex items-center gap-1.5">
          <Video size={15} className="shrink-0 text-charcoal-400" /> {counselor.sessionFormats.join(', ')}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-charcoal-100 pt-4">
        <div>
          <p className="text-xs text-charcoal-400">Per session</p>
          <p className="text-base font-semibold text-charcoal-900">{formatInr(counselor.pricePerSessionInr)}</p>
        </div>
        <button
          onClick={() => onViewProfile(counselor)}
          className="rounded-full border border-charcoal-300/50 px-5 py-2.5 text-sm font-medium text-charcoal-800 transition-colors hover:border-rose-300 hover:bg-blush-50"
        >
          View Profile
        </button>
      </div>
    </div>
  )
}
