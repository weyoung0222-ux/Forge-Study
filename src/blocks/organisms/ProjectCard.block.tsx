import React from 'react';

import type { ProjectCardItem } from '../../data-spec/mocks/projectList.mock';

type Props = {
  item: ProjectCardItem;
  onClick?: (id: string) => void;
};

export function ProjectCardBlock({ item, onClick }: Props): JSX.Element {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(item.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') onClick?.(item.id);
      }}
      className={[
        'overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow',
        onClick ? 'cursor-pointer hover:shadow-sm' : 'cursor-default',
      ].join(' ')}
    >
      <div className="grid h-32 place-items-center bg-slate-100 text-sm text-slate-400">
        {item.thumbnailText}
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1.5">
          <h3 className="m-0 text-lg font-semibold text-slate-900">{item.title}</h3>
          <span className="rounded-full border border-slate-300 px-2 py-0.5 text-[11px] text-slate-600">
            {item.role}
          </span>
        </div>
        <p className="mb-0 mt-2.5 text-sm text-slate-600">{item.description}</p>
      </div>
    </article>
  );
}
