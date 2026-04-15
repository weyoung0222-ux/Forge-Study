import React from 'react';

import { CloseOutlined } from '../../icons';

export type ScreenDescriptionItem = {
  number: number;
  label: string;
  key: string;
  title: string;
  description: string;
  bullets?: string[];
};

type Props = {
  isOpen: boolean;
  title: string;
  summary: string;
  items: ScreenDescriptionItem[];
  onClose: () => void;
  onItemEnter?: (itemKey: string, number: number) => void;
  onItemLeave?: () => void;
  guideText?: string;
};

export function ScreenDescriptionPanelBlock({
  isOpen,
  title,
  summary,
  items,
  onClose,
  onItemEnter,
  onItemLeave,
  guideText,
}: Props): JSX.Element | null {
  if (!isOpen) return null;

  return (
    <aside className="fixed right-4 top-20 z-40 h-[calc(100vh-6rem)] w-[92vw] max-w-[420px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          aria-label="기획 패널 닫기"
        >
          <CloseOutlined className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3 text-sm text-slate-700">
        <p>{summary}</p>

        <div className="grid gap-3">
          {items.map((item) => (
            <section
              key={`${item.number}-${item.key}`}
              className="rounded-md border border-slate-200 bg-slate-50 p-3 transition hover:border-indigo-300"
              onMouseEnter={() => onItemEnter?.(item.key, item.number)}
              onMouseLeave={() => onItemLeave?.()}
            >
              <div className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-2">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white">
                  {item.number}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-700">{item.description}</p>
                  {item.bullets?.length ? (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="rounded-md border border-slate-200 bg-white p-3">
          <p className="text-xs font-semibold text-slate-700">가이드</p>
          <p className="mt-1 text-xs text-slate-600">
            {guideText ?? 'Description 버튼으로 화면별 기획 설명을 우측 패널에서 확인합니다.'}
          </p>
        </section>
      </div>
    </aside>
  );
}
