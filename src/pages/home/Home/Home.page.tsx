import React from 'react';
import { useNavigate } from 'react-router-dom';

import { HomeDashboardScreen } from '../../../screens/home/HomeDashboard/HomeDashboard.screen';

export function HomePage(): JSX.Element {
  const navigate = useNavigate();
  return <HomeDashboardScreen onNavigate={(path) => navigate(path)} />;
}
