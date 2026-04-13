import React from 'react';

export type ProjectWorkspaceActivityItem = {
  key: string;
  title: string;
  description: string;
};

type Props = {
  items: ProjectWorkspaceActivityItem[];
  onClickActivity?: (activityKey: string) => void;
};

export function ProjectWorkspaceActivityCardsBlock({ items, onClickActivity }: Props): JSX.Element {
  return (
    <section aria-label="Workspace activities" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onClickActivity?.(item.key)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
        >
          <p className="text-xl font-semibold text-slate-900">{item.title}</p>
          <p className="mt-1 text-xs text-slate-600">{item.description}</p>
        </button>
      ))}
    </section>
  );
}
