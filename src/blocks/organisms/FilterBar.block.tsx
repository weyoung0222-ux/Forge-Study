import React from 'react';

export type FilterChip = {
  key: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export type FilterSelect = {
  key: string;
  value: string;
  ariaLabel: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
};

type Props = {
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  onSearch?: (value: string) => void;
  chips?: FilterChip[];
  selects?: FilterSelect[];
};

export function FilterBarBlock({
  searchPlaceholder = 'Search',
  searchAriaLabel = 'Search',
  onSearch,
  chips = [],
  selects = [],
}: Props): JSX.Element {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <input
        type="search"
        placeholder={searchPlaceholder}
        aria-label={searchAriaLabel}
        onChange={(event) => onSearch?.(event.target.value)}
        style={{ width: 260 }}
      />

      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onClick}
          style={{
            borderRadius: 999,
            border: '1px solid #ddd',
            padding: '2px 10px',
            background: chip.active ? '#111' : '#fff',
            color: chip.active ? '#fff' : '#333',
          }}
        >
          {chip.label}
        </button>
      ))}

      {selects.map((select, idx) => (
        <select
          key={select.key}
          value={select.value}
          onChange={(event) => select.onChange(event.target.value)}
          aria-label={select.ariaLabel}
          style={idx === 0 ? { marginLeft: 'auto' } : undefined}
        >
          {select.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}
