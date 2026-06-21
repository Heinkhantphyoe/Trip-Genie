import Card from '../ui/Card'
import { formatCurrency } from '../../utils/format'

const CATEGORIES = [
  { key: 'flights', label: 'Flights', icon: '✈️', color: 'bg-indigo-500' },
  { key: 'accommodation', label: 'Accommodation', icon: '🏨', color: 'bg-emerald-500' },
  { key: 'activities', label: 'Activities', icon: '🎟️', color: 'bg-amber-500' },
  { key: 'food', label: 'Food & Drink', icon: '🍜', color: 'bg-red-500' },
  { key: 'miscellaneous', label: 'Miscellaneous', icon: '🎒', color: 'bg-slate-500' },
]

export default function BudgetTab({ budget }) {
  if (!budget) {
    return (
      <div className="text-center py-12">
        <span className="text-5xl block mb-4">💰</span>
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
            const amount = budget[cat.key] || 0
            const percentage = maxAmount > 0 ? (amount / maxAmount) * 100 : 0
            const totalPercentage = budget.total > 0 ? Math.round((amount / budget.total) * 100) : 0

            return (
              <div key={cat.key}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span>{cat.icon}</span>
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
        <h3 className="text-lg font-semibold text-text-heading mb-4">💡 Money-Saving Tips</h3>
        <ul className="space-y-2 text-sm text-text">
          <li className="flex items-start gap-2">
            <span className="text-success">✓</span>
            Book flights 2-3 months in advance for best prices
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success">✓</span>
            Consider staying slightly outside the city center for lower hotel rates
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success">✓</span>
            Eat at local restaurants instead of tourist areas
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success">✓</span>
            Use public transportation instead of taxis
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success">✓</span>
            Look for free walking tours and museum free days
          </li>
        </ul>
      </Card>
    </div>
  )
}
