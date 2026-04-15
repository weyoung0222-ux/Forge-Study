import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ProjectSettingsScreen } from '../../../screens/projects/ProjectSettings/ProjectSettings.screen';

export function ProjectSettingsPage(): JSX.Element {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  return (
    <ProjectSettingsScreen projectId={projectId ?? 'Unknown'} onNavigate={(path) => navigate(path)} />
  );
}
