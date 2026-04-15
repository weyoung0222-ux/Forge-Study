import React from 'react';

import { FilterChipToggle } from './Chip.block';

export type ListFilterChip = {
  key: string;
  label: string;
  active?: boolean;
  onClick: () => void;
};

type Props = {
  chips: ListFilterChip[];
};

export function ListFilterChipsBlock({ chips }: Props): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      {chips.map((chip) => (
        <FilterChipToggle key={chip.key} label={chip.label} active={chip.active} onClick={chip.onClick} />
      ))}
    </div>
  );
}
