import i18n from '../i18n'
import { API_URLS } from '../utils/constants'

export async function getWeatherForecast(lat, lon, startDate, endDate) {
  try {
    const url = `${API_URLS.openMeteo}/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&start_date=${startDate}&end_date=${endDate}&timezone=auto`

    const res = await fetch(url)
    if (!res.ok) return null

    const data = await res.json()
    const daily = data.daily

    return daily.time.map((date, i) => ({
      date,
      tempMax: daily.temperature_2m_max[i],
      tempMin: daily.temperature_2m_min[i],
      rainChance: daily.precipitation_probability_max[i],
      weatherCode: daily.weathercode[i],
      description: getWeatherDescription(daily.weathercode[i]),
    }))
  } catch {
    return null
  }
}

const WEATHER_CODE_KEYS = {
  0: 'clearSky', 1: 'mainlyClear', 2: 'partlyCloudy', 3: 'overcast',
  45: 'fog', 48: 'rimeFog', 51: 'lightDrizzle', 53: 'moderateDrizzle',
  55: 'denseDrizzle', 61: 'slightRain', 63: 'moderateRain', 65: 'heavyRain',
  71: 'slightSnow', 73: 'moderateSnow', 75: 'heavySnow', 80: 'slightShowers',
  81: 'moderateShowers', 82: 'violentShowers', 95: 'thunderstorm',
}

function getWeatherDescription(code) {
  const key = WEATHER_CODE_KEYS[code]
  if (key) {
    return i18n.t(`weather.${key}`)
  }
  return i18n.t('weather.unknown')
}
