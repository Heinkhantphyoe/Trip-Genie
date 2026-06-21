import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { formatCurrency } from '../../utils/format'

export default function OverviewTab({ results }) {
  const { destination, dates, travelers, budget, flights, hotels, itinerary, weather, interests } = results

  const nightsCount = Math.ceil((new Date(dates.end) - new Date(dates.start)) / (1000 * 60 * 60 * 24))

  const stats = [
    { icon: '✈️', label: 'Flights Found', value: flights.length },
    { icon: '🏨', label: 'Hotels Found', value: hotels.length },
    { icon: '📍', label: 'Attractions', value: itinerary.reduce((sum, d) => sum + d.activities.length, 0) },
    { icon: '🌙', label: 'Nights', value: nightsCount },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(stat => (
          <Card key={stat.label} padding="md" className="text-center">
            <span className="text-2xl block mb-1">{stat.icon}</span>
            <p className="text-2xl font-bold text-text-heading">{stat.value}</p>
            <p className="text-xs text-text-muted">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Trip Summary */}
      <Card padding="lg">
        <h3 className="text-lg font-semibold text-text-heading mb-4">Trip Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-muted">📍 Destination</span>
              <span className="font-medium text-text-heading">{destination.city}, {destination.country}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">📅 Dates</span>
              <span className="font-medium text-text-heading">{dates.start} → {dates.end}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">👥 Travelers</span>
              <span className="font-medium text-text-heading">{travelers.adults} adults{travelers.children > 0 ? `, ${travelers.children} children` : ''}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-muted">💰 Budget</span>
              <span className="font-medium text-text-heading capitalize">{results.budgetLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">✨ Style</span>
              <span className="font-medium text-text-heading capitalize">{results.travelStyle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">💵 Estimated Total</span>
              <span className="font-bold text-primary text-lg">{formatCurrency(budget.total)}</span>
            </div>
          </div>
        </div>

        {/* Interests */}
        {interests.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-text-muted mb-2">Interests:</p>
            <div className="flex flex-wrap gap-2">
              {interests.map(i => <Badge key={i} variant="primary">{i}</Badge>)}
            </div>
          </div>
        )}
      </Card>

      {/* Weather */}
      {weather && weather.length > 0 && (
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-text-heading mb-4">🌤️ Weather Forecast</h3>
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
            {weather.map(day => (
              <div key={day.date} className="text-center p-2 rounded-lg bg-surface-alt">
                <p className="text-xs text-text-muted">{new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}</p>
                <p className="text-lg my-1">{getWeatherEmoji(day.weatherCode)}</p>
                <p className="text-sm font-semibold text-text-heading">{Math.round(day.tempMax)}°</p>
                <p className="text-xs text-text-muted">{Math.round(day.tempMin)}°</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

function getWeatherEmoji(code) {
  if (code <= 1) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 48) return '🌫️'
  if (code <= 55) return '🌦️'
  if (code <= 65) return '🌧️'
  if (code <= 75) return '🌨️'
  if (code <= 82) return '🌧️'
  if (code >= 95) return '⛈️'
  return '🌤️'
}
