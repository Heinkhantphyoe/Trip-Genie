import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language?.split('-')[0] || 'en'

  function toggleLanguage() {
    const next = currentLang === 'en' ? 'my' : 'en'
    i18n.changeLanguage(next)
  }

  return (
    <button
      onClick={toggleLanguage}
      aria-label={currentLang === 'en' ? 'Switch to Burmese' : 'Switch to English'}
      title={currentLang === 'en' ? 'Switch to Burmese' : 'Switch to English'}
      className="relative w-9 h-9 flex items-center justify-center rounded-full
                 text-text-muted hover:text-primary hover:bg-primary-light
                 transition-all duration-300 ease-out cursor-pointer
                 hover:scale-110 active:scale-95"
    >
      <Globe className="w-[18px] h-[18px]" strokeWidth={2} />
      <span className="absolute -bottom-0.5 -right-0.5 text-[9px] font-bold bg-surface-raised border border-border rounded px-0.5 leading-tight text-text-heading">
        {currentLang === 'en' ? 'EN' : 'MY'}
      </span>
    </button>
  )
}
