// ─── AI Provider Configuration ───
// Multiple providers with automatic fallback

const PROVIDERS = [
  // Gemini models (Google)
  {
    name: 'Gemini',
    type: 'gemini',
    models: ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'],
    getUrl: (model) => `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    getKey: () => import.meta.env.VITE_GEMINI_API_KEY,
    buildBody: (prompt) => ({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 16384,
        responseMimeType: 'application/json',
      },
    }),
    extractText: (data) => data.candidates?.[0]?.content?.parts?.[0]?.text,
    getRetryDelay: (errText) => {
      const m = errText.match(/"retryDelay":\s*"(\d+)s"/)
      return m ? parseInt(m[1]) : null
    },
  },
  // DeepSeek (OpenAI-compatible)
  {
    name: 'DeepSeek',
    type: 'openai',
    models: ['deepseek-v4-flash'],
    getUrl: () => 'https://api.deepseek.com/chat/completions',
    getKey: () => import.meta.env.VITE_DEEPSEEK_API_KEY,
    buildBody: (prompt, model) => ({
      model,
      messages: [
        { role: 'system', content: 'You are a travel planning expert. Always respond with valid JSON only, no other text.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 16384,
      response_format: { type: 'json_object' },
    }),
    extractText: (data) => data.choices?.[0]?.message?.content,
  },
  // OpenAI
  {
    name: 'OpenAI',
    type: 'openai',
    models: ['gpt-4o-mini'],
    getUrl: () => 'https://api.openai.com/v1/chat/completions',
    getKey: () => import.meta.env.VITE_OPENAI_API_KEY,
    buildBody: (prompt, model) => ({
      model,
      messages: [
        { role: 'system', content: 'You are a travel planning expert. Always respond with valid JSON only, no other text.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 16384,
      response_format: { type: 'json_object' },
    }),
    extractText: (data) => data.choices?.[0]?.message?.content,
  },
]

// ─── JSON Parser ───

function tryParseJSON(text) {
  try { return JSON.parse(text) } catch { /* try next strategy */ }

  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON found in response')

  let json = jsonMatch[0]

  try { return JSON.parse(json) } catch { /* try next strategy */ }

  // Fix common issues
  json = json.replace(/,\s*([\]}])/g, '$1')  // trailing commas
  json = json.replace(/\/\/.*$/gm, '')         // comments
  json = json.replace(/(?<=[^\\])\n/g, '\\n')  // unescaped newlines

  try { return JSON.parse(json) } catch { /* try next strategy */ }

  // Close unclosed brackets/braces
  const openB = (json.match(/\[/g) || []).length
  const closeB = (json.match(/\]/g) || []).length
  const openC = (json.match(/\{/g) || []).length
  const closeC = (json.match(/\}/g) || []).length

  let fixed = json
  for (let i = 0; i < openB - closeB; i++) fixed += ']'
  for (let i = 0; i < openC - closeC; i++) fixed += '}'

  try { return JSON.parse(fixed) } catch (e) {
    console.error('JSON parse failed. Last 500 chars:', text.slice(-500))
    throw new Error(`Invalid JSON: ${e.message}`, { cause: e })
  }
}

// ─── Single Provider Call ───

async function callProvider(provider, prompt, model) {
  const key = provider.getKey()
  if (!key) throw new Error('NO_KEY')

  const url = provider.getUrl(model)
  const headers = {
    'Content-Type': 'application/json',
    ...(provider.type === 'openai' ? { 'Authorization': `Bearer ${key}` } : {}),
  }
  const body = provider.buildBody(prompt, model)
  const finalUrl = provider.type === 'gemini' ? `${url}?key=${key}` : url

  const res = await fetch(finalUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (res.status === 429) {
    const errText = await res.text()
    const retryDelay = provider.getRetryDelay?.(errText) || null
    throw new Error(`RATE_LIMITED:${retryDelay || 30}`)
  }

  if (!res.ok) {
    console.error(`${provider.name} error ${res.status}:`, await res.text())
    throw new Error('PROVIDER_ERROR')
  }

  const data = await res.json()
  const text = provider.extractText(data)

  if (!text) throw new Error('EMPTY_RESPONSE')
  return tryParseJSON(text)
}

// ─── Fallback Orchestrator ───

async function callWithFallback(prompt) {
  const skipped = []   // providers with no API key

  for (const provider of PROVIDERS) {
    const key = provider.getKey()
    if (!key) {
      skipped.push(provider.name)
      continue
    }

    const models = provider.name === 'Gemini'
      ? [...provider.models].sort(() => Math.random() - 0.5)
      : provider.models

    for (const model of models) {
      try {
        const result = await callProvider(provider, prompt, model)
        return result
      } catch (e) {
        if (e.message.startsWith('RATE_LIMITED:')) {
          const waitSec = parseInt(e.message.split(':')[1]) || 30
          await new Promise(r => setTimeout(r, waitSec * 1000))
        }
      }
    }
  }

  if (skipped.length === PROVIDERS.length) {
    throw new Error('NO_KEYS')
  }
  throw new Error('ALL_FAILED')
}

// ─── Trip Planning (public API) ───

export async function planFullTrip({ departureCity, departureCountry, destination, country, startDate, endDate, adults, children, budgetLevel, interests, travelStyle }) {
  const nights = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
  const days = nights + 1

  const prompt = `You are a travel planning expert. Plan a complete trip from ${departureCity}, ${departureCountry} to ${destination}, ${country}.

Trip details:
- Departing from: ${departureCity}, ${departureCountry}
- Destination: ${destination}, ${country}
- Dates: ${startDate} to ${endDate} (${days} days, ${nights} nights)
- Travelers: ${adults} adult(s), ${children} child(ren)
- Budget level: ${budgetLevel}
- Interests: ${interests.join(', ') || 'general sightseeing'}
- Travel style: ${travelStyle}

Return a single JSON object with ALL of the following sections:

{
  "flights": [
    {
      "airline": "Airline name",
      "flightNumber": "XX123",
      "departure": "HH:MM",
      "arrival": "HH:MM",
      "duration": "Xh Xm",
      "stops": 0,
      "price": 450,
      "currency": "USD",
      "cabin": "Economy"
    }
  ],

  "hotels": [
    {
      "name": "Hotel name",
      "type": "Hotel",
      "starRating": 4,
      "guestRating": 8.5,
      "pricePerNight": 120,
      "totalPrice": ${120 * nights},
      "currency": "USD",
      "location": "Area name",
      "distanceToCenter": "1.2 km",
      "amenities": ["WiFi", "Breakfast"],
      "cancellationPolicy": "Free cancellation",
      "description": "One line description"
    }
  ],

  "attractions": [
    {
      "name": "Attraction name",
      "category": "cultural",
      "description": "One sentence",
      "duration": "2 hours",
      "cost": 15,
      "currency": "USD",
      "rating": 4.5,
      "bestTime": "morning",
      "address": "Area name"
    }
  ],

  "restaurants": [
    {
      "name": "Restaurant name",
      "cuisine": "Local cuisine",
      "priceRange": "$$",
      "description": "One sentence",
      "area": "District name"
    }
  ],

  "itinerary": [
    {
      "day": 1,
      "date": "${startDate}",
      "theme": "Day theme",
      "activities": [
        {
          "time": "09:00",
          "name": "Activity name",
          "location": "Location",
          "duration": "2 hours",
          "cost": 0,
          "category": "cultural",
          "description": "What to do",
          "tip": "Optional tip"
        }
      ],
      "meals": [
        {
          "meal": "lunch",
          "suggestion": "Restaurant name",
          "cuisine": "Local",
          "budget": "$$"
        }
      ],
      "dailyBudget": 85,
      "transitNotes": "How to get around"
    }
  ],

  "tips": {
    "beforeYouGo": [{"title": "Tip", "detail": "Detail"}],
    "arrival": [{"title": "Tip", "detail": "Detail"}],
    "gettingAround": [{"title": "Tip", "detail": "Detail"}],
    "culture": [{"title": "Tip", "detail": "Detail"}],
    "food": [{"title": "Tip", "detail": "Detail"}],
    "safety": [{"title": "Tip", "detail": "Detail"}],
    "money": [{"title": "Tip", "detail": "Detail"}],
    "connectivity": [{"title": "Tip", "detail": "Detail"}]
  },

  "emergencyNumbers": {
    "police": "number",
    "ambulance": "number",
    "tourist_police": "number"
  },

  "usefulPhrases": [
    {"phrase": "Hello", "local": "translation", "pronunciation": "how to say"}
  ],

  "packingList": ["item1", "item2"],

  "totalEstimatedCost": 1500,
  "currency": "USD",
  "reservationsNeeded": ["Book museum tickets", "Reserve restaurant"]
}

Rules:
- Return 5-8 flights, 6-8 hotels, 10-15 attractions, 5-8 restaurants
- ${travelStyle === 'relaxed' ? '2-3 activities per day' : travelStyle === 'packed' ? '4-6 activities per day' : '3-4 activities per day'}
- 3-5 tips per category, specific to ${destination}
- 5-8 useful phrases in the local language
- 8-12 packing list items for the destination
- All prices in USD
- Return ONLY the JSON object, no other text`

  return callWithFallback(prompt)
}
