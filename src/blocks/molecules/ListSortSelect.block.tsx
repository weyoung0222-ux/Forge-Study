import React from 'react';

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
      className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 focus:border-slate-500 focus:outline-none"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
