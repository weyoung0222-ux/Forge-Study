# Naming Convention Policy

## General
- Use `PascalCase` for screen folder names.
- Use `kebab-case` for route paths and doc file names.
- Use `camelCase` for route keys.

## Screen Files
- `*.screen.tsx`: route-ready screen composition
- `*.layout.ts`: block arrangement metadata
- `*.schema.ts`: UI-facing field/column schema
- `*.policy.md`: per-screen policy notes

## Page and Route Files
- `*.page.tsx`: router-level entry component
- `*.route.ts`: route metadata used by `routeMap.ts`

## Block and Pattern Files
- Block component: `BlockName.block.tsx`
- Pattern component: `PatternName.pattern.tsx`
