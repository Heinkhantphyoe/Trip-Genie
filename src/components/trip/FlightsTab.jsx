import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { formatCurrency } from '../../utils/format'

export default function FlightsTab({ flights }) {
  if (!flights || flights.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-5xl block mb-4">✈️</span>
        <h3 className="text-lg font-semibold text-text-heading mb-2">No flights found</h3>
        <p className="text-text-muted">Try adjusting your dates or destination.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-text-heading">{flights.length} flights found</h3>
        <Badge variant="primary">Sorted by price</Badge>
      </div>

      {[...flights].sort((a, b) => a.price - b.price).map((flight, i) => (
        <Card key={i} padding="md" hover>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Airline + flight info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">✈️</span>
                <span className="font-semibold text-text-heading">{flight.airline}</span>
                <Badge variant="default" size="sm">{flight.flightNumber}</Badge>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div>
                  <p className="font-semibold text-text-heading">{flight.departure}</p>
                  <p className="text-text-muted text-xs">Depart</p>
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-text-muted">{flight.duration}</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div>
                  <p className="font-semibold text-text-heading">{flight.arrival}</p>
                  <p className="text-text-muted text-xs">Arrive</p>
                </div>
              </div>
            </div>

            {/* Price + stops */}
            <div className="text-right sm:text-center sm:min-w-[120px]">
              <p className="text-2xl font-bold text-primary">{formatCurrency(flight.price)}</p>
              <p className="text-xs text-text-muted">per person</p>
              <Badge
                variant={flight.stops === 0 ? 'success' : 'warning'}
                size="sm"
              >
                {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
