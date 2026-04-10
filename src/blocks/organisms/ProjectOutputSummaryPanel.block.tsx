import React from 'react';

type Metric = {
  label: string;
  value: string;
  delta: string;
};

type Props = {
  title: string;
  metrics: Metric[];
};

export function ProjectOutputSummaryPanelBlock({ title, metrics }: Props): JSX.Element {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-3">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 space-y-2">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-md border border-slate-200 bg-white p-3">
            <p className="text-xs text-slate-500">{metric.label}</p>
            <p className="mt-1 text-3xl font-semibold text-slate-900">{metric.value}</p>
            <p className="mt-1 text-[11px] text-slate-500">{metric.delta}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
