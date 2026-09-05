import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTrip } from '../context/TripContext'
import { useTripPlanner } from '../hooks/useTripPlanner'
import { LayoutDashboard, Plane, Building2, Map, Wallet, Lightbulb, ArrowLeft, RotateCcw, Frown } from 'lucide-react'
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

export default function Results() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { state } = useTrip()
  const { loading, error, progress, loadingMessage, results, planTrip } = useTripPlanner()
  const [activeTab, setActiveTab] = useState('overview')

  const TABS = [
    { id: 'overview', label: t('results.tabs.overview'), icon: LayoutDashboard },
    { id: 'flights', label: t('results.tabs.flights'), icon: Plane },
    { id: 'hotels', label: t('results.tabs.hotels'), icon: Building2 },
    { id: 'itinerary', label: t('results.tabs.itinerary'), icon: Map },
    { id: 'budget', label: t('results.tabs.budget'), icon: Wallet },
    { id: 'tips', label: t('results.tabs.tips'), icon: Lightbulb },
  ]

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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <Map className="w-8 h-8 animate-float" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-bold text-text-heading mb-2">{t('results.loading')}</h2>
          <p className="text-text-muted mb-8">{loadingMessage}</p>
          <ProgressBar value={progress} max={100} showLabel size="md" />
          <p className="text-sm text-text-muted mt-4">{t('results.progress', { progress })}</p>
        </div>
      </Container>
    )
  }

  // Error state
  if (error) {
    return (
      <Container className="py-20">
        <div className="max-w-lg mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-danger/10 text-danger mb-6">
            <Frown className="w-8 h-8" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-bold text-text-heading mb-2">{t('results.error.title')}</h2>
          <p className="text-text-muted mb-8">
            {t('results.error.message')}
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="secondary" onClick={() => navigate('/plan')}>
              <ArrowLeft className="w-4 h-4" />
              {t('results.error.modifyTrip')}
            </Button>
            <Button onClick={() => planTrip(state)}>
              <RotateCcw className="w-4 h-4" />
              {t('results.error.tryAgain')}
            </Button>
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
        <Button variant="secondary" onClick={() => navigate('/plan')}>
          <ArrowLeft className="w-4 h-4" />
          {t('results.modifyTrip')}
        </Button>
        <Button variant="ghost" onClick={() => navigate('/')}>{t('results.startOver')}</Button>
      </div>
    </Container>
  )
}
