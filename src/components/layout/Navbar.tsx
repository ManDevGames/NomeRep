import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { PrimaryCTA } from '@/components/brand/CTA'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useLanguage } from '@/context/language'

const navLinks = [
  { label: { en: 'Home', hi: 'होम' }, to: '/' },
  { label: { en: '1:1 Coaching', hi: '1:1 Coaching' }, to: '/coaching' },
  { label: { en: 'Free Quiz', hi: 'फ़्री Quiz' }, to: '/quiz' },
  { label: { en: 'About Shalinee', hi: 'Shalinee के बारे में' }, to: '/about' },
  { label: { en: 'Stories', hi: 'कहानियाँ' }, to: '/stories' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { t } = useLanguage()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal-100 bg-cream-50/90 backdrop-blur-md">
      <nav className="container-app flex h-16 items-center justify-between gap-2 sm:h-20 sm:gap-4" aria-label="Primary">
        <Logo />

        <ul className="hidden items-center xl:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-rose-500' : 'text-charcoal-600 hover:text-charcoal-900'
                  }`
                }
              >
                {t(link.label)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 xl:flex">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <PrimaryCTA short />
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal-700 hover:bg-charcoal-100 xl:hidden"
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
        <div id="mobile-menu" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-charcoal-100 bg-cream-50 xl:hidden">
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
            <li className="flex items-center justify-between rounded-xl px-4 py-2">
              <span className="text-base font-medium text-charcoal-700">{t('Language', 'भाषा')}</span>
              <LanguageToggle />
            </li>
            <li className="flex items-center justify-between rounded-xl px-4 py-2">
              <span className="text-base font-medium text-charcoal-700">{t('Theme', 'थीम')}</span>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
