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

function getWeatherDescription(code) {
  const descriptions = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
    55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow', 80: 'Slight showers',
    81: 'Moderate showers', 82: 'Violent showers', 95: 'Thunderstorm',
  }
  return descriptions[code] || 'Unknown'
}
