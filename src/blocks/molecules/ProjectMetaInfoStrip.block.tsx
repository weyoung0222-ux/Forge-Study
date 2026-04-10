import React from 'react';

export type ProjectMetaInfo = {
  label: string;
  value: string;
};

type Props = {
  items: ProjectMetaInfo[];
};

export function ProjectMetaInfoStripBlock({ items }: Props): JSX.Element {
  return (
    <div className="flex flex-wrap gap-5">
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className="text-xs">
          <p className="text-slate-500">{item.label}</p>
          <p className="font-medium text-slate-700">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
