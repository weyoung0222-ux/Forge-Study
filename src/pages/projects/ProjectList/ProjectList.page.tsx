import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ProjectListScreen } from '../../../screens/projects/ProjectList/ProjectList.screen';

export function ProjectListPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <ProjectListScreen
      onCreateProject={() => navigate('/projects/new')}
      onProjectClick={(projectId) => navigate(`/projects/${projectId}`)}
      onNavigate={(path) => navigate(path)}
    />
  );
}
