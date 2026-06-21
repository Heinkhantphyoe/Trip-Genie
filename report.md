# TripGenie — Project Report

## Overview

TripGenie is an AI-powered travel planning assistant built as a React single-page application. It helps users plan trips by providing destination recommendations, flight and hotel search, itinerary generation, budget estimation, and practical travel tips.

## Problem Statement

Travel planning is often a fragmented and time-consuming process. Users typically need to:

- Visit multiple websites to compare flights and hotels
- Manually research destinations and activities
- Estimate costs without reliable data
- Look up cultural tips and local phrases separately

This scattered approach leads to decision fatigue and incomplete planning.

## Solution

TripGenie consolidates the entire travel planning workflow into a single application powered by specialized AI agents:

| Agent | Responsibility |
|-------|----------------|
| `research-agent` | Gathers destination info, flight routes, accommodation options, attractions, and seasonal recommendations |
| `budget-agent` | Creates detailed cost breakdowns, suggests savings, and compares costs between options |
| `itinerary-agent` | Builds realistic day-by-day trip plans with activity blocks, transit logistics, and meal suggestions |
| `tips-agent` | Provides destination-specific advice on cultural norms, packing essentials, health/safety, and money-saving hacks |

## Features

- **Destination Search** — Find and compare destinations based on climate, activities, budget, duration, and season
- **Flight Finder** — Search and compare flight options by route, dates, passengers, and cabin class
- **Hotel Search** — Search and compare accommodations by destination, dates, guests, budget, and type
- **Itinerary Builder** — Build a day-by-day itinerary with activity blocks, transit, meals, and reservation notes
- **Budget Estimator** — Calculate a detailed trip cost estimate with category breakdowns and savings tips
- **Travel Tips** — Retrieve practical travel tips tailored to destination and traveler context

## Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| Framework | React 19 | Component-based UI with latest concurrent features |
| Build Tool | Vite 8 | Fast dev server with HMR, optimized production builds |
| Routing | React Router v7 | Client-side navigation between pages |
| Styling | Tailwind CSS 4 | Utility-first CSS with rapid prototyping |
| Linting | ESLint 10 | Code quality enforcement |
| Language | JavaScript (JSX) | No TypeScript overhead, faster iteration |

## Architecture

```
tripgenie/
├── public/              # Static assets (favicon, icons)
├── src/
│   ├── assets/          # Images and media
│   ├── components/      # Reusable UI components
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API and external services
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Root component
│   ├── App.css          # Component styles
│   ├── index.css        # Global styles with CSS variables
│   └── main.jsx         # Entry point
├── slides/              # Presentation materials
├── screenshots/         # Application screenshots
├── index.html           # Vite SPA entry point
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## User Flow

1. **Home** — User lands on the welcome page
2. **Choose Destination** — Select where to travel based on preferences
3. **Choose Travelers** — Specify number of travelers and group type
4. **Choose Date** — Set travel dates and duration
5. **Travel Plan** — View AI-generated recommendations
6. **Budget** — See detailed cost breakdown
7. **Tips & Phrases** — Get local insights and useful phrases

## Screenshots

| Screen | Screenshot |
|--------|------------|
| Home Page | ![Home](./screenshots/home.png) |
| Choose Destination | ![Destination](./screenshots/choose_destination.png) |
| Choose Travelers | ![Travelers](./screenshots/choose_travelers.png) |
| Choose Date | ![Date](./screenshots/choose_date.png) |
| Travel Plan | ![Plan](./screenshots/travel_plan.png) |
| Budget | ![Budget](./screenshots/budger.png) |
| Result Overview | ![Result](./screenshots/result_overview.png) |
| Tips & Phrases | ![Tips](./screenshots/tips_and_userfulPhrases.png) |

## Future Improvements

- **API Integration** — Connect to real flight and hotel booking APIs
- **User Accounts** — Save and share trip plans
- **Multi-language** — Support for multiple interface languages
- **Mobile App** — Native mobile experience
- **Collaborative Planning** — Invite others to plan together
- **Offline Mode** — Access saved trips without internet

## Conclusion

TripGenie demonstrates a modern approach to travel planning by combining a clean React UI with AI-powered agents. The modular architecture allows for easy extension, and the use of established tools like Vite, React Router, and Tailwind CSS ensures a solid foundation for future development.

---

*Built with React 19, Vite 8, and Tailwind CSS 4*
