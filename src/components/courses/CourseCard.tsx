import { Link } from 'react-router-dom'
import { BookOpen, Clock, Star } from 'lucide-react'
import { getCounselorById } from '@/data/counselors'
import { formatInr } from '@/utils/format'
import type { Course } from '@/types'

const accentBg: Record<Course['accent'], string> = {
  blush: 'from-blush-100 to-blush-50',
  sage: 'from-sage-100 to-sage-50',
  lavender: 'from-lavender-100 to-lavender-50',
  rose: 'from-rose-100 to-rose-50',
  peach: 'from-amber-100 to-cream-50',
}

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const counselor = getCounselorById(course.counselorId)

  return (
    <Link
      to={`/programs/${course.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-charcoal-100 bg-cream-50 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div className={`relative h-36 bg-gradient-to-br ${accentBg[course.accent]}`}>
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <BookOpen size={48} strokeWidth={1.2} className="text-charcoal-600" />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1 text-xs font-medium text-charcoal-700">
          {course.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-semibold leading-snug text-charcoal-900 group-hover:text-rose-500 transition-colors">
          {course.title}
        </h3>
        <p className="text-sm leading-relaxed text-charcoal-600 line-clamp-2">{course.shortDescription}</p>

        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-charcoal-500">
          <span className="flex items-center gap-1">
            <BookOpen size={14} /> {course.lessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {course.durationWeeks} weeks
          </span>
          <span>{course.difficulty}</span>
        </div>

        {counselor && <p className="text-xs text-charcoal-400">By {counselor.name}</p>}

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="flex items-center gap-1 text-sm font-medium text-charcoal-700">
            <Star size={15} className="fill-amber-400 text-amber-400" /> {course.rating}
            <span className="text-charcoal-400">({course.reviewCount})</span>
          </span>
          <div className="text-right">
            {course.originalPriceInr && (
              <span className="mr-2 text-xs text-charcoal-400 line-through">
                {formatInr(course.originalPriceInr)}
              </span>
            )}
            <span className="text-base font-semibold text-charcoal-900">{formatInr(course.priceInr)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
