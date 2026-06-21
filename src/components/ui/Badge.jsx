
const variants = {
  default: 'bg-surface-alt text-text-muted',
  primary: 'bg-primary-light text-primary',
  success: 'bg-emerald-50 text-success dark:bg-emerald-900/30',
  warning: 'bg-amber-50 text-warning dark:bg-amber-900/30',
  danger: 'bg-red-50 text-danger dark:bg-red-900/30',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
}

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}) {
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
