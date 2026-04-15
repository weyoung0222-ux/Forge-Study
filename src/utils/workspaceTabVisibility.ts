import type { ProjectMemberRole } from '../blocks/organisms/ProjectWorkspaceSidebar.block';

export type WorkspaceTabKey = 'dataFoundry' | 'modelInstitute';

/**
 * Which workspace domain tabs a member may see — see `docs/policies/user-role-policy.md`.
 * - `project owner`: both tabs
 * - `data engineer` (without owner): Data Foundry only
 * - `model engineer` (without owner): Model Institute only
 * - Both engineer sub-roles (without owner): both tabs
 */
export function getWorkspaceTabVisibility(roles: ProjectMemberRole[]): {
  visibleTabs: WorkspaceTabKey[];
  defaultTab: WorkspaceTabKey;
} {
  const isOwner = roles.includes('project owner');
  const hasDataEngineer = roles.includes('data engineer');
  const hasModelEngineer = roles.includes('model engineer');

  const showDataFoundry = isOwner || hasDataEngineer;
  const showModelInstitute = isOwner || hasModelEngineer;

  const visibleTabs: WorkspaceTabKey[] = [];
  if (showDataFoundry) visibleTabs.push('dataFoundry');
  if (showModelInstitute) visibleTabs.push('modelInstitute');

  if (visibleTabs.length === 0) {
    return { visibleTabs: ['dataFoundry', 'modelInstitute'], defaultTab: 'dataFoundry' };
  }

  return { visibleTabs, defaultTab: visibleTabs[0] };
}
