import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Container from '../components/layout/Container'

const FEATURES = [
  { icon: '✈️', title: 'Real Flights', desc: 'Compare actual flight options and prices' },
  { icon: '🏨', title: 'Hotels', desc: 'Find the perfect stay for your budget' },
  { icon: '📍', title: 'Smart Itinerary', desc: 'Day-by-day plans optimized by location' },
  { icon: '💰', title: 'Budget Tracking', desc: 'Detailed cost breakdown with savings tips' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <Container className="relative z-10 text-center py-20">
          <div className="animate-slide-up">
            <span className="inline-block text-6xl mb-6 animate-bounce">✈️</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-heading mb-6 tracking-tight">
              Plan your perfect trip
              <br />
              <span className="text-primary">in minutes</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-10">
              Tell us where you want to go, your budget, and travel style.
              TripGenie finds real flights, hotels, and builds a day-by-day itinerary for you.
            </p>
            <Button size="lg" onClick={() => navigate('/plan')}>
              Plan My Trip →
            </Button>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="bg-surface-alt border-t border-border">
        <Container className="py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-heading text-center mb-12">
            Everything you need to travel smarter
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="bg-surface-raised rounded-xl p-6 border border-border
                  transition-all duration-200 hover:shadow-md hover:scale-[1.02]
                  animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-3xl block mb-4">{f.icon}</span>
                <h3 className="text-lg font-semibold text-text-heading mb-2">{f.title}</h3>
                <p className="text-sm text-text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <Container className="py-16 text-center">
          <h2 className="text-2xl font-bold text-text-heading mb-4">Ready to go?</h2>
          <p className="text-text-muted mb-8">No sign-up. No fees. Just tell us your dream destination.</p>
          <Button size="lg" onClick={() => navigate('/plan')}>
            Start Planning →
          </Button>
        </Container>
      </section>
    </div>
  )
}
