import React from 'react';

import { chipCardSourceLabelClasses } from '../styles/chipClasses';
import type { LibraryAssetItem } from '../../data-spec/mocks/libraryAssets.mock';

type Props = {
  item: LibraryAssetItem;
  highlightPart?: 'card' | 'title' | 'source' | 'meta';
  highlightNumber?: number | null;
  /** 선택(목록에서 라우트 state로 복귀 시 강조) */
  isSelected?: boolean;
  onSelect?: (item: LibraryAssetItem) => void;
};

function clampText(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}…`;
}

export function LibraryAssetCardBlock({
  item,
  highlightPart,
  highlightNumber,
  isSelected = false,
  onSelect,
}: Props): JSX.Element {
  const title = clampText(item.outputName, 28);

  const cardRing =
    highlightPart === 'card'
      ? 'ring-2 ring-indigo-400 ring-offset-2'
      : isSelected
        ? 'border-indigo-400 ring-2 ring-indigo-500 ring-offset-1 shadow-sm'
        : 'border-slate-200';

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      className={[
        'relative w-full rounded-md border bg-white px-3 py-2 text-left transition',
        cardRing,
        'hover:border-slate-300 hover:bg-slate-50/90 hover:shadow-md',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
        onSelect ? 'cursor-pointer' : 'cursor-default',
      ].join(' ')}
    >
      {highlightPart === 'card' && highlightNumber ? (
        <span className="absolute -left-2 -top-2 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white">
          {highlightNumber}
        </span>
      ) : null}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3
            className={[
              'text-sm font-semibold text-slate-900',
              highlightPart === 'title' ? 'rounded-sm bg-indigo-100 px-1 ring-1 ring-indigo-300' : '',
            ].join(' ')}
            title={item.outputName}
          >
            {highlightPart === 'title' && highlightNumber ? (
              <span className="mr-1 rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {highlightNumber}
              </span>
            ) : null}
            {title}
          </h3>
          <p className="mt-0.5 text-xs text-slate-600">{`(${item.workDescription})`}</p>
        </div>
        <span
          className={[
            chipCardSourceLabelClasses,
            highlightPart === 'source' ? 'bg-indigo-100 ring-1 ring-indigo-300' : '',
          ].join(' ')}
        >
          {highlightPart === 'source' && highlightNumber ? (
            <span className="mr-1 rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              {highlightNumber}
            </span>
          ) : null}
          {item.sourceLabel}
        </span>
      </div>

      <div
        className={[
          'mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500',
          highlightPart === 'meta' ? 'rounded-sm bg-indigo-100 px-1 py-0.5 ring-1 ring-indigo-300' : '',
        ].join(' ')}
      >
        {highlightPart === 'meta' && highlightNumber ? (
          <span className="rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">{highlightNumber}</span>
        ) : null}
        <span>Project Name</span>
        <span>{`•`}</span>
        <span>{item.fileSize}</span>
        <span>{`•`}</span>
        <span>{item.createdLabel}</span>
      </div>
    </button>
  );
}
