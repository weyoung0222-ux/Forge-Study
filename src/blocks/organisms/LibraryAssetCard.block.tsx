import React from 'react';

import type { LibraryAssetItem } from '../../data-spec/mocks/libraryAssets.mock';

type Props = {
  item: LibraryAssetItem;
  highlightPart?: 'card' | 'title' | 'source' | 'meta';
  highlightNumber?: number | null;
};

function clampText(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}…`;
}

export function LibraryAssetCardBlock({ item, highlightPart, highlightNumber }: Props): JSX.Element {
  const title = clampText(item.outputName, 28);

  return (
    <article
      className={[
        'relative rounded-md border border-slate-200 bg-white px-3 py-2',
        highlightPart === 'card' ? 'ring-2 ring-indigo-400 ring-offset-2' : '',
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
            {`{${title}}`}
          </h3>
          <p className="mt-0.5 text-xs text-slate-600">{`(${item.workDescription})`}</p>
        </div>
        <span
          className={[
            'rounded-full border border-slate-300 px-2 py-0.5 text-[11px] text-slate-600',
            highlightPart === 'source' ? 'bg-indigo-100 ring-1 ring-indigo-300' : '',
          ].join(' ')}
        >
          {highlightPart === 'source' && highlightNumber ? (
            <span className="mr-1 rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              {highlightNumber}
            </span>
          ) : null}
          {`{${item.sourceLabel}}`}
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
        <span>{`Project Name`}</span>
        <span>{`•`}</span>
        <span>{item.fileSize}</span>
        <span>{`•`}</span>
        <span>{item.createdLabel}</span>
      </div>
    </article>
  );
}
