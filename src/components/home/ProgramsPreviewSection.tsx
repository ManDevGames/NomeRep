import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { CourseCard } from '@/components/courses/CourseCard'
import { courses } from '@/data/courses'

export function ProgramsPreviewSection() {
  const featured = courses.slice(0, 3)

  return (
    <section className="section-space bg-cream-100" id="programs">
      <div className="container-app">
        <SectionHeading
          eyebrow="Programs"
          title="Structured programs to build new habits"
          subtitle="Self-paced courses designed around the relationship patterns people navigate most often."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button to="/programs" variant="outline" size="lg">
            Explore All Programs <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  )
}
