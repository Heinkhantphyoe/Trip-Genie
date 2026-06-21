import { BUDGET_LEVELS } from '../../utils/constants'

export default function BudgetSlider({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-heading mb-3">
        What's your budget?
      </label>
      <div className="grid grid-cols-3 gap-3">
        {BUDGET_LEVELS.map(level => (
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
            <span className="text-2xl block mb-2">{level.icon}</span>
            <span className={`block font-semibold text-sm ${value === level.id ? 'text-primary' : 'text-text-heading'}`}>
              {level.label}
            </span>
            <span className="block text-xs text-text-muted mt-1">{level.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
