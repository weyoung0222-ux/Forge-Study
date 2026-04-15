import React from 'react';

import type { RobotPickerOption } from '../../data-spec/mocks/projectCreateRobots.mock';

type Props = {
  option: RobotPickerOption;
  selected: boolean;
  onSelect: (id: string) => void;
};

/** Create Project 플로우용 로봇 선택 카드: hover 시 스펙 면 전환, 선택 시 스펙 면 고정 */
export function RobotSelectCardBlock({ option, selected, onSelect }: Props): JSX.Element {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      className={[
        'group relative h-40 w-full overflow-hidden rounded-xl border bg-white text-left shadow-sm transition',
        selected ? 'border-indigo-500 ring-2 ring-indigo-400 ring-offset-2' : 'border-slate-200 hover:border-slate-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
      ].join(' ')}
      aria-pressed={selected}
      aria-label={`Select robot ${option.name}`}
    >
      {/* 앞면: 이름 + 썸네일 플레이스홀더 */}
      <div
        className={[
          'absolute inset-0 flex flex-col p-3 transition-opacity duration-300',
          selected ? 'opacity-0' : 'opacity-100 group-hover:opacity-0',
        ].join(' ')}
      >
        <div className="flex items-start justify-between gap-1">
          <span className="pr-6 text-left text-xs font-semibold leading-tight text-slate-900">{option.name}</span>
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 text-[10px] font-bold text-slate-500"
            title="Info"
            aria-hidden
          >
            i
          </span>
        </div>
        <div className="mt-auto flex flex-1 items-center justify-center">
          <div
            className={[
              'flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br text-3xl shadow-inner',
              option.previewTone,
            ].join(' ')}
            aria-hidden
          >
            🤖
          </div>
        </div>
      </div>

      {/* 뒷면: 스펙 (hover 또는 선택 시) */}
      <div
        className={[
          'absolute inset-0 flex flex-col justify-center bg-[#4A4A4A] px-3 py-2 text-white transition-opacity duration-300',
          selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        ].join(' ')}
      >
        <p className="text-sm font-bold leading-tight">{option.name}</p>
        <dl className="mt-2 space-y-1.5 text-[11px] leading-snug text-slate-200">
          <div>
            <dt className="text-slate-400">Applicable RFM Models</dt>
            <dd className="font-medium text-white">{option.rfmModels}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Fine-tuning Models</dt>
            <dd className="font-medium text-white">{option.fineTuningModelCount} Models</dd>
          </div>
          <div>
            <dt className="text-slate-400">Related Datasets</dt>
            <dd className="font-medium text-white">{option.relatedDatasetCount.toLocaleString()} Datasets</dd>
          </div>
        </dl>
      </div>
    </button>
  );
}
