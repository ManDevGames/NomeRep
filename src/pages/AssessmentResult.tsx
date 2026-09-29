import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PersonalizedPattern } from '@/components/patterns/PersonalizedPattern'
import { ReflectionSection } from '@/components/home/ReflectionSection'
import { Button } from '@/components/ui/Button'
import { useAssessment } from '@/hooks/useAssessment'
import { useContent } from '@/hooks/useContent'
import { useLanguage } from '@/context/language'

export function AssessmentResult() {
  const { result } = useAssessment()
  const navigate = useNavigate()
  const { getPattern } = useContent()
  const { t } = useLanguage()

  useEffect(() => {
    if (!result) {
      navigate('/quiz', { replace: true })
    }
  }, [result, navigate])

  const pattern = result && getPattern(result.id)
  if (!pattern) return null

  return (
    <>
      <section className="section-space bg-cream-50">
        <div className="container-app max-w-4xl">
          <PersonalizedPattern pattern={pattern} />

          <div className="mt-14 flex justify-center">
            <Button to="/assessment/report" size="lg">
              {t('See My Full Report', 'मेरी पूरी रिपोर्ट देखें')} <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      <ReflectionSection />
    </>
  )
}
