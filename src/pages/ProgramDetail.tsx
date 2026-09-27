import { useParams } from 'react-router-dom'
import { NotFound } from '@/pages/NotFound'
import { CourseDetails } from '@/components/courses/CourseDetails'
import { useContent } from '@/hooks/useContent'

export function ProgramDetail() {
  const { courseId } = useParams<{ courseId: string }>()
  const { getCourse } = useContent()
  const course = courseId ? getCourse(courseId) : undefined

  if (!course) return <NotFound />

  return <CourseDetails course={course} />
}
