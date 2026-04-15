import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LibraryScreen } from '../../../screens/library/Library/Library.screen';

export function LibraryPage(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedAssetId =
    typeof (location.state as { selectedAssetId?: string } | null)?.selectedAssetId === 'string'
      ? (location.state as { selectedAssetId: string }).selectedAssetId
      : undefined;

  return (
    <LibraryScreen
      onNavigate={(path, options) => navigate(path, options)}
      initialViewMode="grid"
      selectedAssetId={selectedAssetId}
    />
  );
}
