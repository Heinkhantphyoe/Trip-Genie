import { useState } from 'react'
import Card from '../ui/Card'

const TIP_CATEGORIES = [
  { key: 'beforeYouGo', label: 'Before You Go', icon: '📋' },
  { key: 'arrival', label: 'Arrival', icon: '🛬' },
  { key: 'gettingAround', label: 'Getting Around', icon: '🚌' },
  { key: 'culture', label: 'Culture', icon: '🏛️' },
  { key: 'food', label: 'Food & Drink', icon: '🍜' },
  { key: 'safety', label: 'Safety', icon: '🛡️' },
  { key: 'money', label: 'Money', icon: '💳' },
  { key: 'connectivity', label: 'Connectivity', icon: '📶' },
]

export default function TipsTab({ tips }) {
  const [expanded, setExpanded] = useState(null)

  if (!tips || !tips.tips) {
    return (
      <div className="text-center py-12">
        <span className="text-5xl block mb-4">💡</span>
        <h3 className="text-lg font-semibold text-text-heading mb-2">No tips available</h3>
        <p className="text-text-muted">Tips will appear after trip planning.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tip categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TIP_CATEGORIES.map(cat => {
          const catTips = tips.tips[cat.key]
          if (!catTips || catTips.length === 0) return null
          const isOpen = expanded === cat.key

          return (
            <Card
              key={cat.key}
              padding="md"
              hover
              className="cursor-pointer"
              onClick={() => setExpanded(isOpen ? null : cat.key)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{cat.icon}</span>
                  <h4 className="font-semibold text-text-heading">{cat.label}</h4>
                </div>
                <span className="text-text-muted">{isOpen ? '▲' : '▼'}</span>
              </div>

              {isOpen && (
                <div className="mt-4 space-y-3 animate-fade-in">
                  {catTips.map((tip, i) => (
                    <div key={i} className="pl-4 border-l-2 border-primary/30">
                      <p className="font-medium text-sm text-text-heading">{tip.title}</p>
                      <p className="text-sm text-text-muted mt-0.5">{tip.detail}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Emergency Numbers */}
      {tips.emergencyNumbers && (
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-text-heading mb-4">🚨 Emergency Numbers</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            {Object.entries(tips.emergencyNumbers).map(([key, value]) => (
              <div key={key} className="p-3 rounded-lg bg-surface-alt">
                <p className="text-xs text-text-muted capitalize">{key.replace(/_/g, ' ')}</p>
                <p className="text-lg font-bold text-text-heading">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Useful Phrases */}
      {tips.usefulPhrases && tips.usefulPhrases.length > 0 && (
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-text-heading mb-4">🗣️ Useful Phrases</h3>
          <div className="space-y-2">
            {tips.usefulPhrases.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-alt">
                <div>
                  <span className="text-sm font-medium text-text-heading">{p.phrase}</span>
                  <span className="text-sm text-text-muted mx-2">→</span>
                  <span className="text-sm text-primary font-medium">{p.local}</span>
                </div>
                {p.pronunciation && (
                  <span className="text-xs text-text-muted italic">({p.pronunciation})</span>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Packing List */}
      {tips.packingList && tips.packingList.length > 0 && (
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-text-heading mb-4">🎒 Packing List</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {tips.packingList.map((item, i) => (
              <label key={i} className="flex items-center gap-2 text-sm text-text cursor-pointer">
                <input type="checkbox" className="rounded border-border accent-primary" />
                {item}
              </label>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
