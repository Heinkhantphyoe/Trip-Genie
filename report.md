# ch-3 Personal Project — Report

github_username: Heinkhantphyoe
personal_repo_url: https://github.com/Heinkhantphyoe/Trip-Genie
project_summary: An AI-powered React SPA for trip planning with specialized agents for research, budgeting, itineraries, and travel tips
slides_url: slides/pitch.md

## Methodology

I used a project-based approach, building TripGenie incrementally from a Vite React scaffold into a full travel planning app. I committed at each milestone—setting up the UI shell, wiring up context and hooks, adding agent definitions, and implementing slash commands. Claude Code helped me scaffold components, define the agent/skill architecture, and push to GitHub.

## Screenshoots

### Home Page
![Home Page](./screenshots/home.png)

### Choose Destination
![Choose Destination](./screenshots/choose_destination.png)

### Choose Date
![Choose Date](./screenshots/choose_date.png)

### Choose Travelers
![Choose Travelers](./screenshots/choose_travelers.png)

### Budget
![Budget](./screenshots/budger.png)

### Travel Plan Overview
![Travel Plan](./screenshots/travel_plan.png)

### Result Overview
![Result Overview](./screenshots/result_overview.png)

### Tips & Useful Phrases
![Tips and Useful Phrases](./screenshots/tips_and_userfulPhrases.png)

## Evidence — Claude Code usage

### MCP
- path: .mcp.json
- what: GitHub MCP server — used to create the remote repository, manage files, and push code directly from Claude Code

### Skill
- path: .claude/skills/travel_planner/plan-trip.md
- what: Orchestrates a full trip plan by coordinating research, budget, itinerary, and tips agents into a single workflow

- path: .claude/skills/travel_planner/search-destinations.md
- what: Finds and compares destinations based on climate, activities, budget, duration, and season

- path: .claude/skills/travel_planner/find-flights.md
- what: Searches and compares flight options by route, dates, passengers, and cabin class

- path: .claude/skills/travel_planner/find-hotels.md
- what: Searches and compares accommodations by destination, dates, guests, budget, and type

- path: .claude/skills/travel_planner/create-itinerary.md
- what: Builds a day-by-day itinerary with activity blocks, transit, meals, and reservation notes

- path: .claude/skills/travel_planner/estimate-budget.md
- what: Calculates a detailed trip cost estimate with category breakdowns and savings tips

- path: .claude/skills/travel_planner/get-tips.md
- what: Retrieves practical travel tips tailored to destination and traveler context

### Agent
- path: .claude/agents/research-agent.md
- what: Gathers and synthesizes destination info, flight routes, accommodation options, attractions, and seasonal recommendations

- path: .claude/agents/budget-agent.md
- what: Creates detailed cost breakdowns, suggests savings, compares costs between options, and tracks spending against a target budget

- path: .claude/agents/itinerary-agent.md
- what: Builds realistic day-by-day trip plans with activity blocks, transit logistics, meal suggestions, and reservation checklists

- path: .claude/agents/tips-agent.md
- what: Provides destination-specific practical advice on cultural norms, packing essentials, health/safety guidance, and money-saving hacks
