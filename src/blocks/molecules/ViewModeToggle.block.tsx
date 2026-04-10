import React from 'react';

export type ViewMode = 'list' | 'grid';

type Props = {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
};

export function ViewModeToggleBlock({ value, onChange }: Props): JSX.Element {
  return (
    <div className="inline-flex items-center rounded-md border border-slate-300 bg-white p-0.5">
      <button
        type="button"
        aria-label="List view"
        title="List view"
        onClick={() => onChange('list')}
        className={[
          'rounded p-1.5',
          value === 'list' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100',
        ].join(' ')}
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 5.5h12M4 10h12M4 14.5h12" strokeLinecap="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Grid view"
        title="Grid view"
        onClick={() => onChange('grid')}
        className={[
          'rounded p-1.5',
          value === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100',
        ].join(' ')}
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
          <rect x="3.5" y="3.5" width="5.5" height="5.5" rx="1" />
          <rect x="11" y="3.5" width="5.5" height="5.5" rx="1" />
          <rect x="3.5" y="11" width="5.5" height="5.5" rx="1" />
          <rect x="11" y="11" width="5.5" height="5.5" rx="1" />
        </svg>
      </button>
    </div>
  );
}
