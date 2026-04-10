import React from 'react';

type Props = {
  title: string;
  robotName: string;
  lines: string[];
};

export function ProjectRobotInfoPanelBlock({ title, robotName, lines }: Props): JSX.Element {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-3">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 grid grid-cols-[96px_minmax(0,1fr)] gap-3">
        <div className="grid h-28 place-items-center rounded-md border border-slate-200 bg-slate-50 text-slate-400">image</div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{robotName}</p>
          <div className="mt-1 space-y-1 text-xs text-slate-600">
            {lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
