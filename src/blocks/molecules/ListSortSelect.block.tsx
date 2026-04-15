import React from 'react';

import { formControlSortSelectClasses } from '../styles/formFieldClasses';

export type ListSortOption = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  options: ListSortOption[];
  ariaLabel: string;
  onChange: (value: string) => void;
};

export function ListSortSelectBlock({ value, options, ariaLabel, onChange }: Props): JSX.Element {
  return (
    <select
      value={value}
      aria-label={ariaLabel}
      onChange={(event) => onChange(event.target.value)}
      className={formControlSortSelectClasses}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
