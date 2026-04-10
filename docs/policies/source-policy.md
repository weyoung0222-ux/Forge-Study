# Source Policy

## Purpose
- `Source` is the activity that produced an output.
- Source should be expressed as a chip-style label in most UI contexts.

## Terminology
- From now on, output-producing work is called **Activity**.
- `Source` value must map to one activity.

## Activity Dictionary

### Data Foundry Activities
- `register`
- `collector`
- `generator`
- `curator`

### Model Institute Activities
- `trainer`
- `evaluator`

## UI Rules
- Display `Source` as a compact chip/badge label.
- Label text should use readable title case:
  - `Register`, `Collector`, `Generator`, `Curator`, `Trainer`, `Evaluator`
- Avoid placeholder tokens like `{Source}` in implemented screens.

## Data Rules
- Store source keys as normalized lowercase values.
- Use a dedicated source/activity union type where applicable.
- Keep source filter options aligned with the activity dictionary.

## Sync Requirement
- When source activities are added/changed, update:
  - this policy
  - relevant screen schemas/mocks
  - catalog previews/descriptions that expose source chips
