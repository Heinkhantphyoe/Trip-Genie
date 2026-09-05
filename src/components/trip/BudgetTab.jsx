import { Plane, Building2, Ticket, UtensilsCrossed, Backpack, Lightbulb, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Card from '../ui/Card'
import { formatCurrency } from '../../utils/format'

const CATEGORY_KEYS = ['flights', 'accommodation', 'activities', 'food', 'miscellaneous']
const CATEGORY_ICONS = { flights: Plane, accommodation: Building2, activities: Ticket, food: UtensilsCrossed, miscellaneous: Backpack }
const CATEGORY_COLORS = { flights: 'bg-indigo-500', accommodation: 'bg-emerald-500', activities: 'bg-amber-500', food: 'bg-red-500', miscellaneous: 'bg-slate-500' }

export default function BudgetTab({ budget }) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language?.split('-')[0] === 'my' ? 'my' : 'en-US'

  if (!budget) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
          <Lightbulb className="w-7 h-7" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-semibold text-text-heading mb-2">{t('budget.noData')}</h3>
        <p className="text-text-muted">{t('budget.noDataHint')}</p>
      </div>
    )
  }

  const maxAmount = Math.max(...CATEGORY_KEYS.map(k => budget[k] || 0))
  const tips = t('budget.tips', { returnObjects: true })

  return (
    <div className="space-y-6">
      {/* Total */}
      <Card padding="lg" className="text-center">
        <p className="text-sm text-text-muted mb-1">{t('budget.estimatedTotal')}</p>
        <p className="text-4xl font-bold text-primary">{formatCurrency(budget.total, locale)}</p>
        <p className="text-sm text-text-muted mt-1">
          {formatCurrency(budget.perDay, locale)} {t('budget.perDay')}
        </p>
      </Card>

      {/* Bar chart */}
      <Card padding="lg">
        <h3 className="text-lg font-semibold text-text-heading mb-6">{t('budget.breakdown')}</h3>
        <div className="space-y-4">
          {CATEGORY_KEYS.map(key => {
            const Icon = CATEGORY_ICONS[key]
            const amount = budget[key] || 0
            const percentage = maxAmount > 0 ? (amount / maxAmount) * 100 : 0
            const totalPercentage = budget.total > 0 ? Math.round((amount / budget.total) * 100) : 0

            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-text-heading">{t(`budget.categories.${key}`)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-muted">{totalPercentage}%</span>
                    <span className="text-sm font-semibold text-text-heading">{formatCurrency(amount, locale)}</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-surface-alt rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${CATEGORY_COLORS[key]}`}
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
          <h3 className="text-lg font-semibold text-text-heading">{t('budget.savingsTips')}</h3>
        </div>
        <ul className="space-y-2 text-sm text-text">
          {tips.map((tip, i) => (
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
