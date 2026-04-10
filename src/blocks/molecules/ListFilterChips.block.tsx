import React from 'react';

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
        <button
          key={chip.key}
          type="button"
          onClick={chip.onClick}
          className={[
            'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
            chip.active
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400',
          ].join(' ')}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
