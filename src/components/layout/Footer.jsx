import Container from './Container'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt mt-auto">
      <Container>
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">✈️</span>
            <span className="text-sm font-semibold text-text-heading">TripGenie</span>
          </div>
          <p className="text-sm text-text-muted">
            AI-powered travel planning. No sign-up required.
          </p>
        </div>
      </Container>
    </footer>
  )
}
