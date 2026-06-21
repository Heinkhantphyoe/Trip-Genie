
export default function Card({
  children,
  padding = 'md',
  hover = false,
  className = '',
  ...props
}) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={`
        bg-surface-raised rounded-xl border border-border shadow-sm
        ${paddings[padding]}
        ${hover ? 'transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
