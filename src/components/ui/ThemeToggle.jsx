import { Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? t('theme.lightMode') : t('theme.darkMode')}
      title={theme === 'dark' ? t('theme.lightMode') : t('theme.darkMode')}
      className="relative w-9 h-9 flex items-center justify-center rounded-full
                 text-text-muted hover:text-primary hover:bg-primary-light
                 transition-all duration-300 ease-out cursor-pointer
                 hover:scale-110 active:scale-95"
    >
      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          transform: theme === 'dark' ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)',
          opacity: theme === 'dark' ? 1 : 0,
        }}
      >
        <Sun className="w-[18px] h-[18px]" strokeWidth={2} />
      </span>
      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          transform: theme === 'light' ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0)',
          opacity: theme === 'light' ? 1 : 0,
        }}
      >
        <Moon className="w-[18px] h-[18px]" strokeWidth={2} />
      </span>
    </button>
  )
}
