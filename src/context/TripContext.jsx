import { createContext, useContext, useReducer } from 'react'

const TripContext = createContext(null)

const initialState = {
  // Step 1: Departure & Destination
  departureCity: null,     // { city, country, lat, lon, countryCode }
  destination: null,       // { city, country, lat, lon, countryCode }
  // Step 2: Dates
  startDate: '',
  endDate: '',
  // Step 3: Travelers
  adults: 1,
  children: 0,
  // Step 4: Budget
  budgetLevel: 'mid-range',
  // Step 5: Interests
  interests: [],
  travelStyle: 'balanced',
}

function tripReducer(state, action) {
  switch (action.type) {
    case 'SET_DEPARTURE':
      return { ...state, departureCity: action.payload }
    case 'SET_DESTINATION':
      return { ...state, destination: action.payload }
    case 'SET_DATES':
      return { ...state, startDate: action.payload.startDate, endDate: action.payload.endDate }
    case 'SET_ADULTS':
      return { ...state, adults: action.payload }
    case 'SET_CHILDREN':
      return { ...state, children: action.payload }
    case 'SET_BUDGET_LEVEL':
      return { ...state, budgetLevel: action.payload }
    case 'SET_INTERESTS':
      return { ...state, interests: action.payload }
    case 'SET_TRAVEL_STYLE':
      return { ...state, travelStyle: action.payload }
    case 'TOGGLE_INTEREST':
      return {
        ...state,
        interests: state.interests.includes(action.payload)
          ? state.interests.filter(i => i !== action.payload)
          : [...state.interests, action.payload],
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export function TripProvider({ children }) {
  const [state, dispatch] = useReducer(tripReducer, initialState)

  return (
    <TripContext.Provider value={{ state, dispatch }}>
      {children}
    </TripContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTrip() {
  const ctx = useContext(TripContext)
  if (!ctx) throw new Error('useTrip must be used within TripProvider')
  return ctx
}
