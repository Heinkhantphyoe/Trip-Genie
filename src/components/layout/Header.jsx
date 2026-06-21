import { Link, useLocation } from 'react-router-dom'
import Container from './Container'

export default function Header() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl">✈️</span>
            <span className="text-xl font-bold text-text-heading">TripGenie</span>
          </Link>

          {!isLanding && (
            <Link
              to="/"
              className="text-sm font-medium text-text-muted hover:text-primary transition-colors no-underline"
            >
              Start Over
            </Link>
          )}
        </div>
      </Container>
    </header>
  )
}
