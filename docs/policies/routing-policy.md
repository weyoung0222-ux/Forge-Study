# Routing Policy

## Route Registration
- Every screen route must be added to `src/app/routes/routeMap.ts`.
- Every route must have `key`, `path`, and `title`.

## URL Rules
- Use plural resource names where possible: `/customers/list`.
- Avoid exposing internal IDs in path unless the screen is detail-focused.

## Prototype Connectivity
- All prototype screens must be reachable from the home route `/`.
