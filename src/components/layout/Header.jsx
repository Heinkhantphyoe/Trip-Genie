import { Link, useLocation } from 'react-router-dom'
import { MapPin, Compass } from 'lucide-react'
import Container from './Container'

export default function Header() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 no-underline group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary absolute animate-float" strokeWidth={2.5} />
              <Compass className="w-6 h-6 text-accent absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={1.5} />
            </div>
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
