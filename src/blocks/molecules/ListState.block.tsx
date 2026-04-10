import React from 'react';

type Props = {
  kind: 'empty' | 'error' | 'loading';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function ListStateBlock({ kind, title, description, actionLabel, onAction }: Props): JSX.Element {
  return (
    <section aria-live="polite" className="rounded-lg border border-slate-200 p-5 text-center text-slate-700">
      <strong className="mb-2 block text-xs font-semibold tracking-wide text-slate-500">{kind.toUpperCase()}</strong>
      <h3 className="m-0 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-3 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}
