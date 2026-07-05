---
marp: true
title: TripGenie — How It's Built
---

# Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | **React 19** — JSX components, StrictMode, hooks |
| Build Tool | **Vite 8** — Oxc-based bundling with HMR |
| Routing | **React Router v7** — client-side navigation |
| Styling | **Tailwind CSS 4** — utility-first + CSS custom properties |
| AI Layer | **Claude Code** — 4 specialized agents + 7 slash commands |

ES Modules throughout. No TypeScript source files, but `@types` packages are installed for IDE support.

---

# Agents

Four specialized AI agents, each focused on one aspect of travel planning:

| Agent | Role |
|-------|------|
| **research-agent** | Gathers destination info, flight routes, accommodations, attractions, seasonal data |
| **budget-agent** | Creates cost breakdowns, suggests savings, tracks spending against target |
| **itinerary-agent** | Builds day-by-day plans with activity blocks, transit logistics, meals |
| **tips-agent** | Provides cultural norms, packing lists, health/safety, money-saving hacks |

Each agent is defined in `.claude/agents/` with its own system prompt, responsibilities, output format, and guidelines.

---

# Skills

Seven slash commands expose agent coordination to the user:

| Command | What it does |
|---------|--------------|
| `/plan-trip` | Orchestrates all 4 agents for a complete trip plan |
| `/search-destinations` | Compares destinations by climate, activities, budget, season |
| `/find-flights` | Searches flights by route, dates, passengers, cabin class |
| `/find-hotels` | Compares accommodations by destination, dates, budget, type |
| `/create-itinerary` | Builds day-by-day plans with activity blocks and transit |
| `/estimate-budget` | Calculates cost breakdowns with category-level detail |
| `/get-tips` | Retrieves destination-specific practical travel advice |

Skills live in `.claude/skills/travel_planner/` and delegate to agents.

---

# Methodology

Travel planning follows a **sequential pipeline**:

1. **Research** — Understand the destination (climate, culture, logistics)
2. **Transport** — Lock in flights and ground transportation
3. **Accommodation** — Choose where to stay
4. **Itinerary** — Plan daily activities around research and transport
5. **Budget** — Validate costs against target, find savings
6. **Tips** — Prepare for on-the-ground realities

Each phase feeds into the next. `/plan-trip` runs all phases in one orchestrated flow; individual commands run a single phase.

---

# Trigger

Skills activate through **slash commands** in Claude Code:

```
/plan-trip Bali "Dec 2026" 2 $2000
/search-destinations "tropical, hiking, budget"
/estimate-budget Tokyo "Jan 2027" 3 luxury
/create-itinerary Paris "Mar 2027" packed
/get-tips "first time in Southeast Asia"
```

Each command parses user input against its parameter schema, then invokes the relevant agent(s) to produce structured output.

---

# Commands

Local development and build workflow:

```bash
npm install          # install dependencies
npm run dev          # start Vite dev server → localhost:5173
npm run build        # production build to dist/
npm run preview      # serve production build locally
npm run lint         # run ESLint on all files
```

No test framework is configured yet. The project uses ESLint 10 flat config with `react-hooks` and `react-refresh` plugins.

**Repo:** `github.com/Heinkhantphyoe/TripGenie`
