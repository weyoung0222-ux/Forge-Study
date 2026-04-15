import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { LibraryAssetDetailScreen } from '../../../screens/library/LibraryAssetDetail/LibraryAssetDetail.screen';

export function LibraryModelDetailPage(): JSX.Element {
  const navigate = useNavigate();
  const { assetId } = useParams<{ assetId: string }>();
  return (
    <LibraryAssetDetailScreen
      assetKind="model"
      assetId={assetId ?? ''}
      onNavigate={(to, options) => navigate(to, options)}
    />
  );
}
