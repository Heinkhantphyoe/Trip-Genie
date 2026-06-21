
function Counter({ label, icon, value, min = 0, max = 20, onChange }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-surface">
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <span className="font-medium text-text-heading">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-9 h-9 rounded-full border border-border bg-surface-alt text-text-heading
            flex items-center justify-center text-lg font-semibold
            hover:bg-primary-light hover:border-primary transition-all duration-200
            disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95"
        >
          −
        </button>
        <span className="w-8 text-center font-semibold text-lg text-text-heading">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-9 h-9 rounded-full border border-border bg-surface-alt text-text-heading
            flex items-center justify-center text-lg font-semibold
            hover:bg-primary-light hover:border-primary transition-all duration-200
            disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default function TravelerSelector({ adults, children, onAdultsChange, onChildrenChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-heading mb-3">
        Who's traveling?
      </label>
      <div className="space-y-3">
        <Counter
          label="Adults"
          icon="👤"
          value={adults}
          min={1}
          max={20}
          onChange={onAdultsChange}
        />
        <Counter
          label="Children"
          icon="👶"
          value={children}
          min={0}
          max={10}
          onChange={onChildrenChange}
        />
      </div>
      <p className="text-sm text-text-muted mt-2">
        👥 {adults} {adults === 1 ? 'adult' : 'adults'}{children > 0 ? `, ${children} ${children === 1 ? 'child' : 'children'}` : ''}
      </p>
    </div>
  )
}
