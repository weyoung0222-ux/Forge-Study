import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import type { ActivityDraftSession } from '../../../data-spec/mocks/activityDraftHistory.mock';
import { ProjectWorkspaceScreen } from '../../../screens/projects/ProjectWorkspace/ProjectWorkspace.screen';

export function ProjectWorkspacePage(): JSX.Element {
  const { projectId, workKey } = useParams<{ projectId: string; workKey?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const overlayKey = searchParams.get('overlay') ?? undefined;
  const generateMode = searchParams.get('generateMode') ?? undefined;
  const draftRestore = (location.state as { activityDraftRestore?: ActivityDraftSession } | null)?.activityDraftRestore;

  const clearDraftLocationState = React.useCallback(() => {
    navigate({ pathname: location.pathname, search: location.search }, { replace: true, state: {} });
  }, [navigate, location.pathname, location.search]);

  return (
    <ProjectWorkspaceScreen
      projectId={projectId ?? 'Unknown'}
      workKey={workKey}
      generateMode={generateMode}
      workspacePathname={location.pathname}
      workspaceSearch={location.search}
      overlayKey={overlayKey}
      draftRestore={draftRestore}
      onClearDraftRestore={clearDraftLocationState}
      onNavigate={(to, options) => navigate(to, options)}
    />
  );
}
