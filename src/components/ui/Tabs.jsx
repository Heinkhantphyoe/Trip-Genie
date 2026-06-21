
export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  className = '',
}) {
  return (
    <div className={`flex gap-1 p-1 bg-surface-alt rounded-xl ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            flex-1 px-4 py-2.5 rounded-lg text-sm font-medium
            transition-all duration-200 cursor-pointer
            ${activeTab === tab.id
              ? 'bg-surface text-primary shadow-sm'
              : 'text-text-muted hover:text-text-heading'
            }
          `}
        >
          {tab.icon && <span className="mr-1.5">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
