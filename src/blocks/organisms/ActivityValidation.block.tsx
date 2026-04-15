import React from 'react';

import { DEFAULT_PREPROCESSOR_RECORD_COUNT } from '../../data-spec/mocks/activityWorkflowCounts.mock';
import { useLanguage } from '../../context/LanguageContext';
import { uiTitleCase } from '../../utils/titleCase';
import { OverlayDialogBlock } from '../molecules/OverlayDialog.block';
import { buttonPrimarySmClasses, buttonSecondarySmClasses } from '../styles/buttonClasses';

export type PreprocessorPhase = 'idle' | 'running' | 'complete';

/** 라우트 연결 시 사용할 비디오 상세 path 패턴 (projectId·recordId는 실제 값으로 치환) */
export const ACTIVITY_PREPROCESSOR_VIDEO_DETAIL_PATH_PATTERN =
  '/projects/:projectId/workspace/pre-processor/videos/:recordId';

export function activityPreprocessorVideoDetailPath(recordId: string, projectId: string = ':projectId'): string {
  return `/projects/${projectId}/workspace/pre-processor/videos/${encodeURIComponent(recordId)}`;
}

type Props = {
  /** Shown in status line, e.g. dataset name */
  datasetName?: string;
  onPrevious: () => void;
  /** Unlocks next workflow step (Save) */
  onApplyPreprocessorResult: () => void;
  /** Skip pre-processing and go straight to Save dataset (step 3). */
  onSkipPreprocessor?: () => void;
  /**
   * Table row count / progress denominator (Register: 20, Collect: 5).
   * Mirrors `getPreprocessorRecordCountForActivity` in the workspace shell.
   */
  preprocessorRecordCount?: number;
};

/** ~10 : 5 : 5 비율을 유지하며 길이만 조정 — order is randomized when a run starts */
function shuffleOutcomesForCount(count: number): Array<'success' | 'warn' | 'fail'> {
  if (count <= 0) return [];
  const nSuccess = Math.max(0, Math.floor((count * 10) / 20));
  const nWarn = Math.max(0, Math.floor((count * 5) / 20));
  let nFail = count - nSuccess - nWarn;
  if (nFail < 0) nFail = 0;
  const arr: Array<'success' | 'warn' | 'fail'> = [
    ...Array.from({ length: nSuccess }, () => 'success' as const),
    ...Array.from({ length: nWarn }, () => 'warn' as const),
    ...Array.from({ length: nFail }, () => 'fail' as const),
  ];
  while (arr.length < count) arr.push('success');
  while (arr.length > count) arr.pop();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
  return arr;
}

const WARN_ISSUE_EXAMPLES = [
  'Gripper slip detected near waypoint 3; trajectory may need re-recording in low-light segments.',
  'Temporal alignment drift between RGB and depth streams exceeds threshold for two frames.',
  'Joint velocity spike exceeds safe envelope for 120ms; review teleop smoothing.',
  'Depth dropout on left camera for 4 frames; fusion confidence below threshold.',
  'Wrist torque anomaly at segment boundary; possible calibration drift.',
  'Segment duration shorter than policy minimum; label boundary may be misaligned.',
  'Object mesh collision margin below 2mm in sim replay; verify grasp clearance.',
  'RGB–depth extrinsic residual above nominal; consider recalibration.',
  'Repeated micro-stutters in trajectory timestamps; check capture clock sync.',
  'Workspace occupancy spike near shelf edge; operator visibility may be occluded.',
] as const;

const FAIL_ISSUE_EXAMPLES = [
  'Hard safety stop triggered during playback; trajectory invalid for deployment.',
  'Missing depth frames exceed 10% of clip; pre-processor cannot certify motion.',
  'Kinematic limit violation on shoulder pitch; motion out of allowed workspace.',
  'Grasp score below minimum for all candidate poses; pick failure.',
  'Simulation–real gap on contact impulse; policy output not reproducible.',
  'Encoder dropout detected on joint 4; sequence discarded.',
  'Scene mesh version mismatch vs capture manifest; cannot replay.',
  'Operator override during labeled segment; labels marked unreliable.',
  'Lighting below minimum lux for vision stack; fail per policy.',
  'Trajectory crosses restricted zone polygon; compliance failure.',
] as const;

function buildIssueTexts(outcomes: Array<'success' | 'warn' | 'fail'>): string[] {
  let wi = 0;
  let fi = 0;
  return outcomes.map((o) => {
    if (o === 'success') return '';
    if (o === 'warn') {
      const t = WARN_ISSUE_EXAMPLES[wi % WARN_ISSUE_EXAMPLES.length];
      wi += 1;
      return t;
    }
    const t = FAIL_ISSUE_EXAMPLES[fi % FAIL_ISSUE_EXAMPLES.length];
    fi += 1;
    return t;
  });
}

type RowModel = {
  slotIndex: number;
  id: string;
  recordId: string;
  timestamp: string;
};

function buildBaseRows(totalRecords: number): RowModel[] {
  return Array.from({ length: totalRecords }, (_, i) => {
    const n = i + 1;
    const slotIndex = i;
    const id = `row-${n}`;
    return {
      slotIndex,
      id,
      recordId: `REC-${String(n).padStart(4, '0')}`,
      timestamp: `2026-04-14 ${String(9 + Math.floor(i / 20)).padStart(2, '0')}:${String((i * 3) % 60).padStart(2, '0')}:00`,
    };
  });
}

function issueCellText(
  slotIndex: number,
  st: 'pending' | 'warn' | 'fail' | 'success' | 'validating',
  issueTextsBySlot: string[],
): string {
  if (st === 'pending' || st === 'validating') return '—';
  if (st === 'success') return '';
  return issueTextsBySlot[slotIndex] ?? '';
}

function StatusCell({ kind }: { kind: 'pending' | 'warn' | 'fail' | 'success' | 'validating' }): JSX.Element {
  const dot =
    kind === 'warn'
      ? 'bg-amber-400'
      : kind === 'fail'
        ? 'bg-red-500'
        : kind === 'success'
          ? 'bg-emerald-500'
          : kind === 'validating'
            ? 'bg-slate-300'
            : 'bg-slate-200';
  const label =
    kind === 'pending'
      ? 'Pending'
      : kind === 'validating'
        ? 'Processing'
        : kind === 'success'
          ? 'Success'
          : kind === 'warn'
            ? 'Warn'
            : 'Fail';
  return (
    <span className="inline-flex items-center gap-1.5">
      {kind === 'validating' ? (
        <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" aria-hidden />
      ) : (
        <span className={['inline-block h-2 w-2 shrink-0 rounded-full', dot].join(' ')} aria-hidden />
      )}
      <span>{label}</span>
    </span>
  );
}

/** 프로그레스 전·후 동일한 시각 블록 래퍼 */
function ActionStripBlock({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-100/90 p-3 shadow-[inset_0_1px_0_0_rgb(241,245,249)]">
      <div className="flex min-h-[3.25rem] flex-col gap-3 md:flex-row md:items-center md:justify-between">{children}</div>
    </div>
  );
}

export function ActivityValidationBlock({
  datasetName = '{Created Data Set Name}',
  onPrevious,
  onApplyPreprocessorResult,
  onSkipPreprocessor,
  preprocessorRecordCount = DEFAULT_PREPROCESSOR_RECORD_COUNT,
}: Props): JSX.Element {
  const { t, locale } = useLanguage();
  const [phase, setPhase] = React.useState<PreprocessorPhase>('idle');
  /** running 동안 이미 끝난 레코드 수. 한 행씩만 validating 상태로 두어 전환을 눈에 띄게 함 */
  const [completedRecords, setCompletedRecords] = React.useState(0);
  const [rows, setRows] = React.useState<RowModel[]>(() => buildBaseRows(preprocessorRecordCount));
  const [outcomePlan, setOutcomePlan] = React.useState<Array<'success' | 'warn' | 'fail'> | null>(null);
  const [outcomesBySlot, setOutcomesBySlot] = React.useState<Array<'success' | 'warn' | 'fail' | null>>(
    () => Array.from({ length: preprocessorRecordCount }, () => null),
  );
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(() => new Set());
  const [videoPopupRecordId, setVideoPopupRecordId] = React.useState<string | null>(null);

  const issueTextsBySlot = React.useMemo(() => (outcomePlan ? buildIssueTexts(outcomePlan) : []), [outcomePlan]);

  /** 진행 n/N 의 N — 테이블 행 수와 동일 */
  const runDenominator = preprocessorRecordCount;

  /** 레코드 하나를 처리하는 간격(ms). pending → validating → success 전환이 빠르게 지나가지 않도록 충분히 길게 */
  const MS_PER_RECORD = 420;

  React.useEffect(() => {
    if (phase !== 'running') return;
    const id = window.setInterval(() => {
      setCompletedRecords((c) => (c >= preprocessorRecordCount ? c : c + 1));
    }, MS_PER_RECORD);
    return () => window.clearInterval(id);
  }, [phase, preprocessorRecordCount]);

  React.useEffect(() => {
    if (phase !== 'running' || completedRecords < preprocessorRecordCount || !outcomePlan) return;
    setOutcomesBySlot([...outcomePlan]);
    setPhase('complete');
  }, [completedRecords, phase, outcomePlan, preprocessorRecordCount]);

  React.useEffect(() => {
    setPhase('idle');
    setCompletedRecords(0);
    setRows(buildBaseRows(preprocessorRecordCount));
    setOutcomePlan(null);
    setOutcomesBySlot(Array.from({ length: preprocessorRecordCount }, () => null));
    setSelectedIds(new Set());
  }, [preprocessorRecordCount]);

  const displayStatus = (slotIndex: number): 'pending' | 'warn' | 'fail' | 'success' | 'validating' => {
    if (phase === 'complete') {
      const o = outcomesBySlot[slotIndex];
      if (o === 'success') return 'success';
      if (o === 'warn') return 'warn';
      return 'fail';
    }
    if (phase === 'idle') return 'pending';
    if (!outcomePlan) return 'pending';
    if (slotIndex < completedRecords) {
      const o = outcomePlan[slotIndex];
      if (o === 'success') return 'success';
      if (o === 'warn') return 'warn';
      return 'fail';
    }
    if (slotIndex === completedRecords && completedRecords < runDenominator) return 'validating';
    return 'pending';
  };

  const passedCount =
    phase === 'complete' ? rows.filter((r) => outcomesBySlot[r.slotIndex] === 'success').length : null;
  const failedCount =
    phase === 'complete' ? rows.filter((r) => outcomesBySlot[r.slotIndex] === 'fail').length : null;
  const warnedCount =
    phase === 'complete' ? rows.filter((r) => outcomesBySlot[r.slotIndex] === 'warn').length : null;

  const toggleRow = (id: string): void => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = (): void => {
    if (selectedIds.size === rows.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(rows.map((r) => r.id)));
    }
  };

  const handleDeleteSelected = (): void => {
    if (selectedIds.size === 0) return;
    setRows((prev) => prev.filter((r) => !selectedIds.has(r.id)));
    setSelectedIds(new Set());
  };

  const handleDeleteFailed = (): void => {
    if (phase !== 'complete') return;
    setRows((prev) => prev.filter((r) => outcomesBySlot[r.slotIndex] !== 'fail'));
  };

  const handleRerunPreprocessor = (): void => {
    setPhase('idle');
    setCompletedRecords(0);
    setOutcomePlan(null);
    setRows(buildBaseRows(preprocessorRecordCount));
    setOutcomesBySlot(Array.from({ length: preprocessorRecordCount }, () => null));
    setSelectedIds(new Set());
  };

  const showProgressStrip = phase === 'idle' || phase === 'running';
  const currentCount = phase === 'running' ? completedRecords : 0;
  const progressPercent =
    phase === 'idle' ? 0 : phase === 'running' ? (completedRecords / runDenominator) * 100 : 100;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Pre-processor</h2>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: 'Total Records', value: String(rows.length) },
            { label: 'Passed Records', value: passedCount !== null ? String(passedCount) : '—' },
            { label: 'Failed Records', value: failedCount !== null ? String(failedCount) : '—' },
            { label: 'Warned Records', value: warnedCount !== null ? String(warnedCount) : '—' },
          ].map((card) => (
            <div key={card.label} className="rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-3">
              <p className="text-xs font-medium text-slate-600">{card.label}</p>
              <p className="mt-1 text-xl font-bold tabular-nums text-slate-900">{card.value}</p>
            </div>
          ))}
        </div>

        {showProgressStrip ? (
          <div className="mt-4">
            <ActionStripBlock>
              <div className="flex min-w-0 items-start gap-2 md:max-w-[40%]">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-lg shadow-sm" aria-hidden>
                  🤖
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">AI pre-processing videos…</p>
                  <p className="text-xs text-slate-600">
                    {phase === 'running' ? 'Analyzing motion…' : 'Ready to start pre-processing.'}
                  </p>
                </div>
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-3 md:px-2">
                <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-slate-700 transition-[width] duration-300 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="w-20 shrink-0 text-right text-xs font-medium tabular-nums text-slate-700">
                  {phase === 'running' ? `${currentCount} / ${runDenominator}` : `0 / ${runDenominator}`}
                </span>
              </div>
              <button
                type="button"
                disabled={phase === 'running'}
                onClick={() => {
                  setOutcomePlan(shuffleOutcomesForCount(preprocessorRecordCount));
                  setCompletedRecords(0);
                  setPhase('running');
                }}
                aria-busy={phase === 'running'}
                className={[buttonPrimarySmClasses, 'shrink-0 px-4 disabled:opacity-70'].join(' ')}
              >
                {uiTitleCase('start pre-processor', locale)}
              </button>
            </ActionStripBlock>
          </div>
        ) : (
          <div className="mt-4">
            <ActionStripBlock>
              <p className="min-w-0 flex-1 text-sm text-slate-800">
                <span className="font-semibold text-slate-900">{datasetName}</span> has been created.
              </p>
              <div className="flex flex-shrink-0 flex-wrap items-center justify-end gap-2 md:max-w-[55%]">
                <button type="button" onClick={handleDeleteSelected} className={buttonSecondarySmClasses}>
                  {uiTitleCase('delete selected', locale)}
                </button>
                <button type="button" onClick={handleDeleteFailed} className={buttonSecondarySmClasses}>
                  {uiTitleCase('delete failed', locale)}
                </button>
                <button type="button" onClick={handleRerunPreprocessor} className={buttonPrimarySmClasses}>
                  {uiTitleCase('re-run pre-processor', locale)}
                </button>
              </div>
            </ActionStripBlock>
          </div>
        )}

        <p className="mt-4 text-sm text-slate-700">
          {phase === 'complete' ? (
            <>Review results below. Use row actions or the toolbar to clean up before applying.</>
          ) : phase === 'running' ? (
            <>
              <span className="font-medium text-slate-900">{datasetName}</span> is now pre-processing ({currentCount} /{' '}
              {runDenominator} records).
            </>
          ) : (
            <>
              <span className="font-medium text-slate-900">{rows.length}</span> records loaded. Start pre-processor to compute pass / warn /
              fail.
            </>
          )}
        </p>

        <div className="mt-4 overflow-hidden rounded-md border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed border-collapse text-xs">
              <colgroup>
                <col className="w-10" />
                <col className="w-[7.5rem]" />
                <col className="w-[9.5rem]" />
                <col className="w-24" />
                <col className="w-28" />
                <col className="min-w-[18rem]" />
              </colgroup>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-2 py-2 text-center" scope="col">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300"
                      checked={rows.length > 0 && selectedIds.size === rows.length}
                      onChange={toggleAll}
                      aria-label="Select all rows"
                    />
                  </th>
                  <th className="px-2 py-2 text-left font-semibold text-slate-600">Record ID</th>
                  <th className="px-2 py-2 text-left font-semibold text-slate-600">Timestamp</th>
                  <th className="px-2 py-2 text-center font-semibold text-slate-600">Video</th>
                  <th className="px-2 py-2 text-center font-semibold text-slate-600">Status</th>
                  <th className="px-3 py-2 text-left font-semibold text-slate-600">Issue</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const st = displayStatus(row.slotIndex);
                  const isActiveRow = st === 'validating';
                  return (
                    <tr
                      key={row.id}
                      className={[
                        'border-b border-slate-100 transition-colors duration-300 last:border-b-0',
                        isActiveRow
                          ? 'bg-indigo-50 shadow-[inset_3px_0_0_0_rgb(79,70,229)] ring-1 ring-inset ring-indigo-200/90'
                          : '',
                      ].join(' ')}
                      aria-current={isActiveRow ? 'true' : undefined}
                    >
                      <td className="px-2 py-2 text-center">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300"
                          checked={selectedIds.has(row.id)}
                          onChange={() => toggleRow(row.id)}
                          aria-label={`Select ${row.recordId}`}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-2 py-2 font-medium text-slate-800">{row.recordId}</td>
                      <td className="px-2 py-2 text-slate-700">{row.timestamp}</td>
                      <td className="px-2 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => setVideoPopupRecordId(row.recordId)}
                          className={[
                            buttonSecondarySmClasses,
                            'mx-auto min-w-[3.5rem] border-slate-200 bg-slate-100 px-2 text-[10px] hover:bg-slate-200',
                          ].join(' ')}
                          aria-label={`Open video preview for ${row.recordId}`}
                        >
                          {uiTitleCase('video', locale)}
                        </button>
                      </td>
                      <td className="px-2 py-2 text-center">
                        <StatusCell kind={st} />
                      </td>
                      <td className="break-words px-3 py-2 text-left leading-snug text-slate-700">
                        {issueCellText(row.slotIndex, st, issueTextsBySlot)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <button type="button" onClick={onPrevious} className={[buttonSecondarySmClasses, 'px-4'].join(' ')}>
          {uiTitleCase('previous', locale)}
        </button>
        <div className="flex flex-wrap items-center justify-end gap-2">
          {onSkipPreprocessor ? (
            <button type="button" onClick={onSkipPreprocessor} className={[buttonSecondarySmClasses, 'px-4'].join(' ')}>
              {uiTitleCase(t('activity.preprocessor.skip'), locale)}
            </button>
          ) : null}
          <button
            type="button"
            disabled={phase !== 'complete'}
            onClick={onApplyPreprocessorResult}
            className={[buttonPrimarySmClasses, 'px-4 disabled:opacity-50'].join(' ')}
          >
            {uiTitleCase(t('activity.preprocessor.saveResults'), locale)}
          </button>
        </div>
      </div>

      <OverlayDialogBlock
        title="Video preview"
        isOpen={videoPopupRecordId !== null}
        onClose={() => setVideoPopupRecordId(null)}
        panelClassName="max-w-lg"
      >
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Path (prototype):{' '}
            <code className="break-all rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-800">
              {videoPopupRecordId ? activityPreprocessorVideoDetailPath(videoPopupRecordId) : ACTIVITY_PREPROCESSOR_VIDEO_DETAIL_PATH_PATTERN}
            </code>
          </p>
          <div className="aspect-video w-full rounded-md border border-slate-200 bg-slate-900/90">
            <div className="flex h-full items-center justify-center text-sm text-slate-300">Video player placeholder</div>
          </div>
          <p className="text-xs text-slate-500">Record: {videoPopupRecordId ?? '—'}</p>
        </div>
      </OverlayDialogBlock>
    </div>
  );
}
