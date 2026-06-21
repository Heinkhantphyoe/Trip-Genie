# Travel Planner Skills

A collection of slash commands for trip and travel planning workflows. Each skill coordinates one or more specialized agents to produce actionable travel deliverables.

## Available Skills

| Command | Description |
|---|---|
| `/plan-trip` | Orchestrate a full trip plan by coordinating research, budget, itinerary, and tips agents |
| `/search-destinations` | Find and compare destinations based on climate, activities, budget, duration, and season |
| `/find-flights` | Search and compare flight options by route, dates, passengers, and cabin class |
| `/find-hotels` | Search and compare accommodations by destination, dates, guests, budget, and type |
| `/create-itinerary` | Build a day-by-day itinerary with activity blocks, transit, meals, and reservation notes |
| `/estimate-budget` | Calculate a detailed trip cost estimate with category breakdowns and savings tips |
| `/get-tips` | Retrieve practical travel tips tailored to destination and traveler context |

## Agent Coordination

Skills delegate to specialized agents defined in `.claude/agents/`:

- **research-agent** — destination info, flight routes, accommodation options, attractions
- **budget-agent** — cost breakdowns, savings suggestions, spending tracking
- **itinerary-agent** — day-by-day plans, activity blocks, transit logistics, meals
- **tips-agent** — cultural norms, packing essentials, health/safety, money-saving hacks

## Typical Workflow

A full trip planning session follows this sequence:

1. `/search-destinations` — narrow down where to go
2. `/find-flights` + `/find-hotels` — lock in transportation and accommodation
3. `/create-itinerary` — plan daily activities
4. `/estimate-budget` — validate costs against target
5. `/get-tips` — prepare for the destination

Or use `/plan-trip` to run all steps in a single orchestrated flow.
