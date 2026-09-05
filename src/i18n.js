import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import my from './locales/my.json'

const STORAGE_KEY = 'tripgenie-lang'

function getStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'my') return stored
  } catch { /* ignore */ }
  return 'en'
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      my: { translation: my },
    },
    lng: getStoredLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
  })

// Persist language changes to localStorage
i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng)
    document.documentElement.lang = lng === 'my' ? 'my' : 'en'
  } catch { /* ignore */ }
})

// Set initial lang attribute
document.documentElement.lang = i18n.language === 'my' ? 'my' : 'en'

export default i18n
