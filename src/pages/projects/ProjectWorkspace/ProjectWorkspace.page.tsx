import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ProjectWorkspaceScreen } from '../../../screens/projects/ProjectWorkspace/ProjectWorkspace.screen';

export function ProjectWorkspacePage(): JSX.Element {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  return <ProjectWorkspaceScreen projectId={projectId ?? 'Unknown'} onNavigate={(path) => navigate(path)} />;
}
