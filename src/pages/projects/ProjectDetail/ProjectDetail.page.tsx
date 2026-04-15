import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ProjectDetailScreen } from '../../../screens/projects/ProjectDetail/ProjectDetail.screen';
export function ProjectDetailPage(): JSX.Element {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const overlayKey = new URLSearchParams(location.search).get('overlay') ?? undefined;
  return (
    <ProjectDetailScreen
      projectId={projectId ?? 'Unknown'}
      currentPath={location.pathname}
      overlayKey={overlayKey}
      onNavigate={(path) => navigate(path)}
    />
  );
}
