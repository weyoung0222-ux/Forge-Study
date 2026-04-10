import React from 'react';

type Props = {
  value?: string;
  placeholder?: string;
  ariaLabel: string;
  onChange: (value: string) => void;
};

export function ListSearchInputBlock({ value, placeholder = 'Search', ariaLabel, onChange }: Props): JSX.Element {
  return (
    <input
      type="search"
      value={value}
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={(event) => onChange(event.target.value)}
      className="h-9 w-64 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none"
    />
  );
}
