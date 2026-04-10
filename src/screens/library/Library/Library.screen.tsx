import React from 'react';

import { ListSortSelectBlock } from '../../../blocks/molecules/ListSortSelect.block';
import { ViewModeToggleBlock, type ViewMode } from '../../../blocks/molecules/ViewModeToggle.block';
import { LibraryAssetGridBlock } from '../../../blocks/organisms/LibraryAssetGrid.block';
import { ScreenDescriptionPanelBlock } from '../../../blocks/organisms/ScreenDescriptionPanel.block';
import { createGlobalTopNavItems, createTemporaryTopUtilityButtons } from '../../../navigation/globalTopNav';
import { ListBasePattern } from '../../../patterns/list-base/ListBase.pattern';
import { libraryAssetRows } from '../../../data-spec/mocks/libraryAssets.mock';
import { libraryLayout } from './Library.layout';
import { libraryUxDescription } from './Library.ux';
import {
  libraryAssetTabs,
  librarySortOptions,
  librarySourceOptions,
  type LibraryAssetTab,
  type LibrarySort,
  type LibrarySource,
} from './Library.schema';

type Props = {
  onNavigate: (path: string) => void;
  initialViewMode?: ViewMode;
};

type LibraryHighlightKey =
  | 'librarySourceFilter'
  | 'viewModeToggle'
  | 'listStatusTabs'
  | 'libraryAssetGrid'
  | 'libraryAssetCard'
  | 'libraryAssetCardTitle'
  | 'libraryAssetCardSource'
  | 'libraryAssetCardMeta';

export function LibraryScreen({ onNavigate, initialViewMode = 'list' }: Props): JSX.Element {
  const [assetTab, setAssetTab] = React.useState<LibraryAssetTab>('dataset');
  const [search, setSearch] = React.useState('');
  const [sortValue, setSortValue] = React.useState<LibrarySort>('recent');
  const [sourceFilter, setSourceFilter] = React.useState<LibrarySource>('all');
  const [viewMode, setViewMode] = React.useState<ViewMode>(initialViewMode);
  const [isUxOpen, setIsUxOpen] = React.useState(false);
  const [highlightedBlockKey, setHighlightedBlockKey] = React.useState<LibraryHighlightKey | null>(null);
  const [highlightedNumber, setHighlightedNumber] = React.useState<number | null>(null);

  const highlightClass = (key: 'librarySourceFilter' | 'viewModeToggle' | 'libraryAssetGrid'): string =>
    highlightedBlockKey === key ? 'relative rounded-md ring-2 ring-indigo-400 ring-offset-2 transition' : '';

  const localBadge = (key: 'librarySourceFilter' | 'viewModeToggle' | 'libraryAssetGrid') =>
    highlightedBlockKey === key && highlightedNumber ? (
      <span className="absolute -left-2 -top-2 z-10 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white">
        {highlightedNumber}
      </span>
    ) : null;

  const cardHighlightPart =
    highlightedBlockKey === 'libraryAssetCard'
      ? 'card'
      : highlightedBlockKey === 'libraryAssetCardTitle'
        ? 'title'
        : highlightedBlockKey === 'libraryAssetCardSource'
          ? 'source'
          : highlightedBlockKey === 'libraryAssetCardMeta'
            ? 'meta'
            : undefined;

  const rows = React.useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = libraryAssetRows.filter((row) => {
      const byType = row.type === assetTab;
      const bySource = sourceFilter === 'all' ? true : row.sourceType === sourceFilter;
      const bySearch =
        normalizedSearch.length === 0
          ? true
          : row.outputName.toLowerCase().includes(normalizedSearch) ||
            row.workDescription.toLowerCase().includes(normalizedSearch);
      return byType && bySource && bySearch;
    });

    if (sortValue === 'name') {
      return [...filtered].sort((a, b) => a.outputName.localeCompare(b.outputName));
    }
    return filtered;
  }, [assetTab, search, sortValue, sourceFilter]);

  const navItems = createGlobalTopNavItems('library', onNavigate);
  const topUtilityButtons = createTemporaryTopUtilityButtons(
    () => setIsUxOpen(true),
    () => onNavigate('/'),
  );

  return (
    <>
      <div className={isUxOpen ? 'pr-0 transition-[padding] duration-300 lg:pr-[440px]' : 'transition-[padding] duration-300'}>
        <ListBasePattern
          navItems={navItems}
          onHomeClick={() => onNavigate('/home')}
          topUtilityButtons={topUtilityButtons}
          title={libraryLayout.pageTitle}
          subtitle={libraryLayout.pageDescription}
          highlightBlockKey={
            highlightedBlockKey === 'libraryAssetGrid' ||
            highlightedBlockKey === 'libraryAssetCard' ||
            highlightedBlockKey === 'libraryAssetCardTitle' ||
            highlightedBlockKey === 'libraryAssetCardSource' ||
            highlightedBlockKey === 'libraryAssetCardMeta'
              ? 'listContent'
              : highlightedBlockKey === 'listStatusTabs'
                ? highlightedBlockKey
                : undefined
          }
          highlightNumber={highlightedNumber}
          searchValue={search}
          onSearchChange={setSearch}
          chips={[]}
          rightExtras={
            <>
              <div className={highlightClass('librarySourceFilter')}>
                {localBadge('librarySourceFilter')}
                <ListSortSelectBlock
                  value={sourceFilter}
                  options={librarySourceOptions}
                  ariaLabel="Filter by source"
                  onChange={(value) => setSourceFilter(value as LibrarySource)}
                />
              </div>
              <div className={highlightClass('viewModeToggle')}>
                {localBadge('viewModeToggle')}
                <ViewModeToggleBlock value={viewMode} onChange={setViewMode} />
              </div>
            </>
          }
          sortValue={sortValue}
          sortOptions={librarySortOptions}
          onSortChange={(value) => setSortValue(value as LibrarySort)}
          statusValue={assetTab}
          statusTabs={libraryAssetTabs}
          onStatusChange={(value) => setAssetTab(value as LibraryAssetTab)}
          state={rows.length === 0 ? 'empty' : 'ready'}
          stateConfig={{
            kind: 'empty',
            title: 'No assets found',
            description: 'Try changing tab, source, or search keyword.',
          }}
        >
          <div className={highlightClass('libraryAssetGrid')}>
            {localBadge('libraryAssetGrid')}
            <LibraryAssetGridBlock
              items={rows}
              viewMode={viewMode}
              highlightPart={cardHighlightPart}
              highlightNumber={highlightedNumber}
            />
          </div>
        </ListBasePattern>
      </div>
      <ScreenDescriptionPanelBlock
        isOpen={isUxOpen}
        title={libraryUxDescription.title}
        summary={libraryUxDescription.summary}
        items={libraryUxDescription.items}
        onClose={() => {
          setIsUxOpen(false);
          setHighlightedBlockKey(null);
          setHighlightedNumber(null);
        }}
        onItemEnter={(itemKey, number) => {
          setHighlightedBlockKey(itemKey as LibraryHighlightKey);
          setHighlightedNumber(number);
        }}
        onItemLeave={() => {
          setHighlightedBlockKey(null);
          setHighlightedNumber(null);
        }}
        guideText="각 설명 카드에 마우스를 올리면 해당 블록이 화면에서 보라색 링으로 하이라이트됩니다."
      />
    </>
  );
}
