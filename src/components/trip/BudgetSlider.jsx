import { Wallet, PiggyBank, Crown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BUDGET_LEVELS } from '../../utils/constants'

const BUDGET_ICONS = { budget: PiggyBank, 'mid-range': Wallet, luxury: Crown }

const BUDGET_LABEL_KEYS = {
  budget: 'constants.budget.budget',
  'mid-range': 'constants.budget.midRange',
  luxury: 'constants.budget.luxury',
}
const BUDGET_DESC_KEYS = {
  budget: 'constants.budget.budgetDesc',
  'mid-range': 'constants.budget.midRangeDesc',
  luxury: 'constants.budget.luxuryDesc',
}

export default function BudgetSlider({ value, onChange }) {
  const { t } = useTranslation()

  return (
    <div>
      <label className="block text-sm font-medium text-text-heading mb-3">
        {t('form.budget.label')}
      </label>
      <div className="grid grid-cols-3 gap-3">
        {BUDGET_LEVELS.map(level => {
          const Icon = BUDGET_ICONS[level.id]
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => onChange(level.id)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-center
                active:scale-[0.97]
                ${value === level.id
                  ? 'border-primary bg-primary-light shadow-md'
                  : 'border-border bg-surface hover:border-primary/40'
                }
              `}
            >
              <Icon className={`w-7 h-7 mx-auto mb-2 ${value === level.id ? 'text-primary' : 'text-text-muted'}`} strokeWidth={1.5} />
              <span className={`block font-semibold text-sm ${value === level.id ? 'text-primary' : 'text-text-heading'}`}>
                {t(BUDGET_LABEL_KEYS[level.id])}
              </span>
              <span className="block text-xs text-text-muted mt-1">{t(BUDGET_DESC_KEYS[level.id])}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
