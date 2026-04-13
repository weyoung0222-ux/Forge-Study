import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ProjectWorkspaceScreen } from '../../../screens/projects/ProjectWorkspace/ProjectWorkspace.screen';

export function ProjectWorkspacePage(): JSX.Element {
  const { projectId, workKey } = useParams<{ projectId: string; workKey?: string }>();
  const navigate = useNavigate();
  return <ProjectWorkspaceScreen projectId={projectId ?? 'Unknown'} workKey={workKey} onNavigate={(path) => navigate(path)} />;
}
