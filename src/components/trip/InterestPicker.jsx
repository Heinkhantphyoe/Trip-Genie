import { INTERESTS, TRAVEL_STYLES } from '../../utils/constants'
import Chip from '../ui/Chip'

export default function InterestPicker({ interests, style, onInterestsChange, onStyleChange }) {
  function toggleInterest(id) {
    onInterestsChange(
      interests.includes(id)
        ? interests.filter(i => i !== id)
        : [...interests, id]
    )
  }

  return (
    <div className="space-y-6">
      {/* Travel Style */}
      <div>
        <label className="block text-sm font-medium text-text-heading mb-3">
          Travel style
        </label>
        <div className="grid grid-cols-3 gap-3">
          {TRAVEL_STYLES.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => onStyleChange(s.id)}
              className={`
                p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer text-center
                active:scale-[0.97]
                ${style === s.id
                  ? 'border-primary bg-primary-light shadow-md'
                  : 'border-border bg-surface hover:border-primary/40'
                }
              `}
            >
              <span className="text-xl block mb-1">{s.icon}</span>
              <span className={`text-sm font-semibold ${style === s.id ? 'text-primary' : 'text-text-heading'}`}>
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-text-heading mb-3">
          What interests you? <span className="text-text-muted font-normal">(pick as many as you like)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map(interest => (
            <Chip
              key={interest.id}
              label={interest.label}
              icon={interest.icon}
              selected={interests.includes(interest.id)}
              onClick={() => toggleInterest(interest.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
