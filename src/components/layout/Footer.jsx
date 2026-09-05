import { MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Container from './Container'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border bg-surface-alt mt-auto">
      <Container>
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" strokeWidth={2.5} />
            <span className="text-sm font-semibold text-text-heading">TripGenie</span>
          </div>
          <p className="text-sm text-text-muted">
            {t('footer.tagline')}
          </p>
        </div>
      </Container>
    </footer>
  )
}
