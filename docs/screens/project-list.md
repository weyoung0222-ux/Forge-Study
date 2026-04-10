# Project List Screen Spec

## Figma Link
- Add node URL here.

## Goal
- Allow users to browse, filter, and open project workspaces quickly.

## Block Composition
- Pattern: `list-base`
- Blocks:
  - `rfm.globalTopNav`
  - `rfm.listHeader`
  - `rfm.listToolbar`
  - `rfm.listStatusTabs`
  - `rfm.listState`
  - `rfm.projectCardGrid`
  - `rfm.projectCard`

## States
- Default: cards visible with current filters
- Empty: no cards match active filters
- Error: API error with retry action

## Routes
- `/projects`
- `/projects/new`
- `/projects/:projectId`

## Data References
- `src/data-spec/mocks/projectList.mock.ts`
- `src/screens/projects/ProjectList/ProjectList.schema.ts`
