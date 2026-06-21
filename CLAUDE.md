# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TripGenie — a React single-page application for trip/travel planning. Currently in early scaffolding stage (Vite React template).

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build to `dist/`
- `npm run preview` — Serve production build locally
- `npm run lint` — Run ESLint on all files

No test framework is configured yet.

## Tech Stack

- **React 19** with JSX (no TypeScript source files, though `@types` packages are installed for IDE support)
- **Vite 8** with `@vitejs/plugin-react` (Oxc-based)
- **ESLint 10** flat config with react-hooks and react-refresh plugins
- **Plain CSS** with CSS custom properties for theming, native CSS nesting, and `prefers-color-scheme` dark mode
- ES Modules (`"type": "module"`)

## Architecture

- `index.html` — Vite SPA entry point; loads `src/main.jsx`
- `src/main.jsx` — Mounts `<App />` into `#root` inside `StrictMode`
- `src/App.jsx` — Root component (currently a stub)
- `src/index.css` — Global styles and CSS variable definitions (light/dark themes)
- `src/App.css` — Component-level styles
- `public/` — Static assets served at root (favicon, SVG icons)

## Agents

Custom agents in `.claude/agents/` provide specialized travel planning capabilities:

- **research-agent** — Gathers and synthesizes destination info, flight routes, accommodation options, attractions, and seasonal recommendations
- **budget-agent** — Creates detailed cost breakdowns, suggests savings, compares costs between options, and tracks spending against a target budget
- **itinerary-agent** — Builds realistic day-by-day trip plans with activity blocks, transit logistics, meal suggestions, and reservation checklists
- **tips-agent** — Provides destination-specific practical advice: cultural norms, packing essentials, health/safety guidance, money-saving hacks

## Skills

Slash commands in `.claude/skills/travel_planner/` expose travel planning workflows to the user:

| Skill | Description |
|---|---|
| `/plan-trip` | Orchestrates a full trip plan by coordinating research, budget, itinerary, and tips agents |
| `/search-destinations` | Finds and compares destinations based on climate, activities, budget, duration, and season |
| `/find-flights` | Searches and compares flight options by route, dates, passengers, and cabin class |
| `/find-hotels` | Searches and compares accommodations by destination, dates, guests, budget, and type |
| `/create-itinerary` | Builds a day-by-day itinerary with activity blocks, transit, meals, and reservation notes |
| `/estimate-budget` | Calculates a detailed trip cost estimate with category breakdowns and savings tips |
| `/get-tips` | Retrieves practical travel tips tailored to destination and traveler context |
