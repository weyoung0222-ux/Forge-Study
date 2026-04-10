# Customer List Screen Spec

## Figma Link
- Add node URL here.

## Goal
- Allow planners to search and review customer-level RFM indicators.

## Block Composition
- Pattern: `table-search-filter`
- Blocks:
  - `rfm.filterBar`
  - `rfm.dataTable`

## States
- Default: table visible with first page data
- Empty: no rows with filter reset action
- Error: API error message with retry action

## Route
- `/customers/list`

## Data References
- `src/data-spec/entities/customer.entity.ts`
- `src/data-spec/columns/customer.columns.ts`

## Open Questions
- Should segment filter support multi-select?
