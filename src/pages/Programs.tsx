import { useMemo, useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CourseCard } from '@/components/courses/CourseCard'
import { courseCategories } from '@/data/courses'
import { useContent } from '@/hooks/useContent'
import { useLanguage } from '@/context/language'

type Category = (typeof courseCategories)[number]

export function Programs() {
  const { courses, categoryLabel } = useContent()
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<Category>('All Programs')

  const filteredCourses = useMemo(() => {
    if (activeCategory === 'All Programs') return courses
    return courses.filter((c) => c.category === activeCategory)
  }, [activeCategory, courses])

  return (
    <section className="section-space bg-cream-50">
      <div className="container-app">
        <SectionHeading
          eyebrow={t('Programs', 'प्रोग्राम')}
          title={t('Explore Relationship Programs', 'रिलेशनशिप प्रोग्राम देखें')}
          subtitle={t(
            'Choose the support that matches where you are right now.',
            'वह सपोर्ट चुनें जो आपकी अभी की स्थिति से मेल खाता हो।',
          )}
        />

        <div
          className="mt-10 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible"
          role="tablist"
          aria-label={t('Filter programs by category', 'कैटेगरी के हिसाब से प्रोग्राम देखें')}
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
              {categoryLabel(category)}
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
          <p className="mt-16 text-center text-charcoal-500">{t('No programs found in this category yet.', 'इस कैटेगरी में अभी कोई प्रोग्राम नहीं है।')}</p>
        )}
      </div>
    </section>
  )
}
