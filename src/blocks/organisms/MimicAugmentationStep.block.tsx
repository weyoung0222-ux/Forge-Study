import React from 'react';

import { useLanguage } from '../../context/LanguageContext';
import { uiTitleCase } from '../../utils/titleCase';
import { buttonPrimarySmClasses } from '../styles/buttonClasses';
import {
  WORK_PAGE_DATASET_PARAMETERS_TITLE,
  WORK_PAGE_SIMULATION_PREVIEW_TITLE,
  collectTeleopGridHeightClasses,
  workPageSectionContainerTitleClasses,
  workPageStep1TwoColumnGridClasses,
} from '../styles/workPageCanvasClasses';
import { ActivityStepContainerBlock } from '../molecules/ActivityStepContainer.block';
import { WorkPageActivityFooterToolbarBlock } from '../molecules/WorkPageActivityFooterToolbar.block';
import { WorkPageFileUploadDropzoneBlock } from '../molecules/WorkPageFileUploadDropzone.block';
import { WorkPageFormFieldBlock } from '../molecules/WorkPageFormField.block';
import { formControlInputClasses, workPageFormFieldStackClasses } from '../styles/formFieldClasses';

type AugmentPhase = 'idle' | 'running' | 'complete';

type Props = {
  onProceedToStep2: () => void;
  onNotify?: (message: string) => void;
};

function clampInt(value: string, min: number, max: number, fallback: number): number {
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function serializeParams(snapshot: {
  branchCount: string;
  noiseSigma: string;
  sceneTag: string;
  simulationFileName: string;
}): string {
  return JSON.stringify(snapshot);
}

function thumbnailGradient(index: number, large: boolean): string {
  const hues = [210, 265, 145, 32, 330, 180, 55, 200];
  const h = hues[index % hues.length];
  const spread = large ? '40%' : '55%';
  return `linear-gradient(135deg, hsl(${h} 55% ${large ? '52%' : '48%'}) 0%, hsl(${(h + 40) % 360} 45% ${spread}) 100%)`;
}

/**
 * Generate → Mimic Augmentation — step 1: same 2-col shell as Synthetic Video;
 * left parameters + simulation file; right progress (top) + large source preview + small augmented thumbnails.
 */
export function MimicAugmentationStepBlock({ onProceedToStep2, onNotify }: Props): JSX.Element {
  const { locale } = useLanguage();
  const [branchCount, setBranchCount] = React.useState('8');
  const [noiseSigma, setNoiseSigma] = React.useState('0.12');
  const [sceneTag, setSceneTag] = React.useState('');
  const [simulationFileName, setSimulationFileName] = React.useState('');
  const [phase, setPhase] = React.useState<AugmentPhase>('idle');
  const [progressPct, setProgressPct] = React.useState(0);
  const [hasCompletedRun, setHasCompletedRun] = React.useState(false);
  const [committedParamKey, setCommittedParamKey] = React.useState(() =>
    serializeParams({ branchCount: '8', noiseSigma: '0.12', sceneTag: '', simulationFileName: '' }),
  );
  const prevPhaseRef = React.useRef<AugmentPhase>('idle');

  const branches = clampInt(branchCount, 2, 24, 8);

  React.useEffect(() => {
    if (phase !== 'running') return;
    setProgressPct(0);
    let pct = 0;
    const id = window.setInterval(() => {
      pct += 1;
      if (pct >= 100) {
        window.clearInterval(id);
        setProgressPct(100);
        setPhase('complete');
        onNotify?.('Mimic augmentation finished (prototype).');
        return;
      }
      setProgressPct(pct);
    }, 40);
    return () => window.clearInterval(id);
  }, [phase, onNotify]);

  React.useEffect(() => {
    if (phase === 'complete' && prevPhaseRef.current !== 'complete') {
      setHasCompletedRun(true);
      setCommittedParamKey(
        serializeParams({
          branchCount,
          noiseSigma,
          sceneTag,
          simulationFileName,
        }),
      );
    }
    prevPhaseRef.current = phase;
  }, [phase, branchCount, noiseSigma, sceneTag, simulationFileName]);

  const handleRunOrRerun = (): void => {
    if (phase === 'running') return;
    setPhase('running');
  };

  const currentParamKey = serializeParams({
    branchCount,
    noiseSigma,
    sceneTag,
    simulationFileName,
  });
  const runDisabled = phase === 'running' || currentParamKey === committedParamKey;
  const primaryActionLabel = hasCompletedRun ? 'rerun' : 'run';

  const gridClassName = [workPageStep1TwoColumnGridClasses, collectTeleopGridHeightClasses, 'lg:grid-rows-[minmax(0,1fr)]'].join(' ');

  return (
    <div className={gridClassName}>
      <ActivityStepContainerBlock
        header={
          <>
            <h2 className="sr-only">Mimic augmentation parameters</h2>
            <p className={workPageSectionContainerTitleClasses}>{WORK_PAGE_DATASET_PARAMETERS_TITLE}</p>
          </>
        }
        footer={
          <WorkPageActivityFooterToolbarBlock
            right={
              <button
                type="button"
                onClick={handleRunOrRerun}
                disabled={runDisabled}
                className={[buttonPrimarySmClasses, runDisabled ? 'cursor-not-allowed opacity-50' : ''].join(' ')}
              >
                {uiTitleCase(primaryActionLabel, locale)}
              </button>
            }
          />
        }
      >
        <div className={workPageFormFieldStackClasses}>
          <WorkPageFormFieldBlock label="Augmentation branches" required>
            <input
              value={branchCount}
              onChange={(e) => setBranchCount(e.target.value)}
              className={formControlInputClasses}
              inputMode="numeric"
              min={2}
              max={24}
              aria-required
              aria-describedby="mimic-branch-hint"
            />
            <p id="mimic-branch-hint" className="mt-1 text-[11px] text-slate-500">
              Number of augmented simulation copies (2–24). Shown as thumbnails on the right.
            </p>
          </WorkPageFormFieldBlock>
          <WorkPageFormFieldBlock label="Physics noise σ">
            <input
              value={noiseSigma}
              onChange={(e) => setNoiseSigma(e.target.value)}
              className={formControlInputClasses}
              inputMode="decimal"
              placeholder="0.12"
            />
          </WorkPageFormFieldBlock>
          <WorkPageFormFieldBlock label="Scene / task tag">
            <input
              value={sceneTag}
              onChange={(e) => setSceneTag(e.target.value)}
              className={formControlInputClasses}
              placeholder="e.g. pick_tote_lane_A"
            />
          </WorkPageFormFieldBlock>
          <WorkPageFileUploadDropzoneBlock
            title="simulation input"
            selectedFileName={simulationFileName}
            onFileChange={(f) => setSimulationFileName(f?.name ?? '')}
            accept="video/*,application/json,.mjcf,.xml,.urdf,.zip"
          />
        </div>
      </ActivityStepContainerBlock>

      <ActivityStepContainerBlock
        header={
          <>
            <h2 className="sr-only">Mimic augmentation output</h2>
            <p className={workPageSectionContainerTitleClasses}>{WORK_PAGE_SIMULATION_PREVIEW_TITLE}</p>
          </>
        }
        footer={
          phase === 'complete' ? (
            <WorkPageActivityFooterToolbarBlock
              right={
                <button type="button" onClick={() => onProceedToStep2()} className={buttonPrimarySmClasses}>
                  {uiTitleCase('save', locale)}
                </button>
              }
            />
          ) : null
        }
      >
        <div className="flex min-h-full flex-col gap-4">
              {phase !== 'idle' ? (
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-10 shrink-0 text-right text-[11px] tabular-nums text-slate-500">{progressPct}%</span>
                    <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-indigo-600 transition-[width] duration-100 ease-linear"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    {progressPct >= 100 ? (
                      <span className="inline-flex h-6 min-h-[1.5rem] shrink-0 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 px-2.5 text-[11px] font-semibold text-emerald-800">
                        complete
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {phase === 'running'
                      ? `Cloning simulation into ${branches} augmented variants…`
                      : `${branches} augmented branches ready. Source is shown large; copies are thumbnails.`}
                  </p>
                </div>
              ) : null}

              {phase === 'idle' ? (
                <div
                  className="min-h-[12rem] flex-1 rounded-lg border border-dashed border-slate-200 bg-slate-50/80"
                  aria-hidden
                />
              ) : null}

              {phase === 'running' ? (
                <div className="flex min-h-0 flex-1 flex-col gap-4">
                  <div
                    className="aspect-video w-full max-w-xl rounded-lg border border-slate-200 bg-slate-200/80"
                    style={{ background: thumbnailGradient(0, true) }}
                  >
                    <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-4 text-center text-white">
                      <span className="text-xs font-semibold uppercase tracking-wide text-white/90">Source simulation</span>
                      <span className="text-[11px] text-white/85">Processing…</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {Array.from({ length: Math.min(branches, 12) }, (_, i) => (
                      <div
                        key={`sk-${String(i)}`}
                        className="aspect-video animate-pulse rounded-md border border-slate-200 bg-slate-200/90"
                        style={{ background: thumbnailGradient(i + 1, false) }}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {phase === 'complete' ? (
                <div className="flex min-h-0 flex-1 flex-col gap-4">
                  <div className="w-full max-w-xl">
                    <p className="mb-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Source simulation
                    </p>
                    <div
                      className="aspect-video w-full overflow-hidden rounded-lg border border-slate-300 shadow-sm"
                      style={{ background: thumbnailGradient(0, true) }}
                    >
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center text-white">
                        <span className="text-sm font-semibold">Input sim</span>
                        {simulationFileName ? (
                          <span className="max-w-full truncate text-xs text-white/90">{simulationFileName}</span>
                        ) : (
                          <span className="text-xs text-white/85">No file (prototype preview)</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Augmented simulations ({branches})
                    </p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-4">
                      {Array.from({ length: branches }, (_, i) => (
                        <div key={`aug-${String(i)}`} className="min-w-0">
                          <div
                            className="aspect-video w-full overflow-hidden rounded-md border border-slate-200 shadow-sm"
                            style={{ background: thumbnailGradient(i + 1, false) }}
                          >
                            <div className="flex h-full w-full flex-col items-center justify-center p-1 text-center text-white">
                              <span className="text-[10px] font-semibold leading-tight">Aug {i + 1}</span>
                              <span className="mt-0.5 text-[9px] text-white/85">σ+{noiseSigma}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
        </div>
      </ActivityStepContainerBlock>
    </div>
  );
}
