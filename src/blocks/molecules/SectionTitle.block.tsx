import React from 'react';

type Props = {
  title: string;
  count?: number;
  countLabel?: string;
};

export function SectionTitleBlock({ title, count, countLabel = 'items' }: Props): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      {typeof count === 'number' ? (
        <span className="rounded-full border border-slate-300 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
          {count.toLocaleString()} {countLabel}
        </span>
      ) : null}
    </div>
  );
}
