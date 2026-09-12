import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { MainLayout } from '@/layouts/MainLayout'
import { Home } from '@/pages/Home'
import { Assessment } from '@/pages/Assessment'
import { AssessmentResult } from '@/pages/AssessmentResult'
import { AssessmentReport } from '@/pages/AssessmentReport'
import { Patterns } from '@/pages/Patterns'
import { Programs } from '@/pages/Programs'
import { ProgramDetail } from '@/pages/ProgramDetail'
import { Reprogramming } from '@/pages/Reprogramming'
import { Resources } from '@/pages/Resources'
import { About } from '@/pages/About'
import { Privacy } from '@/pages/Privacy'
import { Terms } from '@/pages/Terms'
import { NotFound } from '@/pages/NotFound'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment/result" element={<AssessmentResult />} />
          <Route path="/assessment/report" element={<AssessmentReport />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:courseId" element={<ProgramDetail />} />
          <Route path="/reprogramming" element={<Reprogramming />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
