import type { ActivityDraftActivityKey } from '../data-spec/mocks/activityDraftHistory.mock';

export type WorkspaceActivityHrefOptions = {
  generateMode?: string;
  /** Curate sub-flow (merge-datasets | analytics); must match Load draft restore. */
  curateMode?: string;
};

/**
 * Workspace activity work page URL. Generator/Curator keep sub-flow query keys (must match Load draft restore).
 * @see docs/policies/activity-draft-restore.md
 */
export function hrefWorkspaceActivity(
  projectId: string,
  activity: ActivityDraftActivityKey,
  options?: WorkspaceActivityHrefOptions,
): string {
  const base = `/projects/${projectId}/workspace/${activity}`;
  const gen = options?.generateMode?.trim();
  if (activity === 'generator' && gen) {
    return `${base}?${new URLSearchParams({ generateMode: gen }).toString()}`;
  }
  const cur = options?.curateMode?.trim();
  if (activity === 'curator' && cur) {
    return `${base}?${new URLSearchParams({ curateMode: cur }).toString()}`;
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
