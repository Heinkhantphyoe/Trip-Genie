
const variants = {
  primary: 'bg-primary text-white hover:bg-primary-hover active:scale-[0.97] shadow-md hover:shadow-lg',
  secondary: 'bg-surface-alt text-text-heading border border-border hover:bg-border active:scale-[0.97]',
  outline: 'bg-transparent text-primary border border-primary hover:bg-primary-light active:scale-[0.97]',
  ghost: 'bg-transparent text-text hover:bg-surface-alt active:scale-[0.97]',
  danger: 'bg-danger text-white hover:bg-red-700 active:scale-[0.97] shadow-md',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        rounded-lg transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
