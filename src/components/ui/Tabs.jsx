export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  className = '',
}) {
  return (
    <div className={`flex gap-1 p-1 bg-surface-alt rounded-xl overflow-x-auto ${className}`}>
      {tabs.map(tab => {
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap
              transition-all duration-200 cursor-pointer
              ${activeTab === tab.id
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-muted hover:text-text-heading'
              }
            `}
          >
            {Icon && <Icon className="w-4 h-4" strokeWidth={2} />}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
