import React from 'react';

import type { ViewMode } from '../molecules/ViewModeToggle.block';
import type { LibraryAssetItem } from '../../data-spec/mocks/libraryAssets.mock';
import { LibraryAssetCardBlock } from './LibraryAssetCard.block';

type Props = {
  items: LibraryAssetItem[];
  viewMode: ViewMode;
  highlightPart?: 'card' | 'title' | 'source' | 'meta';
  highlightNumber?: number | null;
  selectedAssetId?: string;
  onAssetSelect?: (item: LibraryAssetItem) => void;
};

export function LibraryAssetGridBlock({
  items,
  viewMode,
  highlightPart,
  highlightNumber,
  selectedAssetId,
  onAssetSelect,
}: Props): JSX.Element {
  const gridClassName =
    viewMode === 'grid'
      ? 'grid grid-cols-1 gap-3 md:grid-cols-2'
      : 'grid grid-cols-1 gap-2';

  return (
    <section aria-label="Library assets" className={gridClassName}>
      {items.map((item) => (
        <LibraryAssetCardBlock
          key={item.id}
          item={item}
          highlightPart={highlightPart}
          highlightNumber={highlightNumber}
          isSelected={selectedAssetId === item.id}
          onSelect={onAssetSelect}
        />
      ))}
    </section>
  );
}
