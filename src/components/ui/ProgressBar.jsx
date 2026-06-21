
export default function ProgressBar({
  value = 0,
  max = 100,
  showLabel = false,
  size = 'md',
  className = '',
}) {
  const percentage = Math.min(Math.round((value / max) * 100), 100)
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm text-text-muted">Progress</span>
          <span className="text-sm font-semibold text-primary">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-surface-alt rounded-full ${heights[size]}`}>
        <div
          className="bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%`, height: '100%' }}
        />
      </div>
    </div>
  )
}
