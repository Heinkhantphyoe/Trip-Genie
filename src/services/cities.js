const NOMINATIM_URL = 'https://nominatim.openstreetmap.org'

let searchTimeout = null

/**
 * Search cities worldwide using OpenStreetMap Nominatim (free, no API key).
 * Returns up to 8 results with city, country, coordinates.
 */
export function searchCities(query) {
  return new Promise((resolve) => {
    if (!query || query.length < 2) return resolve([])

    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          q: query,
          format: 'json',
          addressdetails: 1,
          limit: '8',
          'accept-language': 'en',
          featuretype: 'city',
        })

        const res = await fetch(`${NOMINATIM_URL}/search?${params}`, {
          headers: { 'User-Agent': 'TripGenie/1.0' },
        })

        if (!res.ok) return resolve([])

        const data = await res.json()
        const cities = data.map((item) => ({
          city: item.address.city || item.address.town || item.address.village || item.address.county || item.name,
          country: item.address.country || '',
          countryCode: item.address.country_code?.toUpperCase() || '',
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          label: '',
        })).filter((c) => c.city && c.country)

        cities.forEach((c) => { c.label = `${c.city}, ${c.country}` })
        resolve(cities)
      } catch {
        resolve([])
      }
    }, 300)
  })
}
