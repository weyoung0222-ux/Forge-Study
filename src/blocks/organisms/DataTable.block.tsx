import React from 'react';

export type DataTableColumn = {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
};

type Props = {
  columns: DataTableColumn[];
  rows: Array<Record<string, React.ReactNode>>;
  emptyText?: string;
  onRowClick?: (row: Record<string, React.ReactNode>, index: number) => void;
  selectedRowIndex?: number | null;
  /** Emphasize a row (e.g. newly created) on the current page */
  featuredRowIndex?: number | null;
};

const alignClass = (align: DataTableColumn['align']): string => {
  if (align === 'center') return 'text-center';
  if (align === 'right') return 'text-right';
  return 'text-left';
};

export function DataTableBlock({
  columns,
  rows,
  emptyText = 'No rows found.',
  onRowClick,
  selectedRowIndex = null,
  featuredRowIndex = null,
}: Props): JSX.Element {
  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={['px-3 py-2 text-xs font-semibold text-slate-600', alignClass(column.align)].join(' ')}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                role={onRowClick ? 'button' : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onClick={onRowClick ? () => onRowClick(row, idx) : undefined}
                onKeyDown={
                  onRowClick
                    ? (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          onRowClick(row, idx);
                        }
                      }
                    : undefined
                }
                className={[
                  'border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70',
                  onRowClick ? 'cursor-pointer' : '',
                  selectedRowIndex === idx ? 'bg-indigo-50/70' : '',
                  featuredRowIndex === idx
                    ? 'bg-amber-50 shadow-[inset_3px_0_0_0_rgb(245,158,11)] ring-1 ring-inset ring-amber-200/90'
                    : '',
                ].join(' ')}
              >
                {columns.map((column) => (
                  <td key={column.key} className={['px-3 py-2 text-xs text-slate-700', alignClass(column.align)].join(' ')}>
                    {row[column.key] ?? '-'}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-8 text-center text-sm text-slate-500">
                  {emptyText}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
