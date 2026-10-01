import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { lazy, useEffect } from 'react'
import { MainLayout } from '@/layouts/MainLayout'
import { Home } from '@/pages/Home'

// Home ships in the main bundle; every other page loads on first visit.
const Coaching = lazy(() => import('@/pages/Coaching').then((m) => ({ default: m.Coaching })))
const Quiz = lazy(() => import('@/pages/Quiz').then((m) => ({ default: m.Quiz })))
const ClarityCall = lazy(() => import('@/pages/ClarityCall').then((m) => ({ default: m.ClarityCall })))
const Workshop = lazy(() => import('@/pages/Workshop').then((m) => ({ default: m.Workshop })))
const Stories = lazy(() => import('@/pages/Stories').then((m) => ({ default: m.Stories })))
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })))
const Privacy = lazy(() => import('@/pages/Privacy').then((m) => ({ default: m.Privacy })))
const Terms = lazy(() => import('@/pages/Terms').then((m) => ({ default: m.Terms })))
const Disclaimer = lazy(() => import('@/pages/Disclaimer').then((m) => ({ default: m.Disclaimer })))
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))

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
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/coaching" element={<Coaching />} />
          <Route path="/clarity-call" element={<ClarityCall />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

          {/* Retired pages. Mirrors the permanent redirects in vercel.json. */}
          <Route path="/assessment/*" element={<Navigate to="/quiz" replace />} />
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
