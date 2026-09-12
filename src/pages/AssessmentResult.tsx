import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PersonalizedPattern } from '@/components/patterns/PersonalizedPattern'
import { ReflectionSection } from '@/components/home/ReflectionSection'
import { Button } from '@/components/ui/Button'
import { useAssessment } from '@/hooks/useAssessment'

export function AssessmentResult() {
  const { result } = useAssessment()
  const navigate = useNavigate()

  useEffect(() => {
    if (!result) {
      navigate('/assessment', { replace: true })
    }
  }, [result, navigate])

  if (!result) return null

  return (
    <>
      <section className="section-space bg-cream-50">
        <div className="container-app max-w-4xl">
          <PersonalizedPattern pattern={result} />

          <div className="mt-14 flex justify-center">
            <Button to="/assessment/report" size="lg">
              See My Full Report <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      <ReflectionSection />
    </>
  )
}
