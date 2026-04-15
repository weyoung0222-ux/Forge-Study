import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ProjectCreateScreen } from '../../../screens/projects/ProjectCreate/ProjectCreate.screen';

export function ProjectCreatePage(): JSX.Element {
  const navigate = useNavigate();
  return <ProjectCreateScreen onNavigate={(path, options) => navigate(path, options)} />;
}
