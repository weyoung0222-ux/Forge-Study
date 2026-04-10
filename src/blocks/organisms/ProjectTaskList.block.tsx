import React from 'react';

export type ProjectTaskItem = {
  id: string;
  title: string;
  tag: string;
  description: string;
  dueDate: string;
  priority: string;
  actionLabel?: string;
};

type Props = {
  title: string;
  items: ProjectTaskItem[];
};

export function ProjectTaskListBlock({ title, items }: Props): JSX.Element {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-3">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-md border border-slate-200 bg-white p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.title} <span className="text-[11px] font-medium text-slate-500">({item.tag})</span>
                </p>
                <p className="mt-1 text-xs text-slate-600">{item.description}</p>
              </div>
              <button className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50">
                {item.actionLabel ?? 'Run'}
              </button>
            </div>
            <div className="mt-2 flex gap-2 text-[11px] text-slate-500">
              <span>{item.dueDate}</span>
              <span>{'·'}</span>
              <span>{item.priority}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
