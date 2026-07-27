import { useState } from 'react'
import { ClipboardList, Plane, Bus, Landmark, UtensilsCrossed, ShieldCheck, CreditCard, Wifi, ChevronUp, ChevronDown, Phone, Languages, Backpack, Lightbulb } from 'lucide-react'
import Card from '../ui/Card'

const TIP_CATEGORIES = [
  { key: 'beforeYouGo', label: 'Before You Go', icon: ClipboardList },
  { key: 'arrival', label: 'Arrival', icon: Plane },
  { key: 'gettingAround', label: 'Getting Around', icon: Bus },
  { key: 'culture', label: 'Culture', icon: Landmark },
  { key: 'food', label: 'Food & Drink', icon: UtensilsCrossed },
  { key: 'safety', label: 'Safety', icon: ShieldCheck },
  { key: 'money', label: 'Money', icon: CreditCard },
  { key: 'connectivity', label: 'Connectivity', icon: Wifi },
]

export default function TipsTab({ tips }) {
  const [expanded, setExpanded] = useState(null)

  if (!tips || !tips.tips) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-4">
          <Lightbulb className="w-7 h-7" strokeWidth={1.5} />
        </div>
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
          const Icon = cat.icon
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
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  <h4 className="font-semibold text-text-heading">{cat.label}</h4>
                </div>
                <span className="text-text-muted">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
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
          <div className="flex items-center gap-2 mb-4">
            <Phone className="w-5 h-5 text-danger" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold text-text-heading">Emergency Numbers</h3>
          </div>
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
          <div className="flex items-center gap-2 mb-4">
            <Languages className="w-5 h-5 text-accent" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold text-text-heading">Useful Phrases</h3>
          </div>
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
          <div className="flex items-center gap-2 mb-4">
            <Backpack className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold text-text-heading">Packing List</h3>
          </div>
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
