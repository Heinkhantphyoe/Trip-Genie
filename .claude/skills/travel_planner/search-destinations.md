# Search Destinations

Find and compare travel destinations based on user preferences and constraints.

## Usage

```
/search-destinations <preferences>
```

### Preferences

- **climate** — tropical, temperate, cold, desert
- **activities** — beach, hiking, cultural, food, nightlife, adventure
- **budget** — budget, mid-range, luxury
- **duration** — weekend, week, two-weeks, custom
- **season** — when the user plans to travel

## Workflow

1. Parse user preferences and constraints
2. Generate a shortlist of 3-5 matching destinations
3. For each destination, provide:
   - Why it matches the preferences
   - Best time to visit
   - Estimated cost range
   - Top 3 highlights
4. Rank destinations by fit score

## Output

A comparison table of recommended destinations with match reasoning and key metrics.
