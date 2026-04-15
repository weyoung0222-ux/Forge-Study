import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ProjectCreateDetailsScreen } from '../../../screens/projects/ProjectCreate/ProjectCreateDetails.screen';

export function ProjectCreateDetailsPage(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const robotId =
    typeof (location.state as { robotId?: string } | null)?.robotId === 'string'
      ? (location.state as { robotId: string }).robotId
      : undefined;

  return (
    <ProjectCreateDetailsScreen
      robotId={robotId}
      onNavigate={(path, options) => navigate(path, options)}
    />
  );
}
