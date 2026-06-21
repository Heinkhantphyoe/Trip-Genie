# Find Flights

Search and compare flight options for a given route and dates.

## Usage

```
/find-flights <origin> <destination> <dates> <passengers>
```

## Parameters

- **origin** — departure city or airport code
- **destination** — arrival city or airport code
- **dates** — departure date (and return date for round-trip)
- **passengers** — number of travelers
- **cabin** — economy, premium-economy, business, first (default: economy)

## Workflow

1. Identify all airports serving origin and destination cities
2. Search for direct and connecting flight options
3. Compare by price, duration, layovers, and airline reputation
4. Flag budget airlines and their baggage policies
5. Present top options in each price tier

## Output

A flight comparison table with:
- Airline and flight numbers
- Departure/arrival times and duration
- Layover details (if applicable)
- Total price per passenger and for all passengers
- Baggage allowance and any restrictions
