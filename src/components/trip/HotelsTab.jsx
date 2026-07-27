import { Building2, Star, Check, Frown } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { formatCurrency } from '../../utils/format'

export default function HotelsTab({ hotels }) {
  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-4">
          <Frown className="w-7 h-7" strokeWidth={1.5} />
        </div>
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
              <div className="flex items-start gap-2">
                <Building2 className="w-5 h-5 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <h4 className="font-semibold text-text-heading">{hotel.name}</h4>
                  <p className="text-sm text-text-muted">{hotel.location} · {hotel.distanceToCenter}</p>
                </div>
              </div>
              <Badge variant="primary">{hotel.type}</Badge>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: Math.min(hotel.starRating || 0, 5) }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" strokeWidth={1.5} />
                ))}
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
              <p className="flex items-center gap-1 text-xs text-success mt-2">
                <Check className="w-3 h-3" strokeWidth={2.5} /> {hotel.cancellationPolicy}
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
