import { API_URLS } from '../utils/constants'

const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export async function getDestinationPhoto(cityName) {
  try {
    const res = await fetch(
      `${API_URLS.unsplash}/search/photos?query=${encodeURIComponent(cityName + ' travel city')}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${API_KEY}` } }
    )

    if (!res.ok) return null

    const data = await res.json()
    const photo = data.results?.[0]

    if (!photo) return null

    return {
      url: photo.urls.regular,
      thumb: photo.urls.small,
      author: photo.user.name,
      authorLink: photo.user.links.html,
      description: photo.alt_description || cityName,
    }
  } catch {
    return null
  }
}
