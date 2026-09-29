import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { MainLayout } from '@/layouts/MainLayout'
import { Home } from '@/pages/Home'
import { Assessment } from '@/pages/Assessment'
import { AssessmentResult } from '@/pages/AssessmentResult'
import { AssessmentReport } from '@/pages/AssessmentReport'
import { About } from '@/pages/About'
import { Privacy } from '@/pages/Privacy'
import { Terms } from '@/pages/Terms'
import { Disclaimer } from '@/pages/Disclaimer'
import { ComingSoon } from '@/pages/ComingSoon'
import { Coaching } from '@/pages/Coaching'
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
          {/* The old assessment serves as the quiz until the new quiz lands (Phase 5). */}
          <Route path="/quiz" element={<Assessment />} />
          <Route path="/assessment/result" element={<AssessmentResult />} />
          <Route path="/assessment/report" element={<AssessmentReport />} />
          <Route path="/coaching" element={<Coaching />} />
          <Route path="/clarity-call" element={<ComingSoon title={{ en: 'Free Clarity Call', hi: 'फ़्री Clarity Call' }} />} />
          <Route path="/workshop" element={<ComingSoon title={{ en: 'Live Workshop', hi: 'Live Workshop' }} />} />
          <Route path="/stories" element={<ComingSoon title={{ en: 'Stories of change', hi: 'बदलाव की कहानियाँ' }} />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

          {/* Retired pages. Mirrors the permanent redirects in vercel.json. */}
          <Route path="/assessment" element={<Navigate to="/quiz" replace />} />
          <Route path="/patterns" element={<Navigate to="/quiz" replace />} />
          <Route path="/reprogramming" element={<Navigate to="/coaching" replace />} />
          <Route path="/programs/*" element={<Navigate to="/workshop" replace />} />
          <Route path="/resources" element={<Navigate to="/" replace />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
