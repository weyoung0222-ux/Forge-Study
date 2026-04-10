import React from 'react';

type HeaderAction = {
  label: string;
  onClick: () => void;
};

type Props = {
  title: string;
  subtitle?: string;
  primaryAction?: HeaderAction;
};

export function ListHeaderBlock({ title, subtitle, primaryAction }: Props): JSX.Element {
  return (
    <section className="flex items-start justify-between gap-4">
      <div>
        <h1 className="m-0 text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
        {subtitle ? <p className="mt-1.5 text-sm text-slate-600">{subtitle}</p> : null}
      </div>
      {primaryAction ? (
        <button
          type="button"
          onClick={primaryAction.onClick}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          + {primaryAction.label}
        </button>
      ) : null}
    </section>
  );
}
