# Block Structure and Cleanup Guide

## Why this document exists
This guide defines how block-related folders and file names should be interpreted after cleanup.

## Duplicate analysis result
- `table-search-filter` and old project list pattern both embedded their own search/filter UI.
- `table-search-filter` also embedded table rendering that is conceptually reusable.
- Registry had `rfm.filterBar` and `rfm.dataTable`, but no concrete block files were present.

## Refactoring decision
- Consolidate shared filter controls into `FilterBarBlock`.
- Consolidate tabular rendering into `DataTableBlock`.
- Keep page-specific composition logic in patterns, not in low-level blocks.

## Folder semantics
- `src/blocks/molecules`
  - Composite UI pieces with a narrow scope.
  - Examples: `GlobalTopNav.block.tsx`, `ListHeader.block.tsx`, `ListSearchInput.block.tsx`,
    `ListFilterChips.block.tsx`, `ListSortSelect.block.tsx`, `ListStatusTabs.block.tsx`, `ListState.block.tsx`
- `src/blocks/organisms`
  - Screen-level reusable chunks or data presentation containers.
  - Examples: `FilterBar.block.tsx`, `DataTable.block.tsx`, `ListToolbar.block.tsx`,
    `ProjectCard.block.tsx`, `ProjectCardGrid.block.tsx`
- `src/blocks/registry`
  - Metadata registry that maps block IDs and pattern composition contracts.
  - Files: `blockRegistry.ts`, `patternRegistry.ts`
- `src/patterns/*`
  - Page composition templates assembled from registered blocks.
  - Example: `list-base/ListBase.pattern.tsx`

## File naming semantics
- `*.block.tsx`: reusable block component
- `*.pattern.tsx`: reusable page composition pattern
- `*.screen.tsx`: screen implementation that binds data and behavior to a pattern
- `*.page.tsx`: route entry wrapper for navigation concerns
- `*.route.ts`: route metadata object to register into `routeMap`

## Removed as unused
- `src/blocks/atoms` (empty placeholder only)
- `src/blocks/templates` (empty placeholder only)
- `src/screens/campaign` (placeholder only)
- `src/screens/segment` (placeholder only)
- `src/screens/dashboard` (placeholder only)
- `.storybook` (placeholder only)
- `figma/exports` (placeholder only)

## Ongoing rule
- If a UI shape appears in two or more patterns, extract it into `src/blocks`.
- Registry entries must always match actual block files.
- List screens should prefer `list-base` first, then extend only for domain-specific content blocks.
