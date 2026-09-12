import { useParams } from 'react-router-dom'
import { NotFound } from '@/pages/NotFound'
import { CourseDetails } from '@/components/courses/CourseDetails'
import { getCourseById } from '@/data/courses'

export function ProgramDetail() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courseId ? getCourseById(courseId) : undefined

  if (!course) return <NotFound />

  return <CourseDetails course={course} />
}
