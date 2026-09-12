import { useMemo, useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CourseCard } from '@/components/courses/CourseCard'
import { courses, courseCategories } from '@/data/courses'

type Category = (typeof courseCategories)[number]

export function Programs() {
  const [activeCategory, setActiveCategory] = useState<Category>('All Programs')

  const filteredCourses = useMemo(() => {
    if (activeCategory === 'All Programs') return courses
    return courses.filter((c) => c.category === activeCategory)
  }, [activeCategory])

  return (
    <section className="section-space bg-cream-50">
      <div className="container-app">
        <SectionHeading
          eyebrow="Programs"
          title="Explore Relationship Programs"
          subtitle="Choose the support that matches where you are right now."
        />

        <div
          className="mt-10 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible"
          role="tablist"
          aria-label="Filter programs by category"
        >
          {courseCategories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-charcoal-900 text-cream-50'
                  : 'bg-cream-100 text-charcoal-600 hover:bg-blush-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredCourses.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-charcoal-500">No programs found in this category yet.</p>
        )}
      </div>
    </section>
  )
}
