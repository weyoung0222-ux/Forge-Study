import React from 'react';

export type ProjectInfoListItem = {
  id: string;
  title: string;
  subtitle: string;
  meta?: string;
  badge?: string;
};

type Props = {
  title: string;
  items: ProjectInfoListItem[];
};

export function ProjectInfoListPanelBlock({ title, items }: Props): JSX.Element {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-3">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-md border border-slate-200 bg-white p-2.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-600">{item.subtitle}</p>
                {item.meta ? <p className="mt-1 text-[11px] text-slate-500">{item.meta}</p> : null}
              </div>
              {item.badge ? (
                <span className="rounded-full border border-slate-300 px-2 py-0.5 text-[10px] text-slate-600">{item.badge}</span>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
