import React from 'react';

import { WorkPageTemplateCanvasBlock, type WorkPageTemplateVariant } from './WorkPageTemplateCanvas.block';

type Props = {
  isOpen: boolean;
  title: string;
  variant: WorkPageTemplateVariant;
  onClose: () => void;
  onHistoryClick?: () => void;
};

export function WorkPageShellBlock({ isOpen, title, variant, onClose, onHistoryClick }: Props): JSX.Element | null {
  if (!isOpen) return null;

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-x-0 bottom-0 top-14 z-40 flex flex-col overflow-hidden border-t border-slate-200 bg-white"
    >
        <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
              aria-label="Close work page"
            >
              {'<'}
            </button>
            <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          </div>
          <button
            type="button"
            onClick={onHistoryClick}
            className="h-8 rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            History
          </button>
        </header>

        <div className="border-b border-slate-200 px-4 py-2 text-xs text-slate-600">
          <div className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-[10px] font-semibold text-white">1</span>
              Teleoperation
            </span>
            <span>-</span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-600">2</span>
              Validation
            </span>
            <span>-</span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-600">3</span>
              Save Datasets
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-100 p-4">
          <WorkPageTemplateCanvasBlock variant={variant} />
        </div>
    </section>
  );
}
