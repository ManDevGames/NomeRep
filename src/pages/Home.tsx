import { Hero } from '@/components/home/Hero'
import { ProblemSection } from '@/components/home/ProblemSection'
import { AssessmentPromo } from '@/components/home/AssessmentPromo'
import { ReflectionSection } from '@/components/home/ReflectionSection'
import { LeadGuidesSection } from '@/components/home/LeadGuidesSection'
import { ERPSection } from '@/components/home/ERPSection'
import { ProgramsPreviewSection } from '@/components/home/ProgramsPreviewSection'
import { ReprogrammingSection } from '@/components/home/ReprogrammingSection'
import { CounselorsSection } from '@/components/home/CounselorsSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { FAQSection } from '@/components/home/FAQSection'

export function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <AssessmentPromo />
      <ReflectionSection />
      <LeadGuidesSection />
      <ERPSection />
      <ProgramsPreviewSection />
      <ReprogrammingSection />
      <CounselorsSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  )
}
