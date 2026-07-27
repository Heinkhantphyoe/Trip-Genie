import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Users2, Wallet, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react'
import { useTrip } from '../context/TripContext'
import Container from '../components/layout/Container'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import DestinationSearch from '../components/trip/DestinationSearch'
import DatePicker from '../components/trip/DatePicker'
import TravelerSelector from '../components/trip/TravelerSelector'
import BudgetSlider from '../components/trip/BudgetSlider'
import InterestPicker from '../components/trip/InterestPicker'

const STEP_ICONS = [MapPin, Calendar, Users2, Wallet, Sparkles]

const STEPS = [
  { id: 1, title: 'Destination' },
  { id: 2, title: 'Dates' },
  { id: 3, title: 'Travelers' },
  { id: 4, title: 'Budget' },
  { id: 5, title: 'Interests' },
]

export default function TripForm() {
  const navigate = useNavigate()
  const { state, dispatch } = useTrip()
  const [step, setStep] = useState(1)
  const StepIcon = STEP_ICONS[step - 1]

  function canProceed() {
    switch (step) {
      case 1: return state.departureCity !== null && state.destination !== null
      case 2: return state.startDate !== '' && state.endDate !== ''
      case 3: return state.adults >= 1
      case 4: return state.budgetLevel !== ''
      case 5: return true
      default: return false
    }
  }

  function handleNext() {
    if (step < 5) {
      setStep(step + 1)
    } else {
      navigate('/results')
    }
  }

  function handleBack() {
    if (step > 1) setStep(step - 1)
  }

  return (
    <Container className="py-8 sm:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent text-white mb-4">
            <StepIcon className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold text-text-heading mb-2">Plan Your Trip</h1>
          <p className="text-text-muted">Step {step} of 5 — {STEPS[step - 1].title}</p>
        </div>

        {/* Progress */}
        <ProgressBar value={step} max={5} size="sm" className="mb-8" />

        {/* Step indicators */}
        <div className="flex justify-between mb-8">
          {STEPS.map(s => {
            const Icon = STEP_ICONS[s.id - 1]
            return (
              <div
                key={s.id}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
                  s.id === step ? 'scale-110' : s.id < step ? 'opacity-70' : 'opacity-40'
                }`}
              >
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${s.id === step
                    ? 'bg-gradient-to-br from-primary to-accent text-white shadow-md'
                    : s.id < step
                      ? 'bg-success text-white'
                      : 'bg-surface-alt text-text-muted border border-border'
                  }
                `}>
                  {s.id < step ? (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <Icon className="w-4 h-4" strokeWidth={2} />
                  )}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${
                  s.id === step ? 'text-primary font-semibold' : 'text-text-muted'
                }`}>
                  {s.title}
                </span>
              </div>
            )
          })}
        </div>

        {/* Step content */}
        <div className="bg-surface-raised rounded-xl border border-border shadow-sm p-6 sm:p-8 mb-8 animate-slide-up" key={step}>
          {step === 1 && (
            <div className="space-y-6">
              <DestinationSearch
                label="Where are you traveling from?"
                placeholder="Search your departure city..."
                value={state.departureCity}
                onChange={d => dispatch({ type: 'SET_DEPARTURE', payload: d })}
              />
              <DestinationSearch
                label="Where do you want to go?"
                placeholder="Search for a destination..."
                value={state.destination}
                onChange={d => dispatch({ type: 'SET_DESTINATION', payload: d })}
              />
            </div>
          )}

          {step === 2 && (
            <DatePicker
              startDate={state.startDate}
              endDate={state.endDate}
              onStartChange={d => dispatch({ type: 'SET_DATES', payload: { startDate: d, endDate: state.endDate } })}
              onEndChange={d => dispatch({ type: 'SET_DATES', payload: { startDate: state.startDate, endDate: d } })}
            />
          )}

          {step === 3 && (
            <TravelerSelector
              adults={state.adults}
              children={state.children}
              onAdultsChange={n => dispatch({ type: 'SET_ADULTS', payload: n })}
              onChildrenChange={n => dispatch({ type: 'SET_CHILDREN', payload: n })}
            />
          )}

          {step === 4 && (
            <BudgetSlider
              value={state.budgetLevel}
              onChange={l => dispatch({ type: 'SET_BUDGET_LEVEL', payload: l })}
            />
          )}

          {step === 5 && (
            <InterestPicker
              interests={state.interests}
              style={state.travelStyle}
              onInterestsChange={i => dispatch({ type: 'SET_INTERESTS', payload: i })}
              onStyleChange={s => dispatch({ type: 'SET_TRAVEL_STYLE', payload: s })}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="secondary"
            onClick={handleBack}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 max-w-xs"
          >
            {step === 5 ? (
              <>
                Generate Trip Plan
                <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Container>
  )
}
