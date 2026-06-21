# Plan Trip

Orchestrate a complete trip planning workflow by coordinating research, budgeting, itinerary creation, and tips gathering.

## Usage

```
/plan-trip <destination> <dates> <travelers> <budget>
```

## Workflow

1. **Gather Requirements** — Parse destination, travel dates, number of travelers, and budget range from user input
2. **Research Phase** — Invoke research-agent to gather destination info, flights, and accommodations
3. **Budget Phase** — Invoke budget-agent to create cost breakdown and identify savings
4. **Itinerary Phase** — Invoke itinerary-agent to build day-by-day plan based on research and budget
5. **Tips Phase** — Invoke tips-agent to provide destination-specific advice
6. **Compile & Present** — Assemble all outputs into a unified trip plan

## Output

A complete trip plan document containing:
- Destination overview and recommendations
- Transportation and accommodation options with costs
- Day-by-day itinerary
- Total budget breakdown
- Practical tips and packing list
