import { useState, useEffect, useRef, useMemo } from 'react'
import { searchCitiesOffline } from '../../services/cities'

export default function DestinationSearch({ value, onChange, label = 'Where do you want to go?', placeholder = 'Search for a city...' }) {
  const [query, setQuery] = useState(value?.city || '')
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  const results = useMemo(() => {
    if (query.length < 1) return []
    return searchCitiesOffline(query)
  }, [query])

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(city) {
    setQuery(city.label)
    onChange(city)
    setOpen(false)
  }

  function handleChange(e) {
    setQuery(e.target.value)
    setOpen(true)
    if (value) onChange(null)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-text-heading mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-surface text-text
            placeholder:text-text-muted transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-lg"
        />
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-surface-raised border border-border rounded-lg shadow-lg
          max-h-60 overflow-y-auto">
          {results.map((city, i) => (
            <li
              key={i}
              onClick={() => handleSelect(city)}
              className="px-4 py-3 cursor-pointer hover:bg-primary-light transition-colors
                flex items-center gap-3 border-b border-border last:border-b-0"
            >
              <span className="text-lg">📍</span>
              <div>
                <div className="font-medium text-text-heading">{city.city}</div>
                <div className="text-sm text-text-muted">{city.country}</div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {open && query.length >= 1 && results.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-surface-raised border border-border rounded-lg shadow-lg p-4">
          <p className="text-text-muted text-sm text-center">No cities found. Try a different name.</p>
        </div>
      )}
    </div>
  )
}
