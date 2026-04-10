import React from 'react';

export type ProjectSelectorCardItem = {
  id: string;
  name: string;
  applicableModel: string;
  fineTuningModels: string;
  relatedDatasets: string;
  imageLabel?: string;
};

type Props = {
  item: ProjectSelectorCardItem;
  selected?: boolean;
  onClick?: () => void;
};

export function ProjectSelectorCardBlock({ item, selected = false, onClick }: Props): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full overflow-hidden rounded-lg border bg-white text-left transition',
        selected
          ? 'border-slate-900 ring-2 ring-slate-900/10'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-sm',
      ].join(' ')}
    >
      <div className="grid h-24 place-items-center bg-slate-100 text-sm text-slate-400">{item.imageLabel ?? 'image'}</div>
      <div className="p-3">
        <p className="text-lg font-semibold text-slate-900">{item.name}</p>
        <div className="mt-2 space-y-1 text-xs text-slate-600">
          <p>
            Applicable RFM Models <span className="ml-1.5 text-slate-800">{item.applicableModel}</span>
          </p>
          <p>
            Fine-tuning Models <span className="ml-1.5 text-slate-800">{item.fineTuningModels}</span>
          </p>
          <p>
            Related Datasets <span className="ml-1.5 text-slate-800">{item.relatedDatasets}</span>
          </p>
        </div>
      </div>
    </button>
  );
}
