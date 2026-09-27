import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { getStoredResult } from '@/hooks/useAssessment'
import { useLanguage } from '@/context/language'

const navLinks = [
  { label: { en: 'Home', hi: 'होम' }, to: '/' },
  { label: { en: 'Assessment', hi: 'असेसमेंट' }, to: '/assessment' },
  { label: { en: 'Relationship Patterns', hi: 'रिश्तों के पैटर्न' }, to: '/patterns' },
  { label: { en: 'Programs', hi: 'प्रोग्राम' }, to: '/programs' },
  { label: { en: '1:1 Reprogramming', hi: '1:1 रीप्रोग्रामिंग' }, to: '/reprogramming' },
  { label: { en: 'Resources', hi: 'संसाधन' }, to: '/resources' },
  { label: { en: 'About', hi: 'हमारे बारे में' }, to: '/about' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const hasResult = !!getStoredResult()
  const { t } = useLanguage()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal-100 bg-cream-50/90 backdrop-blur-md">
      <nav className="container-app flex h-16 sm:h-20 items-center justify-between gap-4" aria-label="Primary">
        <Link to="/" className="min-w-0 truncate font-serif text-lg sm:text-2xl font-semibold tracking-tight text-charcoal-900">
          Relationship Guide
        </Link>

        <ul className="hidden xl:flex items-center">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-rose-500' : 'text-charcoal-600 hover:text-charcoal-900'
                  }`
                }
              >
                {t(link.label)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden xl:flex shrink-0 items-center gap-2">
          {hasResult && (
            <Link to="/assessment/result" className="whitespace-nowrap px-1 text-sm font-medium text-charcoal-600 hover:text-rose-500">
              {t('My Pattern', 'मेरा पैटर्न')}
            </Link>
          )}
          <LanguageToggle />
          <ThemeToggle />
          <Button to="/assessment" size="sm" className="whitespace-nowrap">
            {t('Take Free Assessment', 'मुफ़्त असेसमेंट लें')}
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 xl:hidden">
          <LanguageToggle />
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <button
            className="rounded-full p-2 text-charcoal-700 hover:bg-charcoal-100"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? t('Close menu', 'मेन्यू बंद करें') : t('Open menu', 'मेन्यू खोलें')}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div id="mobile-menu" className="xl:hidden border-t border-charcoal-100 bg-cream-50">
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
                  {t(link.label)}
                </NavLink>
              </li>
            ))}
            {hasResult && (
              <li>
                <Link
                  to="/assessment/result"
                  className="block rounded-xl px-4 py-3 text-base font-medium text-charcoal-700 hover:bg-charcoal-50"
                >
                  {t('My Pattern', 'मेरा पैटर्न')}
                </Link>
              </li>
            )}
            <li className="flex items-center justify-between rounded-xl px-4 py-2 sm:hidden">
              <span className="text-base font-medium text-charcoal-700">{t('Theme', 'थीम')}</span>
              <ThemeToggle />
            </li>
            <li className="pt-2">
              <Button to="/assessment" className="w-full">
                {t('Take Free Assessment', 'मुफ़्त असेसमेंट लें')}
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
