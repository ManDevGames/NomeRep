import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/theme'
import { useLanguage } from '@/context/language'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('Switch to light mode', 'लाइट मोड चालू करें') : t('Switch to dark mode', 'डार्क मोड चालू करें')}
      title={isDark ? t('Light mode', 'लाइट मोड') : t('Dark mode', 'डार्क मोड')}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal-300/40 text-charcoal-700 transition-colors hover:border-rose-300 hover:text-rose-400"
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  )
}
