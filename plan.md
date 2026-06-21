# TripGenie — Implementation Plan

> **Styling:** Tailwind CSS v4 (`@tailwindcss/vite` plugin)
> **Routing:** react-router-dom
> **State:** React Context + useReducer
> **AI:** Gemini 2.0 Flash with Google Search grounding

---

## API Architecture

| Service | Purpose | Auth | Calls |
|---|---|---|---|
| Gemini AI | Everything: flights, hotels, attractions, itinerary, tips | API Key | 1 per trip |
| Unsplash | Destination photos | Access Key | 1 per trip |
| Open-Meteo | Weather forecast | None (open) | 1 per trip |
| Cities DB | City autocomplete (offline, 90+ cities) | None | 0 |

**Total API calls per trip: 1 Gemini + 1 Unsplash + 1 Open-Meteo = 3 calls**

---

## Phase 1: Foundation (Scaffold + Design System)

- [x] Install `react-router-dom`
- [x] Install Tailwind CSS v4 + Vite plugin
- [x] Configure Vite with Tailwind plugin
- [x] Set up CSS design tokens via `@theme` (colors, shadows, fonts, animations)
- [x] Add dark mode color overrides
- [x] Add custom keyframe animations (fade-in, slide-up, slide-in-right, scale-in, shimmer)
- [x] Set up routing (Landing → Form → Results)
- [x] Build UI components: Button, Input, Select, Slider, Chip, Card, Tabs, Badge, Skeleton, Spinner, ProgressBar
- [x] Build layout components: Header, Footer, PageTransition, Container
- [x] Build Landing page with hero + CTA
- [x] Update index.html title and meta tags

## Phase 2: Trip Input Form

- [x] Create TripContext with useReducer (destination, dates, travelers, budget, interests)
- [x] Build multi-step wizard component (step indicator, back/next, progress bar)
- [x] Build DestinationSearch with GeoDB API autocomplete
- [x] Build DatePicker component (start/end date)
- [x] Build TravelerSelector (adults, children counter)
- [x] Build BudgetSlider (budget / mid-range / luxury)
- [x] Build InterestPicker (chips: beach, culture, food, adventure, nightlife, nature, shopping, history)
- [x] Wire form state into TripContext
- [x] Build TripForm page (wizard container)
- [x] Validate each step before allowing next

## Phase 3: Gemini AI Service Layer

- [x] Build Gemini API service — single combined request for all trip data
- [x] Implement offline city search (90+ popular cities, no API needed)
- [x] Implement Gemini flights, hotels, attractions, itinerary, tips (one call)
- [x] Build Unsplash service (destination photos)
- [x] Build Open-Meteo service (weather forecast)
- [x] Build useTripPlanner orchestrator hook (Gemini + weather + photo in parallel)
- [x] Create .env.example with all required API key placeholders

## Phase 4: Results Dashboard

- [x] Build Results page with tab navigation
- [x] Build Overview tab (summary card, budget chart, quick stats)
- [x] Build Flights tab (FlightCard comparison, price sorting)
- [x] Build Hotels tab (HotelCard grid, filtering)
- [x] Build Itinerary tab (day-by-day timeline, ActivityCard)
- [x] Build Budget tab (category breakdown, bar chart, savings tips)
- [x] Build Tips tab (categorized tip cards, emergency numbers, phrases, packing list)
- [x] Handle empty states (no flights found, no hotels, etc.)
- [x] Add "Modify Trip" and "Start Over" actions

## Phase 5: Polish & Animations

- [x] Add page transitions (fade-in via PageTransition component)
- [x] Add card hover effects (scale + shadow via Card component)
- [x] Add staggered list entry animation (itinerary days, feature cards)
- [x] Build loading skeleton shimmer components (Loading page)
- [x] Build Loading page with animated progress messages
- [x] Add button micro-interactions (press scale via Button component)
- [x] Add tab switch crossfade (animate-fade-in on tab content)
- [x] Responsive design pass (mobile: 375px, tablet: 768px, desktop: 1280px)
- [x] Dark mode refinement (CSS variable overrides via prefers-color-scheme)
- [x] Final visual QA pass
