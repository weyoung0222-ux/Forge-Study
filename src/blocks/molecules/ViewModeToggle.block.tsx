import React from 'react';

import { AppstoreOutlined, UnorderedListOutlined } from '../../icons';

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
        <UnorderedListOutlined className="h-4 w-4" />
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
        <AppstoreOutlined className="h-4 w-4" />
      </button>
    </div>
  );
}
