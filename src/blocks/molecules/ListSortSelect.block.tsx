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
    <div className="relative inline-flex">
      <select
        value={value}
        aria-label={ariaLabel}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 min-w-[170px] appearance-none rounded-md border border-slate-300 bg-white pl-3 pr-8 text-sm text-slate-800 focus:border-slate-500 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-2 inline-flex items-center text-slate-500">
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
