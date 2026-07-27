export default function Chip({
  label,
  icon: Icon,
  selected = false,
  onClick,
  className = '',
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-4 py-2 rounded-full
        text-sm font-medium transition-all duration-200 cursor-pointer
        border-2 active:scale-[0.95]
        ${selected
          ? 'bg-primary text-white border-primary shadow-md'
          : 'bg-surface text-text border-border hover:border-primary/50 hover:bg-primary-light'
        }
        ${className}
      `}
    >
      {Icon && <Icon className="w-4 h-4" strokeWidth={2} />}
      {label}
    </button>
  )
}
