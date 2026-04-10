import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LibraryScreen } from '../../../screens/library/Library/Library.screen';

export function LibraryPage(): JSX.Element {
  const navigate = useNavigate();
  return <LibraryScreen onNavigate={(path) => navigate(path)} initialViewMode="grid" />;
}
