import { useState } from 'react'
import { planFullTrip } from '../services/gemini'
import { getDestinationPhoto } from '../services/unsplash'
import { getWeatherForecast } from '../services/openMeteo'

export function useTripPlanner() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [results, setResults] = useState(null)

  async function planTrip(tripData) {
    const { departureCity, destination, startDate, endDate, adults, children, budgetLevel, interests, travelStyle } = tripData

    setLoading(true)
    setError(null)
    setProgress(0)
    setResults(null)

    try {
      // Step 1: Call Gemini once for everything (60% of progress)
      setLoadingMessage('✨ Planning your perfect trip with AI...')
      setProgress(10)

      const geminiData = await planFullTrip({
        departureCity: departureCity?.city || 'Unknown',
        departureCountry: departureCity?.country || 'Unknown',
        destination: destination.city,
        country: destination.country,
        startDate,
        endDate,
        adults,
        children,
        budgetLevel,
        interests,
        travelStyle,
      })

      setProgress(60)
      setLoadingMessage('🌤️ Fetching weather & photos...')

      // Step 2: Fetch weather + photo in parallel (40% of progress)
      const nightsCount = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))

      const [weather, photo] = await Promise.allSettled([
        getWeatherForecast(destination.lat, destination.lon, startDate, endDate),
        getDestinationPhoto(destination.city),
      ])

      setProgress(100)
      setLoadingMessage('✅ Done!')

      // Calculate budget from Gemini data
      const budget = calculateBudget(geminiData, nightsCount, adults)

      setResults({
        destination,
        dates: { start: startDate, end: endDate },
        travelers: { adults, children },
        budgetLevel,
        interests,
        travelStyle,
        flights: geminiData.flights || [],
        hotels: geminiData.hotels || [],
        attractions: geminiData.attractions || [],
        restaurants: geminiData.restaurants || [],
        itinerary: geminiData.itinerary || [],
        tips: {
          tips: {
            beforeYouGo: geminiData.tips?.beforeYouGo || [],
            arrival: geminiData.tips?.arrival || [],
            gettingAround: geminiData.tips?.gettingAround || [],
            culture: geminiData.tips?.culture || [],
            food: geminiData.tips?.food || [],
            safety: geminiData.tips?.safety || [],
            money: geminiData.tips?.money || [],
            connectivity: geminiData.tips?.connectivity || [],
          },
          emergencyNumbers: geminiData.emergencyNumbers || {},
          usefulPhrases: geminiData.usefulPhrases || [],
          packingList: geminiData.packingList || [],
        },
        weather: weather.status === 'fulfilled' ? weather.value : [],
        photo: photo.status === 'fulfilled' ? photo.value : null,
        budget,
        reservationsNeeded: geminiData.reservationsNeeded || [],
      })
    } catch (err) {
      console.error('Trip planning failed:', err)
      setError(err.message || 'UNKNOWN_ERROR')
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, progress, loadingMessage, results, planTrip }
}

function calculateBudget(data, numNights, adults) {
  const flights = data.flights || []
  const hotels = data.hotels || []
  const itinerary = data.itinerary || []

  const flightCost = flights.length > 0
    ? Math.round(flights.reduce((sum, f) => sum + (f.price || 0), 0) / flights.length) * adults
    : 0

  const hotelCost = hotels.length > 0
    ? Math.round(hotels.reduce((sum, h) => sum + (h.pricePerNight || 0), 0) / hotels.length) * numNights
    : 0

  const dailyActivityCost = itinerary.length > 0
    ? Math.round(itinerary.reduce((sum, day) => sum + (day.dailyBudget || 0), 0) / itinerary.length)
    : 0

  const activityCost = dailyActivityCost * (numNights + 1)

  return {
    flights: flightCost,
    accommodation: hotelCost,
    activities: activityCost,
    food: Math.round(dailyActivityCost * 0.4) * (numNights + 1),
    miscellaneous: Math.round((flightCost + hotelCost + activityCost) * 0.1),
    total: data.totalEstimatedCost || (flightCost + hotelCost + activityCost + Math.round((flightCost + hotelCost + activityCost) * 0.1)),
    perDay: Math.round((data.totalEstimatedCost || (flightCost + hotelCost + activityCost)) / (numNights + 1)),
  }
}
