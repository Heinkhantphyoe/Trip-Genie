import { useState } from 'react'

function toLocalDateString(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const today = toLocalDateString(new Date())

const QUICK_DURATIONS = [
  { label: 'Weekend', nights: 2, icon: '⚡' },
  { label: '3 Days', nights: 3, icon: '🗓️' },
  { label: '1 Week', nights: 7, icon: '✈️' },
  { label: '2 Weeks', nights: 14, icon: '🌍' },
]

export default function DatePicker({ startDate, endDate, onStartChange, onEndChange }) {
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)

  const nights = startDate && endDate
    ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
    : 0

  function handleQuickDuration(nightsCount) {
    if (!startDate) {
      // If no start date, set start to today
      onStartChange(today)
      const end = new Date()
      end.setDate(end.getDate() + nightsCount)
      onEndChange(toLocalDateString(end))
    } else {
      const end = new Date(startDate + 'T00:00:00')
      end.setDate(end.getDate() + nightsCount)
      onEndChange(toLocalDateString(end))
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-text-heading mb-3">
        When are you traveling?
      </label>

      {/* Quick duration buttons */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {QUICK_DURATIONS.map(d => (
          <button
            key={d.label}
            type="button"
            onClick={() => handleQuickDuration(d.nights)}
            className={`
              p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer text-center
              active:scale-[0.97]
              ${nights === d.nights
                ? 'border-primary bg-primary-light shadow-md'
                : 'border-border bg-surface hover:border-primary/40'
              }
            `}
          >
            <span className="text-xl block mb-1">{d.icon}</span>
            <span className={`text-sm font-semibold ${nights === d.nights ? 'text-primary' : 'text-text-heading'}`}>
              {d.label}
            </span>
          </button>
        ))}
      </div>

      {/* Custom date selection */}
      <div className="grid grid-cols-2 gap-4">
        {/* Start date */}
        <div className="relative">
          <label className="block text-xs text-text-muted mb-1.5">Departure</label>
          <button
            type="button"
            onClick={() => { setShowStartPicker(!showStartPicker); setShowEndPicker(false) }}
            className={`
              w-full px-4 py-3 rounded-xl border-2 text-left transition-all duration-200
              ${startDate
                ? 'border-primary bg-primary-light text-text-heading'
                : 'border-border bg-surface text-text-muted'
              }
            `}
          >
            <span className="text-sm">📅</span>
            <span className="ml-2 text-sm font-medium">
              {startDate ? formatDateDisplay(startDate) : 'Pick a date'}
            </span>
          </button>

          {showStartPicker && (
            <div className="absolute z-50 mt-2 left-0 right-0">
              <MiniCalendar
                selected={startDate}
                minDate={today}
                onSelect={(date) => { onStartChange(date); setShowStartPicker(false) }}
                onClose={() => setShowStartPicker(false)}
              />
            </div>
          )}
        </div>

        {/* End date */}
        <div className="relative">
          <label className="block text-xs text-text-muted mb-1.5">Return</label>
          <button
            type="button"
            onClick={() => { if (startDate) { setShowEndPicker(!showEndPicker); setShowStartPicker(false) } }}
            className={`
              w-full px-4 py-3 rounded-xl border-2 text-left transition-all duration-200
              ${!startDate ? 'opacity-50 cursor-not-allowed' : ''}
              ${endDate
                ? 'border-primary bg-primary-light text-text-heading'
                : 'border-border bg-surface text-text-muted'
              }
            `}
            disabled={!startDate}
          >
            <span className="text-sm">📅</span>
            <span className="ml-2 text-sm font-medium">
              {endDate ? formatDateDisplay(endDate) : 'Pick a date'}
            </span>
          </button>

          {showEndPicker && (
            <div className="absolute z-50 mt-2 left-0 right-0">
              <MiniCalendar
                selected={endDate}
                minDate={startDate}
                onSelect={(date) => { onEndChange(date); setShowEndPicker(false) }}
                onClose={() => setShowEndPicker(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Duration display */}
      {startDate && endDate && (
        <div className="mt-4 p-3 rounded-xl bg-surface-alt border border-border flex items-center justify-center gap-2">
          <span className="text-lg">🌙</span>
          <span className="text-sm font-medium text-text-heading">
            {nights} night{nights !== 1 ? 's' : ''} · {nights + 1} day{nights + 1 !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  )
}

// ─── Mini Calendar Component ───

function MiniCalendar({ selected, minDate, onSelect, onClose }) {
  const [viewDate, setViewDate] = useState(() => {
    if (selected) {
      const d = new Date(selected + 'T00:00:00')
      return new Date(d.getFullYear(), d.getMonth(), 1)
    }
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const monthName = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay()

  const days = []
  for (let i = 0; i < firstDayOfWeek; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  function isDisabled(day) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return dateStr < minDate
  }

  function isSelected(day) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return dateStr === selected
  }

  function handleSelect(day) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    onSelect(dateStr)
  }

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1))
  }

  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1))
  }

  return (
    <div
      className="bg-surface-raised rounded-xl border border-border shadow-lg p-4 animate-fade-in"
      onClick={e => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:bg-surface-alt transition-colors"
        >
          ←
        </button>
        <span className="text-sm font-semibold text-text-heading">{monthName}</span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:bg-surface-alt transition-colors"
        >
          →
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-xs text-text-muted text-center py-1 font-medium">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => (
          <div key={i} className="aspect-square">
            {day && (
              <button
                type="button"
                onClick={() => !isDisabled(day) && handleSelect(day)}
                disabled={isDisabled(day)}
                className={`
                  w-full h-full rounded-lg text-sm font-medium transition-all duration-150
                  ${isDisabled(day)
                    ? 'text-text-muted/30 cursor-not-allowed'
                    : isSelected(day)
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-heading hover:bg-surface-alt cursor-pointer'
                  }
                `}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="w-full mt-3 py-2 text-xs text-text-muted hover:text-text-heading transition-colors"
      >
        Close
      </button>
    </div>
  )
}
