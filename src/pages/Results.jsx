import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTrip } from '../context/TripContext'
import { useTripPlanner } from '../hooks/useTripPlanner'
import Container from '../components/layout/Container'
import Tabs from '../components/ui/Tabs'
import ProgressBar from '../components/ui/ProgressBar'
import Button from '../components/ui/Button'
import OverviewTab from '../components/trip/OverviewTab'
import FlightsTab from '../components/trip/FlightsTab'
import HotelsTab from '../components/trip/HotelsTab'
import ItineraryTab from '../components/trip/ItineraryTab'
import BudgetTab from '../components/trip/BudgetTab'
import TipsTab from '../components/trip/TipsTab'

const TABS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'flights', label: 'Flights', icon: '✈️' },
  { id: 'hotels', label: 'Hotels', icon: '🏨' },
  { id: 'itinerary', label: 'Itinerary', icon: '🗺️' },
  { id: 'budget', label: 'Budget', icon: '💰' },
  { id: 'tips', label: 'Tips', icon: '💡' },
]

export default function Results() {
  const navigate = useNavigate()
  const { state } = useTrip()
  const { loading, error, progress, loadingMessage, results, planTrip } = useTripPlanner()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!state.departureCity || !state.destination) {
      navigate('/plan')
      return
    }
    planTrip(state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Loading state
  if (loading) {
    return (
      <Container className="py-20">
        <div className="max-w-lg mx-auto text-center animate-fade-in">
          <div className="text-6xl mb-6 animate-bounce">✈️</div>
          <h2 className="text-2xl font-bold text-text-heading mb-2">Planning your trip...</h2>
          <p className="text-text-muted mb-8">{loadingMessage}</p>
          <ProgressBar value={progress} max={100} showLabel size="md" />
          <p className="text-sm text-text-muted mt-4">{progress}% complete</p>
        </div>
      </Container>
    )
  }

  // Error state
  if (error) {
    return (
      <Container className="py-20">
        <div className="max-w-lg mx-auto text-center animate-fade-in">
          <div className="text-6xl mb-6">😞</div>
          <h2 className="text-2xl font-bold text-text-heading mb-2">Something went wrong</h2>
          <p className="text-text-muted mb-8">
            Our service is temporarily unavailable. Please try again in a few minutes.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="secondary" onClick={() => navigate('/plan')}>← Modify Trip</Button>
            <Button onClick={() => planTrip(state)}>Try Again</Button>
          </div>
        </div>
      </Container>
    )
  }

  if (!results) return null

  return (
    <Container className="py-6 sm:py-10">
      {/* Hero image + destination name */}
      {results.photo && (
        <div className="relative rounded-xl overflow-hidden mb-6 h-48 sm:h-64 animate-fade-in">
          <img
            src={results.photo.url}
            alt={results.destination.city}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-6 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold">{results.destination.city}</h1>
            <p className="text-white/80 text-sm">
              {results.destination.country} · {results.dates.start} to {results.dates.end}
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

      {/* Tab content */}
      <div className="animate-fade-in" key={activeTab}>
        {activeTab === 'overview' && <OverviewTab results={results} />}
        {activeTab === 'flights' && <FlightsTab flights={results.flights} />}
        {activeTab === 'hotels' && <HotelsTab hotels={results.hotels} />}
        {activeTab === 'itinerary' && <ItineraryTab itinerary={results.itinerary} />}
        {activeTab === 'budget' && <BudgetTab budget={results.budget} />}
        {activeTab === 'tips' && <TipsTab tips={results.tips} />}
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-border">
        <Button variant="secondary" onClick={() => navigate('/plan')}>← Modify Trip</Button>
        <Button variant="ghost" onClick={() => navigate('/')}>Start Over</Button>
      </div>
    </Container>
  )
}
