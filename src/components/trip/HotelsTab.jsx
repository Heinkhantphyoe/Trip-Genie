import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { formatCurrency } from '../../utils/format'

export default function HotelsTab({ hotels }) {
  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-5xl block mb-4">🏨</span>
        <h3 className="text-lg font-semibold text-text-heading mb-2">No hotels found</h3>
        <p className="text-text-muted">Try adjusting your dates or destination.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-heading mb-2">{hotels.length} hotels found</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {hotels.map((hotel, i) => (
          <Card key={i} padding="md" hover>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-text-heading">{hotel.name}</h4>
                <p className="text-sm text-text-muted">{hotel.location} · {hotel.distanceToCenter}</p>
              </div>
              <Badge variant="primary">{hotel.type}</Badge>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1">
                {'⭐'.repeat(Math.min(hotel.starRating || 0, 5))}
                <span className="text-xs text-text-muted ml-1">{hotel.starRating}★</span>
              </div>
              {hotel.guestRating && (
                <Badge variant="success">{hotel.guestRating}/10</Badge>
              )}
            </div>

            {/* Description */}
            {hotel.description && (
              <p className="text-sm text-text-muted mb-3">{hotel.description}</p>
            )}

            {/* Amenities */}
            {hotel.amenities && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {hotel.amenities.map(a => (
                  <Badge key={a} variant="default" size="sm">{a}</Badge>
                ))}
              </div>
            )}

            {/* Price */}
            <div className="flex items-end justify-between pt-3 border-t border-border">
              <div>
                <p className="text-xs text-text-muted">per night</p>
                <p className="text-xl font-bold text-primary">{formatCurrency(hotel.pricePerNight)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-muted">total ({hotel.totalPrice ? Math.round(hotel.totalPrice / hotel.pricePerNight) : '?'} nights)</p>
                <p className="font-semibold text-text-heading">{formatCurrency(hotel.totalPrice)}</p>
              </div>
            </div>

            {/* Cancellation */}
            {hotel.cancellationPolicy && (
              <p className="text-xs text-success mt-2">✓ {hotel.cancellationPolicy}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
