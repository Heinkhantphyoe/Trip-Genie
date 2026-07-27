import { useNavigate } from 'react-router-dom'
import { Plane, Building2, MapPin, Wallet, ArrowRight, Sparkles } from 'lucide-react'
import Button from '../components/ui/Button'
import Container from '../components/layout/Container'

const FEATURES = [
  { icon: Plane, title: 'Real Flights', desc: 'Compare actual flight options and prices' },
  { icon: Building2, title: 'Hotels', desc: 'Find the perfect stay for your budget' },
  { icon: MapPin, title: 'Smart Itinerary', desc: 'Day-by-day plans optimized by location' },
  { icon: Wallet, title: 'Budget Tracking', desc: 'Detailed cost breakdown with savings tips' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Aurora background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5" />
        <div
          className="absolute top-[-120px] left-[-100px] w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl animate-aurora"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute bottom-[-80px] right-[-120px] w-[450px] h-[450px] bg-accent/20 rounded-full blur-3xl animate-aurora"
          style={{ animationDelay: '-3s' }}
        />
        <div
          className="absolute top-[40%] right-[15%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl animate-aurora"
          style={{ animationDelay: '-6s' }}
        />

        <Container className="relative z-10 text-center py-20">
          <div className="animate-slide-up">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-primary/10 text-primary animate-float">
              <MapPin className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-heading mb-6 tracking-tight">
              Plan your perfect trip
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                in minutes
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-10">
              Tell us where you want to go, your budget, and travel style.
              TripGenie finds real flights, hotels, and builds a day-by-day itinerary for you.
            </p>
            <Button size="lg" onClick={() => navigate('/plan')}>
              Plan My Trip
              <ArrowRight className="w-5 h-5" />
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
                  transition-all duration-200 hover:shadow-md hover:scale-[1.02] group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
                  <f.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
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
          <div className="max-w-lg mx-auto">
            <Sparkles className="w-10 h-10 text-accent mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="text-2xl font-bold text-text-heading mb-4">Ready to go?</h2>
            <p className="text-text-muted mb-8">No sign-up. No fees. Just tell us your dream destination.</p>
            <Button size="lg" onClick={() => navigate('/plan')}>
              Start Planning
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
