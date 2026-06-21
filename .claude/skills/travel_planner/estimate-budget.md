# Estimate Budget

Calculate a detailed cost estimate for a trip.

## Usage

```
/estimate-budget <destination> <dates> <travelers> <style>
```

## Parameters

- **destination** — the travel destination
- **dates** — start and end dates
- **travelers** — number of travelers
- **style** — budget, mid-range, luxury (default: mid-range)

## Workflow

1. Calculate fixed costs:
   - Round-trip flights or transportation
   - Accommodation (per night × nights)
   - Travel insurance
   - Visa fees (if applicable)
2. Estimate variable daily costs:
   - Food and drinks (breakfast, lunch, dinner)
   - Local transportation
   - Activities and entrance fees
   - Shopping and souvenirs
3. Add contingency buffer (10-15%)
4. Compare against user's target budget (if provided)
5. Suggest cost-saving alternatives for over-budget categories

## Output

A budget breakdown with:
- Total estimated cost and per-person share
- Category-by-category breakdown with daily averages
- Comparison table if multiple style options are evaluated
- Specific cost-saving recommendations
- A list of costs that require advance payment or booking
