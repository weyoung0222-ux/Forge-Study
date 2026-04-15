import React from 'react';

import { ListSortSelectBlock } from '../../../blocks/molecules/ListSortSelect.block';
import { ViewModeToggleBlock, type ViewMode } from '../../../blocks/molecules/ViewModeToggle.block';
import { LibraryAssetGridBlock } from '../../../blocks/organisms/LibraryAssetGrid.block';
import { ScreenDescriptionPanelBlock } from '../../../blocks/organisms/ScreenDescriptionPanel.block';
import { useLanguage } from '../../../context/LanguageContext';
import { createGlobalTopNavItems, createTemporaryTopUtilityButtons } from '../../../navigation/globalTopNav';
import { ListBasePattern } from '../../../patterns/list-base/ListBase.pattern';
import type { LibraryAssetItem } from '../../../data-spec/mocks/libraryAssets.mock';
import { libraryAssetRows } from '../../../data-spec/mocks/libraryAssets.mock';
import { buildLibraryUxDescription } from './Library.ux';
import {
  getLibraryAssetTabs,
  getLibrarySortOptions,
  getLibrarySourceOptions,
  type LibraryAssetTab,
  type LibrarySort,
  type LibrarySource,
} from './Library.schema';

type Props = {
  onNavigate: (path: string, options?: { state?: unknown }) => void;
  initialViewMode?: ViewMode;
  /** 목록 복귀 시 선택 유지(라우트 state) */
  selectedAssetId?: string;
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

export function LibraryScreen({ onNavigate, initialViewMode = 'list', selectedAssetId }: Props): JSX.Element {
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

  const handleAssetSelect = (item: LibraryAssetItem): void => {
    const path = item.type === 'dataset' ? `/library/datasets/${item.id}` : `/library/models/${item.id}`;
    onNavigate(path, { state: { selectedAssetId: item.id } });
  };

  const { t } = useLanguage();
  const navItems = createGlobalTopNavItems('library', onNavigate, t);
  const topUtilityButtons = createTemporaryTopUtilityButtons(
    () => setIsUxOpen(true),
    () => onNavigate('/'),
    t,
  );
  const libraryAssetTabs = React.useMemo(() => getLibraryAssetTabs(t), [t]);
  const librarySortOptions = React.useMemo(() => getLibrarySortOptions(t), [t]);
  const librarySourceOptions = React.useMemo(() => getLibrarySourceOptions(t), [t]);
  const libraryUxDescription = React.useMemo(() => buildLibraryUxDescription(t), [t]);

  return (
    <>
      <div className={isUxOpen ? 'pr-0 transition-[padding] duration-300 lg:pr-[440px]' : 'transition-[padding] duration-300'}>
        <ListBasePattern
          navItems={navItems}
          onHomeClick={() => onNavigate('/home')}
          topUtilityButtons={topUtilityButtons}
          title={t('library.pageTitle')}
          subtitle={t('library.pageDescription')}
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
                  ariaLabel={t('library.filter.aria')}
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
            title: t('library.empty.title'),
            description: t('library.empty.desc'),
          }}
        >
          <div className={highlightClass('libraryAssetGrid')}>
            {localBadge('libraryAssetGrid')}
            <LibraryAssetGridBlock
              items={rows}
              viewMode={viewMode}
              highlightPart={cardHighlightPart}
              highlightNumber={highlightedNumber}
              selectedAssetId={selectedAssetId}
              onAssetSelect={handleAssetSelect}
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
        guideText={t('library.guide.hover')}
      />
    </>
  );
}
