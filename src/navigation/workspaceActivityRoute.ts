import type { ActivityDraftActivityKey } from '../data-spec/mocks/activityDraftHistory.mock';

/**
 * Workspace activity work page URL. Generator keeps sub-flow via `generateMode` (must match Load draft restore).
 * @see docs/policies/activity-draft-restore.md
 */
export function hrefWorkspaceActivity(
  projectId: string,
  activity: ActivityDraftActivityKey,
  options?: { generateMode?: string },
): string {
  const base = `/projects/${projectId}/workspace/${activity}`;
  const mode = options?.generateMode?.trim();
  if (activity === 'generator' && mode) {
    return `${base}?${new URLSearchParams({ generateMode: mode }).toString()}`;
  }
  return base;
}

/**
 * Sets or clears `overlay` while keeping other query keys (e.g. `generateMode`).
 * Use so Load draft / Save draft drawers open on the same Generate sub-page.
 * @see docs/policies/activity-draft-restore.md
 */
export function hrefWithWorkspaceOverlay(pathname: string, search: string, overlay: string | null): string {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  if (overlay) {
    params.set('overlay', overlay);
  } else {
    params.delete('overlay');
  }
  const s = params.toString();
  return s ? `${pathname}?${s}` : pathname;
}
