import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getStoredResult } from '@/hooks/useAssessment'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Assessment', to: '/assessment' },
  { label: 'Relationship Patterns', to: '/patterns' },
  { label: 'Programs', to: '/programs' },
  { label: '1:1 Reprogramming', to: '/reprogramming' },
  { label: 'Resources', to: '/resources' },
  { label: 'About', to: '/about' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const hasResult = !!getStoredResult()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal-100 bg-cream-50/90 backdrop-blur-md">
      <nav className="container-app flex h-16 sm:h-20 items-center justify-between" aria-label="Primary">
        <Link to="/" className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-charcoal-900">
          Relationship Guide
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-rose-500' : 'text-charcoal-600 hover:text-charcoal-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          {hasResult && (
            <Link to="/assessment/result" className="text-sm font-medium text-charcoal-600 hover:text-rose-500">
              My Pattern
            </Link>
          )}
          <Button to="/assessment" size="sm">
            Take Free Assessment
          </Button>
        </div>

        <button
          className="lg:hidden rounded-full p-2 text-charcoal-700 hover:bg-charcoal-100"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-charcoal-100 bg-cream-50">
          <ul className="container-app flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive ? 'bg-blush-50 text-rose-500' : 'text-charcoal-700 hover:bg-charcoal-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            {hasResult && (
              <li>
                <Link
                  to="/assessment/result"
                  className="block rounded-xl px-4 py-3 text-base font-medium text-charcoal-700 hover:bg-charcoal-50"
                >
                  My Pattern
                </Link>
              </li>
            )}
            <li className="pt-2">
              <Button to="/assessment" className="w-full">
                Take Free Assessment
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
