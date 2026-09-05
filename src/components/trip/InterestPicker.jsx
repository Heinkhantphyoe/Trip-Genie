import { Umbrella, Scale, Zap, Landmark, UtensilsCrossed, Mountain, Moon, Leaf, ShoppingBag, Castle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { INTERESTS, TRAVEL_STYLES } from '../../utils/constants'
import Chip from '../ui/Chip'

const STYLE_ICONS = { relaxed: Umbrella, balanced: Scale, packed: Zap }
const INTEREST_ICONS = {
  beach: Umbrella, culture: Landmark, food: UtensilsCrossed,
  adventure: Mountain, nightlife: Moon, nature: Leaf,
  shopping: ShoppingBag, history: Castle,
}

export default function InterestPicker({ interests, style, onInterestsChange, onStyleChange }) {
  const { t } = useTranslation()

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
          {t('form.interests.travelStyle')}
        </label>
        <div className="grid grid-cols-3 gap-3">
          {TRAVEL_STYLES.map(s => {
            const Icon = STYLE_ICONS[s.id]
            return (
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
                <Icon className={`w-6 h-6 mx-auto mb-1 ${style === s.id ? 'text-primary' : 'text-text-muted'}`} strokeWidth={1.5} />
                <span className={`text-sm font-semibold ${style === s.id ? 'text-primary' : 'text-text-heading'}`}>
                  {t(`constants.styles.${s.id}`)}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-text-heading mb-3">
          {t('form.interests.label')} <span className="text-text-muted font-normal">{t('form.interests.hint')}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map(interest => {
            const Icon = INTEREST_ICONS[interest.id]
            return (
              <Chip
                key={interest.id}
                label={t(`constants.interests.${interest.id}`)}
                icon={Icon}
                selected={interests.includes(interest.id)}
                onClick={() => toggleInterest(interest.id)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
