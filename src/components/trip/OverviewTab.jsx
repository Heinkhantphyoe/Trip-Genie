import { Plane, Building2, MapPin, Moon, CalendarDays, Users2, Wallet, Sparkles, DollarSign, CloudSun, Sun, CloudFog, CloudRain, CloudSnow, CloudLightning } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { formatCurrency } from '../../utils/format'

export default function OverviewTab({ results }) {
  const { t, i18n } = useTranslation()
  const { destination, dates, travelers, budget, flights, hotels, itinerary, weather, interests } = results

  const locale = i18n.language?.split('-')[0] === 'my' ? 'my' : 'en-US'

  const nightsCount = Math.ceil((new Date(dates.end) - new Date(dates.start)) / (1000 * 60 * 60 * 24))

  const stats = [
    { icon: Plane, label: t('overview.stats.flightsFound'), value: flights.length },
    { icon: Building2, label: t('overview.stats.hotelsFound'), value: hotels.length },
    { icon: MapPin, label: t('overview.stats.attractions'), value: itinerary.reduce((sum, d) => sum + d.activities.length, 0) },
    { icon: Moon, label: t('overview.stats.nights'), value: nightsCount },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} padding="md" className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-2">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <p className="text-2xl font-bold text-text-heading">{stat.value}</p>
              <p className="text-xs text-text-muted">{stat.label}</p>
            </Card>
          )
        })}
      </div>

      {/* Trip Summary */}
      <Card padding="lg">
        <h3 className="text-lg font-semibold text-text-heading mb-4">{t('overview.summary.title')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-3">
            <SummaryRow icon={MapPin} label={t('overview.summary.destination')} value={`${destination.city}, ${destination.country}`} />
            <SummaryRow icon={CalendarDays} label={t('overview.summary.dates')} value={`${dates.start} → ${dates.end}`} />
            <SummaryRow icon={Users2} label={t('overview.summary.travelers')} value={`${travelers.adults} ${t('overview.adults', { count: travelers.adults })}${travelers.children > 0 ? `, ${travelers.children} ${t('overview.children', { count: travelers.children })}` : ''}`} />
          </div>
          <div className="space-y-3">
            <SummaryRow icon={Wallet} label={t('overview.summary.budget')} value={results.budgetLevel} capitalize />
            <SummaryRow icon={Sparkles} label={t('overview.summary.style')} value={results.travelStyle} capitalize />
            <SummaryRow icon={DollarSign} label={t('overview.summary.estimatedTotal')} value={formatCurrency(budget.total, locale)} highlight />
          </div>
        </div>

        {/* Interests */}
        {interests.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-text-muted mb-2">{t('overview.summary.interests')}</p>
            <div className="flex flex-wrap gap-2">
              {interests.map(i => <Badge key={i} variant="primary">{t(`constants.interests.${i}`)}</Badge>)}
            </div>
          </div>
        )}
      </Card>

      {/* Weather */}
      {weather && weather.length > 0 && (
        <Card padding="lg">
          <div className="flex items-center gap-2 mb-4">
            <CloudSun className="w-5 h-5 text-accent" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold text-text-heading">{t('overview.weather')}</h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
            {weather.map(day => (
              <div key={day.date} className="text-center p-2 rounded-lg bg-surface-alt">
                <p className="text-xs text-text-muted">{new Date(day.date).toLocaleDateString(locale, { weekday: 'short' })}</p>
                <div className="flex justify-center my-1">
                  <WeatherIcon code={day.weatherCode} />
                </div>
                <p className="text-sm font-semibold text-text-heading">{Math.round(day.tempMax)}°</p>
                <p className="text-xs text-text-muted">{Math.round(day.tempMin)}°</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

function SummaryRow({ icon: Icon, label, value, capitalize = false, highlight = false }) {
  return (
    <div className="flex justify-between">
      <span className="flex items-center gap-1.5 text-text-muted">
        <Icon className="w-4 h-4" strokeWidth={1.5} />
        {label}
      </span>
      <span className={`font-medium ${highlight ? 'text-primary text-lg font-bold' : 'text-text-heading'} ${capitalize ? 'capitalize' : ''}`}>
        {value}
      </span>
    </div>
  )
}

function WeatherIcon({ code }) {
  const props = { className: 'w-5 h-5 text-accent', strokeWidth: 1.5 }
  if (code <= 1) return <Sun {...props} />
  if (code <= 3) return <CloudSun {...props} />
  if (code <= 48) return <CloudFog {...props} />
  if (code <= 55) return <CloudRain {...props} />
  if (code <= 65) return <CloudRain {...props} />
  if (code <= 75) return <CloudSnow {...props} />
  if (code <= 82) return <CloudRain {...props} />
  if (code >= 95) return <CloudLightning {...props} />
  return <CloudSun {...props} />
}
