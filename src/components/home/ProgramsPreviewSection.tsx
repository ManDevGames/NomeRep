import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { CourseCard } from '@/components/courses/CourseCard'
import { useContent } from '@/hooks/useContent'
import { useLanguage } from '@/context/language'

export function ProgramsPreviewSection() {
  const { courses } = useContent()
  const { t } = useLanguage()
  const featured = courses.slice(0, 3)

  return (
    <section className="section-space bg-cream-100" id="programs">
      <div className="container-app">
        <SectionHeading
          eyebrow={t('Programs', 'प्रोग्राम')}
          title={t('Structured programs to build new habits', 'नई आदतें बनाने के लिए व्यवस्थित प्रोग्राम')}
          subtitle={t(
            'Self-paced courses designed around the relationship patterns people navigate most often.',
            'अपनी रफ़्तार से किए जाने वाले कोर्स, जो उन रिलेशनशिप पैटर्न पर आधारित हैं जिनसे लोग सबसे ज़्यादा जूझते हैं।',
          )}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button to="/programs" variant="outline" size="lg">
            {t('Explore All Programs', 'सभी प्रोग्राम देखें')} <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  )
}
