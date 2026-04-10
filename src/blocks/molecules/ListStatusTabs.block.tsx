import React from 'react';

export type ListStatusTab = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  items: ListStatusTab[];
  onChange: (value: string) => void;
};

export function ListStatusTabsBlock({ value, items, onChange }: Props): JSX.Element {
  return (
    <nav aria-label="List status tabs" className="flex gap-4 border-b border-slate-200">
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={[
              'border-b-2 bg-transparent pb-2 text-sm transition-colors',
              isActive
                ? 'border-slate-900 font-semibold text-slate-900'
                : 'border-transparent font-medium text-slate-500 hover:text-slate-800',
            ].join(' ')}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
