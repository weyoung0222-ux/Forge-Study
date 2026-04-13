import React from 'react';

type Props = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  totalLabel?: string;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
};

const createPageItems = (current: number, total: number): Array<number | 'ellipsis'> => {
  const maxVisiblePages = 3;

  if (total <= maxVisiblePages) {
    return Array.from({ length: total }, (_, idx) => idx + 1);
  }

  let start = Math.max(1, current - 4);
  let end = Math.min(total, start + maxVisiblePages - 1);
  start = Math.max(1, end - maxVisiblePages + 1);

  const items: Array<number | 'ellipsis'> = [];

  if (start > 1) {
    items.push(1);
    if (start > 2) items.push('ellipsis');
  }

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (end < total) {
    if (end < total - 1) items.push('ellipsis');
    items.push(total);
  }

  return items;
};

export function TablePaginationBlock({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  totalLabel,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}: Props): JSX.Element {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const pageItems = createPageItems(safePage, totalPages);
  const buttonBaseClass =
    'inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-700 hover:bg-slate-50';

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-0 py-2">
      <p className="text-sm text-slate-700">{totalLabel ?? `Total ${totalItems.toLocaleString()}건`}</p>

      <div className="inline-flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={safePage <= 1}
            className={[
              buttonBaseClass,
              safePage <= 1 ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-300' : '',
            ].join(' ')}
            aria-label="First page"
          >
            {'<<'}
          </button>
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, safePage - 1))}
            disabled={safePage <= 1}
            className={[
              buttonBaseClass,
              safePage <= 1 ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-300' : '',
            ].join(' ')}
            aria-label="Previous page"
          >
            {'<'}
          </button>

          {pageItems.map((item, idx) =>
            item === 'ellipsis' ? (
              <span key={`ellipsis-${idx}`} className="inline-flex h-9 min-w-6 items-center justify-center px-1 text-xs text-slate-400">
                ...
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                className={[
                  buttonBaseClass,
                  safePage === item
                    ? 'border-emerald-200 bg-emerald-100 font-semibold text-emerald-700'
                    : '',
                ].join(' ')}
              >
                {item}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
            disabled={safePage >= totalPages}
            className={[
              buttonBaseClass,
              safePage >= totalPages ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-300' : '',
            ].join(' ')}
            aria-label="Next page"
          >
            {'>'}
          </button>
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={safePage >= totalPages}
            className={[
              buttonBaseClass,
              safePage >= totalPages ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-300' : '',
            ].join(' ')}
            aria-label="Last page"
          >
            {'>>'}
          </button>
      </div>

      <div className="ml-auto flex items-center gap-2">
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange?.(Number(event.target.value))}
            disabled={!onPageSizeChange}
            className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700 disabled:bg-slate-100 disabled:text-slate-400"
            aria-label="Rows per page"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-sm text-slate-700">Per page</span>
      </div>
    </div>
  );
}
