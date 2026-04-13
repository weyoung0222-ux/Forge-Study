import React from 'react';

export type WorkPageTemplateVariant =
  | 'type1-parameter-preview'
  | 'type2-parameter-only'
  | 'type2-parameter-columns'
  | 'type3-validation-progress'
  | 'type3-validation-review'
  | 'type4-save-deploy';

type Props = {
  variant: WorkPageTemplateVariant;
};

const Panel = ({ className = 'h-24', label }: { className?: string; label: string }): JSX.Element => (
  <div className={['grid place-items-center rounded-md border border-slate-200 bg-slate-50 text-xs text-slate-500', className].join(' ')}>
    {label}
  </div>
);

export function WorkPageTemplateCanvasBlock({ variant }: Props): JSX.Element {
  if (variant === 'type1-parameter-preview') {
    return (
      <div className="grid gap-3 lg:grid-cols-[260px_minmax(0,1fr)]">
        <Panel className="h-[360px]" label="parameter input field" />
        <Panel className="h-[360px]" label="preview / content area" />
      </div>
    );
  }

  if (variant === 'type2-parameter-only') {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
          <section className="rounded-lg border border-slate-200 bg-white p-3">
            <p className="text-sm font-semibold text-slate-900">Register할 데이터셋 정보</p>
            <div className="mt-3 space-y-2">
              <label className="block text-xs text-slate-600">
                <span className="mb-1 block">Input (Mandatory)</span>
                <input className="h-9 w-full rounded-md border border-slate-300 px-3 text-sm" placeholder="Placeholder" />
              </label>
              <label className="block text-xs text-slate-600">
                <span className="mb-1 block">Input (Optional)</span>
                <input className="h-9 w-full rounded-md border border-slate-300 px-3 text-sm" placeholder="Enter Text" />
              </label>
              <label className="block text-xs text-slate-600">
                <span className="mb-1 block">Input (Big)</span>
                <textarea className="h-20 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Description..." />
              </label>
              <label className="block text-xs text-slate-600">
                <span className="mb-1 block">Dropdown (Mandatory)</span>
                <select className="h-9 w-full rounded-md border border-slate-300 px-3 text-sm">
                  <option>Choose Model</option>
                </select>
              </label>
              <label className="block text-xs text-slate-600">
                <span className="mb-1 block">Dropdown (Optional)</span>
                <select className="h-9 w-full rounded-md border border-slate-300 px-3 text-sm">
                  <option>Choose Model</option>
                </select>
              </label>
              <div>
                <p className="mb-1 text-xs text-slate-600">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {['tag1', 'tag2', 'tag3', 'tag4'].map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-300 bg-slate-50 px-2 py-0.5 text-[10px] text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <input className="h-9 w-full rounded-md border border-slate-300 px-3 text-sm" placeholder="Placeholder" />
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-3">
            <p className="text-sm font-semibold text-slate-900">파일 업로드 설정</p>
            <div className="mt-3 space-y-2">
              <div className="grid h-44 place-items-center rounded-md border border-dashed border-slate-300 bg-slate-50 text-center text-sm text-slate-600">
                <div>
                  <p>Drag and Drop,</p>
                  <p>or select from your local computer.</p>
                  <button className="mt-3 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">File Upload</button>
                </div>
              </div>
              <label className="block text-xs text-slate-600">
                <span className="mb-1 block">Text Prompt</span>
                <textarea className="h-24 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Description..." />
              </label>
            </div>
          </section>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button className="h-8 rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-700">Previous</button>
          <button className="h-8 rounded-md bg-slate-900 px-3 text-xs font-semibold text-white">Register</button>
        </div>
      </div>
    );
  }

  if (variant === 'type2-parameter-columns') {
    return (
      <div className="grid gap-3 md:grid-cols-3">
        <Panel className="h-[360px]" label="parameter column A" />
        <Panel className="h-[360px]" label="parameter column B" />
        <Panel className="h-[360px]" label="parameter column C" />
      </div>
    );
  }

  if (variant === 'type3-validation-progress') {
    return (
      <div className="grid gap-3">
        <Panel className="h-12" label="validation info / status" />
        <div className="grid gap-3 md:grid-cols-3">
          <Panel className="h-12" label="validation status card" />
          <Panel className="h-12" label="validation status card" />
          <Panel className="h-12" label="validation status card" />
        </div>
        <Panel className="h-[280px]" label="episode / trajectory table" />
      </div>
    );
  }

  if (variant === 'type3-validation-review') {
    return (
      <div className="grid gap-3">
        <div className="grid gap-3 md:grid-cols-3">
          <Panel className="h-12" label="save defaults button area" />
          <Panel className="h-12" label="validation status card" />
          <Panel className="h-12" label="manual actions area" />
        </div>
        <Panel className="h-[320px]" label="episode / trajectory table (review)" />
      </div>
    );
  }

  return (
    <div className="grid gap-3 lg:grid-cols-[260px_minmax(0,1fr)]">
      <Panel className="h-[360px]" label="parameter input field" />
      <div className="grid gap-3">
        <Panel className="h-16" label="save/deploy completion notice" />
        <Panel className="h-[280px]" label="dataset/model deploy summary" />
      </div>
    </div>
  );
}
