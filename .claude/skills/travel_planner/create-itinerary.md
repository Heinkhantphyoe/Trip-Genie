# Create Itinerary

Build a detailed day-by-day travel itinerary.

## Usage

```
/create-itinerary <destination> <dates> <style>
```

## Parameters

- **destination** — the travel destination
- **dates** — start and end dates
- **style** — relaxed, balanced, packed (default: balanced)
- **interests** — cultural, outdoor, food, shopping, nightlife (optional)
- **constraints** — mobility limitations, kids, dietary restrictions (optional)

## Workflow

1. Identify top attractions and experiences for the destination
2. Group activities geographically into daily clusters
3. Assign time blocks (morning, afternoon, evening) considering:
   - Opening hours and best visit times
   - Transit time between locations
   - Meal breaks near activity clusters
   - Rest periods based on travel style
4. Add flexibility markers for weather-dependent or optional activities
5. Generate reservation checklist for items requiring advance booking

## Output

A day-by-day itinerary with:
- Daily theme or focus area
- Timed activity blocks with locations
- Transit instructions between activities
- Meal suggestions with cuisine type and price range
- Estimated daily costs
- Notes on reservations, tickets, or special requirements
