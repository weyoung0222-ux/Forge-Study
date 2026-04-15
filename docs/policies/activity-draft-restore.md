# Activity draft (Load draft) restore

## Goal

Loading a draft must show the **same activity shell and sub-flow** as before the user saved the draft. Only **form / workflow state** (steps, field values) changes.

Under **Generate**, the three menu entries (`synthetic-video`, `mimic-augmentation`, `idm`) are **three separate work pages** (same path, different `generateMode`). Drafts are **scoped per page**: each list shows only drafts whose `generateMode` matches the current URL. Save / Load draft must not navigate away from that sub-flow.

Under **Curate**, sub-flows use `curateMode` (`merge-datasets`, `analytics`) the same way: persist `curateMode` on `ActivityDraftSession`, filter drafts by it, and restore with `hrefWorkspaceActivity(..., { curateMode })`.

## Rules

1. **Route identity**  
   A draft is restored by navigating to the same work URL shape as a normal entry into that activity:
   - Path: `/projects/:projectId/workspace/:activity`
   - **Generate** (`activity === generator`): append `?generateMode=…` when the user was in a Generate sub-flow (e.g. `synthetic-video`). Omit the query only for the default “plain” Generate shell.
   - **Curate** (`activity === curator`): append `?curateMode=…` for Merge datasets / Analytics (e.g. `merge-datasets`).

2. **Persisted fields**  
   `ActivityDraftSession` stores `generateMode` and `curateMode` (optional) alongside `activity`, steps, and field snapshots. Saving a draft must copy the current mode from the page; loading must navigate with `hrefWorkspaceActivity` so the shell title and step-1 body stay aligned.

3. **Draft list scope**  
   For `generator`, filter drafts with `(draft.generateMode ?? '') === (currentGenerateMode ?? '')`. For `curator`, filter with `(draft.curateMode ?? '') === (currentCurateMode ?? '')`.

4. **Overlays without dropping sub-flow query**  
   Opening or closing `overlay=…` (jobs drawer, activity draft history) must use `hrefWithWorkspaceOverlay` so existing query keys (`generateMode`, `curateMode`, …) are preserved. Do not build overlay URLs from pathname only.

5. **Implementation**  
   - `hrefWorkspaceActivity` — post-select draft navigation.  
   - `hrefWithWorkspaceOverlay` — Load draft / Save draft drawer open/close on the current page.

## Related

- Types: `src/data-spec/mocks/activityDraftHistory.mock.ts`
- Consumer: `ProjectWorkspace.screen.tsx` (`handleSelectActivityDraft`, `handleSaveActivityDraft`)
- Routes: `src/navigation/workspaceActivityRoute.ts`
