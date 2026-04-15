# React Screen Build Guide

## Goal
Build new screens quickly with reusable list blocks and route-first structure.

## Steps
1. Define screen name and route segment.
2. Create `screen/page/route/doc` files together.
3. Use `list-base` first for any list-like screen.
4. Keep domain-specific UI only in content blocks (for example, cards or table rows).
5. Register route metadata in `routeMap.ts`.
6. Register new reusable blocks/patterns in block registries if extracted.

## Required file set per screen
- `src/screens/<domain>/<ScreenName>/<ScreenName>.screen.tsx`
- `src/screens/<domain>/<ScreenName>/<ScreenName>.layout.ts`
- `src/screens/<domain>/<ScreenName>/<ScreenName>.schema.ts`
- `src/screens/<domain>/<ScreenName>/<ScreenName>.policy.md`
- `src/pages/<domain>/<ScreenName>/<ScreenName>.page.tsx`
- `src/pages/<domain>/<ScreenName>/<ScreenName>.route.ts`
- `docs/screens/<domain>-<screen-name>.md`

## Reuse priority
1. `ListBase.pattern.tsx`
2. `ListToolbarBlock`, `ListStatusTabsBlock`, `ListStateBlock`
3. Existing domain blocks (`ProjectCardBlock`, `ProjectCardGridBlock`)
4. New block creation (only if reused in 2+ screens)

## Route policy
- List: `/resource`
- Create: `/resource/new`
- Detail: `/resource/:id`
- Hide non-navigation routes in `routeMap.ts` using `hidden: true`.

## App layout width (1200px)
- **Single source:** `src/styles/appLayoutClasses.ts` — `appShellInnerClass` (`max-w-[1200px]`, centered, horizontal padding).
- **GNB:** `GlobalTopNavBlock` inner row uses `appShellInnerClass` so the header aligns with page content.
- **Depth-1 & list shells:** Wrap main content (e.g. `ListBasePattern` `<main>`) with `appShellInnerClass`.
- **Project LNB + main:** One grid wrapper with `appShellInnerClass` so sidebar + content together cap at 1200px.
- **Activity (`WorkPageShellBlock`):** Title bar and stepper are full-width strips; inner rows use `appShellInnerClass`. The scrollable body uses full-width `bg-slate-100` with inner content constrained by `appShellInnerClass`. The shell uses `flex` + `min-h-0` so the area below the stepper fills remaining viewport height and scrolls inside the inner column.
