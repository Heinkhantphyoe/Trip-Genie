import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { formatCurrency } from '../../utils/format'

export default function ItineraryTab({ itinerary }) {
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-5xl block mb-4">🗺️</span>
        <h3 className="text-lg font-semibold text-text-heading mb-2">No itinerary generated</h3>
        <p className="text-text-muted">Try modifying your trip preferences.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {itinerary.map(day => (
        <div key={day.day} className="animate-slide-up" style={{ animationDelay: `${day.day * 50}ms` }}>
          {/* Day header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
              {day.day}
            </div>
            <div>
              <h3 className="font-semibold text-text-heading">Day {day.day}</h3>
              <p className="text-sm text-text-muted">{day.theme || day.date}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="ml-5 border-l-2 border-border pl-6 space-y-4">
            {/* Activities */}
            {day.activities?.map((activity, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] top-2 w-3 h-3 rounded-full bg-primary border-2 border-surface" />
                <Card padding="sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-primary font-semibold">{activity.time}</span>
                        <Badge variant="default" size="sm">{activity.category}</Badge>
                      </div>
                      <h4 className="font-semibold text-text-heading">{activity.name}</h4>
                      <p className="text-sm text-text-muted mt-1">{activity.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
                        {activity.location && <span>📍 {activity.location}</span>}
                        {activity.duration && <span>⏱️ {activity.duration}</span>}
                      </div>
                      {activity.tip && (
                        <p className="text-xs text-accent mt-2">💡 {activity.tip}</p>
                      )}
                    </div>
                    {activity.cost > 0 && (
                      <span className="text-sm font-semibold text-primary whitespace-nowrap">
                        {formatCurrency(activity.cost)}
                      </span>
                    )}
                  </div>
                </Card>
              </div>
            ))}

            {/* Meals */}
            {day.meals?.length > 0 && (
              <div className="relative">
                <div className="absolute -left-[31px] top-2 w-3 h-3 rounded-full bg-accent border-2 border-surface" />
                <Card padding="sm" className="bg-accent/5 border-accent/20">
                  <p className="text-xs font-semibold text-accent mb-2">🍽️ MEALS</p>
                  <div className="space-y-1">
                    {day.meals.map((meal, i) => (
                      <p key={i} className="text-sm text-text">
                        <span className="font-medium capitalize">{meal.meal}:</span> {meal.suggestion}
                        <span className="text-text-muted"> — {meal.cuisine} ({meal.budget})</span>
                      </p>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Daily budget + transit */}
            <div className="flex items-center gap-4 text-xs text-text-muted">
              {day.dailyBudget > 0 && (
                <span>💰 Est. {formatCurrency(day.dailyBudget)}/day</span>
              )}
              {day.transitNotes && (
                <span>🚶 {day.transitNotes}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
