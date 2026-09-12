import type { Course } from '@/types'

export const courses: Course[] = [
  {
    id: 'relationship-reprogramming',
    title: 'Relationship Reprogramming',
    category: 'Emotional Patterns',
    shortDescription:
      'A guided program to understand your relationship pattern and build healthier ways of connecting, communicating and responding.',
    description:
      'Relationship Reprogramming is a structured, six-week path through the four stages that matter most: understanding your pattern, reflecting on what drives it, practicing healthier responses, and building habits that last. Rather than focusing on a single skill, this program brings together communication, boundaries, self-worth and conflict work into one guided journey — with a real counselor available alongside you.',
    lessons: 24,
    durationWeeks: 6,
    difficulty: 'All levels',
    counselorId: 'shalinee-sen',
    rating: 4.9,
    reviewCount: 412,
    priceInr: 3499,
    originalPriceInr: 4499,
    accent: 'rose',
    whatYouWillLearn: [
      'How to recognize the relationship pattern you keep repeating',
      'What emotional triggers are driving your responses',
      'Practical scripts for boundaries, needs and hard conversations',
      'How to build habits that hold up under real relationship stress',
    ],
    curriculum: [
      {
        title: 'Module 1 — Understand',
        lessons: ['Mapping your relationship pattern', 'Where the pattern began', 'Recognizing it in real time'],
      },
      {
        title: 'Module 2 — Reflect',
        lessons: ['Identifying your emotional triggers', 'What the pattern is protecting you from', 'Naming what you actually need'],
      },
      {
        title: 'Module 3 — Reprogram',
        lessons: ['Boundary and communication scripts', 'Practicing a healthier response', 'Working through a real situation'],
      },
      {
        title: 'Module 4 — Grow',
        lessons: ['Building a sustainable weekly practice', 'Handling setbacks without self-judgment', 'Your ongoing plan'],
      },
    ],
    whoThisIsFor: [
      'You’ve noticed a pattern repeating across relationships',
      'You want a structured path, not just isolated tips',
      'You’re ready to practice new responses, with support along the way',
    ],
    whatYouGet: [
      '24 guided lessons across video, audio and worksheets',
      'A full pattern-mapping and practice workbook',
      'Direct access to your counselor throughout the program',
      'Lifetime access to updates',
    ],
    faqs: [
      {
        question: 'Is this a substitute for therapy?',
        answer:
          'No. This is an educational, self-paced program for reflection and skill-building. If you’re in emotional distress, please consider 1:1 support or professional care.',
      },
      {
        question: 'How much time does it take?',
        answer:
          'Most people spend 30–45 minutes, two to three times a week, across six weeks — but you can go at your own pace.',
      },
      {
        question: 'Does this include counselor support?',
        answer:
          'Yes — you’ll have direct access to your counselor to work through real situations as they come up during the program.',
      },
    ],
  },
]

export const getCourseById = (id: string): Course | undefined =>
  courses.find((course) => course.id === id)

export const courseCategories = [
  'All Programs',
  ...Array.from(new Set(courses.map((course) => course.category))),
] as const
