import { useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CounselorCard } from '@/components/counselors/CounselorCard'
import { CounselorProfileModal } from '@/components/counselors/CounselorProfileModal'
import { useContent } from '@/hooks/useContent'
import { useLanguage } from '@/context/language'
import type { Counselor } from '@/types'

export function CounselorsSection() {
  const { counselors } = useContent()
  const { t } = useLanguage()
  const [activeCounselorId, setActiveCounselorId] = useState<string | null>(null)
  const activeCounselor = counselors.find((c) => c.id === activeCounselorId) ?? null

  return (
    <section className="section-space bg-cream-50" id="counselors">
      <div className="container-app">
        <SectionHeading
          eyebrow={t('1:1 support', '1:1 सपोर्ट')}
          title={t('Find the Right Counselor for You', 'अपने लिए सही काउंसलर चुनें')}
          subtitle={t(
            'Demo profiles for this prototype — sessions available in multiple Indian languages and formats.',
            'इस प्रोटोटाइप के लिए डेमो प्रोफ़ाइल — सेशन कई भारतीय भाषाओं और अलग-अलग तरीकों में उपलब्ध हैं।',
          )}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {counselors.slice(0, 3).map((counselor) => (
            <CounselorCard
              key={counselor.id}
              counselor={counselor}
              onViewProfile={(c: Counselor) => setActiveCounselorId(c.id)}
            />
          ))}
        </div>
      </div>

      <CounselorProfileModal counselor={activeCounselor} onClose={() => setActiveCounselorId(null)} />
    </section>
  )
}
