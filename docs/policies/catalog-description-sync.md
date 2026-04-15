# Catalog Unified Policy

## Purpose
- Maintain a single unified `Catalog` page for unit exploration and explanation.
- `Descriptions` route is redirected to `Catalog` and is not maintained separately.

## Component vs block (governance)
- Blocks are composed of catalog-defined components and shared tokens. See **`docs/policies/component-block-catalog-governance.md`** for rules (chips, forms, mandatory catalog entries).
- Primitive inventory (buttons, tabs, tokens): **`docs/policies/ui-primitives-inventory.md`**.

## Single Source of Truth
- Unit definitions are managed only in `src/descriptions/unitDefinitions.ts`.
- `Catalog` consumes:
  - `componentUnitItems`
  - `blockUnitItems`
  - `screenPatternUnitItems` (화면 패턴 탭)

## Visibility Rule
- Show an item only when both conditions are true:
  - `renderable === true`
  - `usedInPrototype === true`
- If the UI cannot be rendered now, do not show it in the menu.

## Update Workflow
1. Add or update a unit in `unitDefinitions.ts`.
2. Add render preview mapping in `src/pages/catalog/Catalog/Catalog.page.tsx`.
3. Verify tabs/menu/search and selected preview flow still work.
4. Remove or disable stale units (`renderable`/`usedInPrototype` false) immediately.

## Maintenance Note
- Every time a block/pattern/screen changes, update the unified catalog in the same task.
