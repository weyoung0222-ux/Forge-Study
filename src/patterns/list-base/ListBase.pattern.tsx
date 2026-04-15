import React from 'react';

import { GlobalTopNavBlock, type TopNavItem, type TopNavUtilityButton } from '../../blocks/molecules/GlobalTopNav.block';
import { appShellInnerClass } from '../../styles/appLayoutClasses';
import { ListHeaderBlock } from '../../blocks/molecules/ListHeader.block';
import { ListStateBlock } from '../../blocks/molecules/ListState.block';
import { ListStatusTabsBlock, type ListStatusTab } from '../../blocks/molecules/ListStatusTabs.block';
import { ListToolbarBlock } from '../../blocks/organisms/ListToolbar.block';
import { globalTopNavBrandIcon, useGlobalTopNavActions } from '../../navigation/globalTopNav';
import type { ListFilterChip } from '../../blocks/molecules/ListFilterChips.block';
import type { ListSortOption } from '../../blocks/molecules/ListSortSelect.block';

type Props = {
  navItems: TopNavItem[];
  onHomeClick: () => void;
  topUtilityButtons?: TopNavUtilityButton[];
  title: string;
  subtitle: string;
  onPrimaryAction?: () => void;
  primaryActionLabel?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  chips: ListFilterChip[];
  rightExtras?: React.ReactNode;
  sortValue: string;
  sortOptions: ListSortOption[];
  onSortChange: (value: string) => void;
  statusValue: string;
  statusTabs: ListStatusTab[];
  onStatusChange: (value: string) => void;
  state: 'ready' | 'empty' | 'error' | 'loading';
  stateConfig?: {
    kind: 'empty' | 'error' | 'loading';
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
  };
  highlightBlockKey?: 'globalTopNav' | 'listHeader' | 'listToolbar' | 'listStatusTabs' | 'listContent';
  highlightNumber?: number | null;
  children: React.ReactNode;
};

export function ListBasePattern({
  navItems,
  onHomeClick,
  topUtilityButtons,
  title,
  subtitle,
  onPrimaryAction,
  primaryActionLabel,
  searchValue,
  onSearchChange,
  chips,
  rightExtras,
  sortValue,
  sortOptions,
  onSortChange,
  statusValue,
  statusTabs,
  onStatusChange,
  state,
  stateConfig,
  highlightBlockKey,
  highlightNumber,
  children,
}: Props): JSX.Element {
  const globalTopNavActions = useGlobalTopNavActions();

  const highlightClass = (key: 'globalTopNav' | 'listHeader' | 'listToolbar' | 'listStatusTabs' | 'listContent'): string =>
    highlightBlockKey === key ? 'relative rounded-lg ring-2 ring-indigo-400 ring-offset-2 transition' : '';

  const highlightBadge = (key: 'globalTopNav' | 'listHeader' | 'listToolbar' | 'listStatusTabs' | 'listContent') =>
    highlightBlockKey === key && highlightNumber ? (
      <span className="absolute -left-2 -top-2 z-10 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white">
        {highlightNumber}
      </span>
    ) : null;

  return (
    <div className="min-h-screen bg-white">
      <div className={highlightClass('globalTopNav')}>
        {highlightBadge('globalTopNav')}
        <GlobalTopNavBlock
          brand="PhysicalWorksForge"
          brandIcon={globalTopNavBrandIcon}
          onBrandClick={onHomeClick}
          items={navItems}
          utilityButtons={topUtilityButtons}
          actions={globalTopNavActions}
        />
      </div>

      <main className={[appShellInnerClass, 'grid gap-3 py-6'].join(' ')}>
        <div className={highlightClass('listHeader')}>
          {highlightBadge('listHeader')}
          <ListHeaderBlock
            title={title}
            subtitle={subtitle}
            primaryAction={
              primaryActionLabel && onPrimaryAction
                ? { label: primaryActionLabel, onClick: onPrimaryAction }
                : undefined
            }
          />
        </div>
        <div className={highlightClass('listToolbar')}>
          {highlightBadge('listToolbar')}
          <ListToolbarBlock
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            searchPlaceholder="Search"
            searchAriaLabel="Search list items"
            chips={chips}
            rightExtras={rightExtras}
            sortValue={sortValue}
            sortOptions={sortOptions}
            sortAriaLabel="Sort list"
            onSortChange={onSortChange}
          />
        </div>
        <div className={highlightClass('listStatusTabs')}>
          {highlightBadge('listStatusTabs')}
          <ListStatusTabsBlock value={statusValue} items={statusTabs} onChange={onStatusChange} />
        </div>

        {state === 'ready' ? (
          <div className={highlightClass('listContent')}>
            {highlightBadge('listContent')}
            {children}
          </div>
        ) : (
          <ListStateBlock
            kind={stateConfig?.kind ?? 'empty'}
            title={stateConfig?.title ?? 'No data'}
            description={stateConfig?.description ?? 'No items found for current filters.'}
            actionLabel={stateConfig?.actionLabel}
            onAction={stateConfig?.onAction}
          />
        )}
      </main>
    </div>
  );
}
