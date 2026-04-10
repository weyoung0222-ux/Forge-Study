import React from 'react';

import { ListFilterChipsBlock, type ListFilterChip } from '../molecules/ListFilterChips.block';
import { ListSearchInputBlock } from '../molecules/ListSearchInput.block';
import { ListSortSelectBlock, type ListSortOption } from '../molecules/ListSortSelect.block';

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  searchAriaLabel: string;
  chips: ListFilterChip[];
  rightExtras?: React.ReactNode;
  sortValue: string;
  sortOptions: ListSortOption[];
  sortAriaLabel: string;
  onSortChange: (value: string) => void;
};

export function ListToolbarBlock({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  searchAriaLabel,
  chips,
  rightExtras,
  sortValue,
  sortOptions,
  sortAriaLabel,
  onSortChange,
}: Props): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ListSearchInputBlock
        value={searchValue}
        placeholder={searchPlaceholder}
        ariaLabel={searchAriaLabel}
        onChange={onSearchChange}
      />
      <ListFilterChipsBlock chips={chips} />
      <div className="ml-auto">
        <div className="flex items-center gap-2">
          {rightExtras}
          <ListSortSelectBlock value={sortValue} options={sortOptions} ariaLabel={sortAriaLabel} onChange={onSortChange} />
        </div>
      </div>
    </div>
  );
}
