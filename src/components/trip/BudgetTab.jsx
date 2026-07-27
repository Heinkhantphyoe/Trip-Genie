import { Plane, Building2, Ticket, UtensilsCrossed, Backpack, Lightbulb, Check } from 'lucide-react'
import Card from '../ui/Card'
import { formatCurrency } from '../../utils/format'

const CATEGORIES = [
  { key: 'flights', label: 'Flights', icon: Plane, color: 'bg-indigo-500' },
  { key: 'accommodation', label: 'Accommodation', icon: Building2, color: 'bg-emerald-500' },
  { key: 'activities', label: 'Activities', icon: Ticket, color: 'bg-amber-500' },
  { key: 'food', label: 'Food & Drink', icon: UtensilsCrossed, color: 'bg-red-500' },
  { key: 'miscellaneous', label: 'Miscellaneous', icon: Backpack, color: 'bg-slate-500' },
]

export default function BudgetTab({ budget }) {
  if (!budget) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
          <Lightbulb className="w-7 h-7" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-semibold text-text-heading mb-2">No budget data</h3>
        <p className="text-text-muted">Budget breakdown will appear after trip planning.</p>
      </div>
    )
  }

  const maxAmount = Math.max(...CATEGORIES.map(c => budget[c.key] || 0))

  return (
    <div className="space-y-6">
      {/* Total */}
      <Card padding="lg" className="text-center">
        <p className="text-sm text-text-muted mb-1">Estimated Total</p>
        <p className="text-4xl font-bold text-primary">{formatCurrency(budget.total)}</p>
        <p className="text-sm text-text-muted mt-1">
          {formatCurrency(budget.perDay)} per day
        </p>
      </Card>

      {/* Bar chart */}
      <Card padding="lg">
        <h3 className="text-lg font-semibold text-text-heading mb-6">Cost Breakdown</h3>
        <div className="space-y-4">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon
            const amount = budget[cat.key] || 0
            const percentage = maxAmount > 0 ? (amount / maxAmount) * 100 : 0
            const totalPercentage = budget.total > 0 ? Math.round((amount / budget.total) * 100) : 0

            return (
              <div key={cat.key}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-text-heading">{cat.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-muted">{totalPercentage}%</span>
                    <span className="text-sm font-semibold text-text-heading">{formatCurrency(amount)}</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-surface-alt rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${cat.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Tips to save */}
      <Card padding="lg">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-accent" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold text-text-heading">Money-Saving Tips</h3>
        </div>
        <ul className="space-y-2 text-sm text-text">
          {[
            'Book flights 2-3 months in advance for best prices',
            'Consider staying slightly outside the city center for lower hotel rates',
            'Eat at local restaurants instead of tourist areas',
            'Use public transportation instead of taxis',
            'Look for free walking tours and museum free days',
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-success mt-0.5 shrink-0" strokeWidth={2.5} />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
