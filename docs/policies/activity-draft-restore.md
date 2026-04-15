# Activity draft (Load draft) restore

## Goal

Loading a draft must show the **same activity shell and sub-flow** as before the user saved the draft. Only **form / workflow state** (steps, field values) changes.

Under **Generate**, the three menu entries (`synthetic-video`, `mimic-augmentation`, `idm`) are **three separate work pages** (same path, different `generateMode`). Drafts are **scoped per page**: each list shows only drafts whose `generateMode` matches the current URL. Save / Load draft must not navigate away from that sub-flow.

## Rules

1. **Route identity**  
   A draft is restored by navigating to the same work URL shape as a normal entry into that activity:
   - Path: `/projects/:projectId/workspace/:activity`
   - **Generate** (`activity === generator`): append `?generateMode=…` when the user was in a Generate sub-flow (e.g. `synthetic-video`). Omit the query only for the default “plain” Generate shell.

2. **Persisted fields**  
   `ActivityDraftSession` stores `generateMode` (optional) alongside `activity`, steps, and field snapshots. Saving a draft must copy the current `generateMode` from the page; loading must navigate with `hrefWorkspaceActivity` / the same query rules so the shell title and step-1 body (e.g. Synthetic Video vs template canvas) stay aligned.

3. **Draft list scope**  
   For `generator`, filter drafts with `(draft.generateMode ?? '') === (currentGenerateMode ?? '')` so Synthetic / Mimic / IDM (and plain Generate) each have an isolated list.

4. **Overlays without dropping `generateMode`**  
   Opening or closing `overlay=…` (jobs drawer, activity draft history) must use `hrefWithWorkspaceOverlay` so existing query keys (especially `generateMode`) are preserved. Do not build overlay URLs from pathname only.

5. **Implementation**  
   - `hrefWorkspaceActivity` — post-select draft navigation.  
   - `hrefWithWorkspaceOverlay` — Load draft / Save draft drawer open/close on the current page.

## Related

- Types: `src/data-spec/mocks/activityDraftHistory.mock.ts`
- Consumer: `ProjectWorkspace.screen.tsx` (`handleSelectActivityDraft`, `handleSaveActivityDraft`)
- Routes: `src/navigation/workspaceActivityRoute.ts`
