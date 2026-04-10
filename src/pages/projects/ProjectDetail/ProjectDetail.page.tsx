import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ProjectDetailScreen } from '../../../screens/projects/ProjectDetail/ProjectDetail.screen';
export function ProjectDetailPage(): JSX.Element {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  return <ProjectDetailScreen projectId={projectId ?? 'Unknown'} onNavigate={(path) => navigate(path)} />;
}
