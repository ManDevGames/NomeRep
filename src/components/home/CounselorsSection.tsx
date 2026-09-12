import { useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CounselorCard } from '@/components/counselors/CounselorCard'
import { CounselorProfileModal } from '@/components/counselors/CounselorProfileModal'
import { counselors } from '@/data/counselors'
import type { Counselor } from '@/types'

export function CounselorsSection() {
  const [activeCounselor, setActiveCounselor] = useState<Counselor | null>(null)

  return (
    <section className="section-space bg-cream-50" id="counselors">
      <div className="container-app">
        <SectionHeading
          eyebrow="1:1 support"
          title="Find the Right Counselor for You"
          subtitle="Demo profiles for this prototype — sessions available in multiple Indian languages and formats."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {counselors.slice(0, 3).map((counselor) => (
            <CounselorCard key={counselor.id} counselor={counselor} onViewProfile={setActiveCounselor} />
          ))}
        </div>
      </div>

      <CounselorProfileModal counselor={activeCounselor} onClose={() => setActiveCounselor(null)} />
    </section>
  )
}
