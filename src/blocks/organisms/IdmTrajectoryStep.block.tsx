import React from 'react';

import { useLanguage } from '../../context/LanguageContext';
import { uiTitleCase } from '../../utils/titleCase';
import { buttonPrimarySmClasses } from '../styles/buttonClasses';
import { chipSourceActivityClasses } from '../styles/chipClasses';
import {
  WORK_PAGE_DATASET_PARAMETERS_TITLE,
  WORK_PAGE_IDM_TRAJECTORY_PREVIEW_TITLE,
  collectTeleopGridHeightClasses,
  workPageSectionContainerTitleClasses,
  workPageStep1TwoColumnGridClasses,
} from '../styles/workPageCanvasClasses';
import { ActivityStepContainerBlock } from '../molecules/ActivityStepContainer.block';
import { WorkPageActivityFooterToolbarBlock } from '../molecules/WorkPageActivityFooterToolbar.block';
import { WorkPageFileUploadDropzoneBlock } from '../molecules/WorkPageFileUploadDropzone.block';
import { WorkPageFormFieldBlock } from '../molecules/WorkPageFormField.block';
import { formControlInputClasses, formControlSelectClasses, workPageFormFieldStackClasses } from '../styles/formFieldClasses';

export type IdmDatasetClipOption = {
  datasetId: string;
  datasetName: string;
  clipId: string;
  clipLabel: string;
  durationSec: number;
  sourceLabel: string;
};

type VideoInputMode = 'upload' | 'dataset';

type FusionPhase = 'idle' | 'running' | 'complete';

type Props = {
  onProceedToStep2: () => void;
  onNotify?: (message: string) => void;
  /** Saved-dataset clips (prototype). Defaults to built-in RFM-style rows. */
  datasetClips?: IdmDatasetClipOption[];
};

const DEFAULT_IDM_MODELS = [
  { id: 'idm-agibot-wh-v1', label: 'IDM · AGIBOT warehouse v1 (RFM)' },
  { id: 'idm-groot-bridge-v0', label: 'IDM · GROOT N1.5 bridge (7-DoF arms)' },
  { id: 'idm-small-v2', label: 'IDM · Small fast preview v2' },
];

const DEFAULT_CLIPS: IdmDatasetClipOption[] = [
  {
    datasetId: 'df-dataset-1',
    datasetName: 'Warehouse Scenarios Collection - Run #112',
    clipId: 'ep-0142',
    clipLabel: 'Episode 0142 · pick_clear_tote',
    durationSec: 48,
    sourceLabel: 'Collector',
  },
  {
    datasetId: 'df-dataset-2',
    datasetName: 'RFM-LiveCollect-PickRoute-v3',
    clipId: 'ep-0088',
    clipLabel: 'Episode 0088 · narrow aisle',
    durationSec: 62,
    sourceLabel: 'Collector',
  },
  {
    datasetId: 'df-dataset-3',
    datasetName: 'RFM-SynthGrasp-Augmented-7k',
    clipId: 'syn-2041',
    clipLabel: 'Synthetic clip 2041 · DR clutter',
    durationSec: 35,
    sourceLabel: 'Generator',
  },
];

/**
 * Generate → IDM — step 1: choose inverse-dynamics model, attach input video (upload or dataset clip),
 * run fusion to burn trajectory overlay into preview (prototype).
 */
export function IdmTrajectoryStepBlock({ onProceedToStep2, onNotify, datasetClips }: Props): JSX.Element {
  const { locale } = useLanguage();
  const clips = datasetClips ?? DEFAULT_CLIPS;

  const [idmModelId, setIdmModelId] = React.useState(DEFAULT_IDM_MODELS[0].id);
  const [videoMode, setVideoMode] = React.useState<VideoInputMode>('upload');
  const [uploadFileName, setUploadFileName] = React.useState('');
  const [selectedClipId, setSelectedClipId] = React.useState(clips[0]?.clipId ?? '');
  const [phase, setPhase] = React.useState<FusionPhase>('idle');
  const [progressPct, setProgressPct] = React.useState(0);

  React.useEffect(() => {
    if (clips.length === 0) return;
    if (!clips.some((c) => c.clipId === selectedClipId)) {
      setSelectedClipId(clips[0].clipId);
    }
  }, [clips, selectedClipId]);

  React.useEffect(() => {
    if (phase !== 'running') return;
    setProgressPct(0);
    let pct = 0;
    const id = window.setInterval(() => {
      pct += 2;
      if (pct >= 100) {
        window.clearInterval(id);
        setProgressPct(100);
        setPhase('complete');
        onNotify?.('IDM trajectory fused to video (prototype).');
        return;
      }
      setProgressPct(pct);
    }, 45);
    return () => window.clearInterval(id);
  }, [phase, onNotify]);

  const activeClip = clips.find((c) => c.clipId === selectedClipId) ?? clips[0];
  const hasVideo =
    videoMode === 'upload' ? uploadFileName.trim().length > 0 : Boolean(activeClip && selectedClipId);
  const canRun = hasVideo && idmModelId.length > 0 && phase !== 'running';
  const canContinue = phase === 'complete';

  const handleRun = (): void => {
    if (!canRun) return;
    setPhase('running');
  };

  const gridClassName = [workPageStep1TwoColumnGridClasses, collectTeleopGridHeightClasses, 'lg:grid-rows-[minmax(0,1fr)]'].join(' ');

  return (
    <div className={gridClassName}>
      <ActivityStepContainerBlock
        header={
          <>
            <h2 className="sr-only">IDM parameters</h2>
            <p className={workPageSectionContainerTitleClasses}>{WORK_PAGE_DATASET_PARAMETERS_TITLE}</p>
          </>
        }
        footer={
          <WorkPageActivityFooterToolbarBlock
            right={
              <button
                type="button"
                onClick={handleRun}
                disabled={!canRun}
                className={[buttonPrimarySmClasses, !canRun ? 'cursor-not-allowed opacity-50' : ''].join(' ')}
              >
                {uiTitleCase(phase === 'complete' ? 'rerun fusion' : 'run idm fusion', locale)}
              </button>
            }
          />
        }
      >
        <div className={workPageFormFieldStackClasses}>
          <WorkPageFormFieldBlock label="IDM model" required>
            <select
              className={formControlSelectClasses}
              value={idmModelId}
              onChange={(e) => setIdmModelId(e.target.value)}
              aria-required
            >
              {DEFAULT_IDM_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[11px] text-slate-500">
              Inverse dynamics model used to estimate joint trajectories from pixels, then align to robot state for overlay.
            </p>
          </WorkPageFormFieldBlock>

          <WorkPageFormFieldBlock label="Input video" required>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Video source">
              {(
                [
                  { id: 'upload' as const, label: 'File upload' },
                  { id: 'dataset' as const, label: 'From dataset' },
                ] as const
              ).map((tab) => {
                const on = videoMode === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      setVideoMode(tab.id);
                      setPhase('idle');
                      setProgressPct(0);
                    }}
                    className={[
                      'rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors',
                      on
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
                    ].join(' ')}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {videoMode === 'upload' ? (
              <div className="mt-3">
                <WorkPageFileUploadDropzoneBlock
                  title="Video file"
                  selectedFileName={uploadFileName}
                  onFileChange={(f) => {
                    setUploadFileName(f?.name ?? '');
                    setPhase('idle');
                    setProgressPct(0);
                  }}
                  accept="video/*,.mp4,.webm,.mov"
                />
              </div>
            ) : (
              <div className="mt-3 space-y-3">
                <WorkPageFormFieldBlock label="Dataset & clip">
                  <select
                    className={formControlSelectClasses}
                    value={selectedClipId}
                    onChange={(e) => {
                      setSelectedClipId(e.target.value);
                      setPhase('idle');
                      setProgressPct(0);
                    }}
                  >
                    {clips.map((c) => (
                      <option key={c.clipId} value={c.clipId}>
                        {c.datasetName} — {c.clipLabel} ({c.durationSec}s)
                      </option>
                    ))}
                  </select>
                </WorkPageFormFieldBlock>
                {activeClip ? (
                  <div className="rounded-md border border-slate-200 bg-slate-50/80 px-2.5 py-2 text-[11px] text-slate-600">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={chipSourceActivityClasses}>{activeClip.sourceLabel}</span>
                      <span className="tabular-nums text-slate-500">{activeClip.durationSec}s</span>
                    </div>
                    <p className="mt-1 font-medium text-slate-800">{activeClip.datasetName}</p>
                  </div>
                ) : null}
              </div>
            )}
          </WorkPageFormFieldBlock>

          <WorkPageFormFieldBlock label="Trajectory overlay">
            <input
              className={formControlInputClasses}
              readOnly
              value="EE pose + 7-DoF joints · 30 Hz (from IDM)"
              aria-readonly
            />
          </WorkPageFormFieldBlock>
        </div>
      </ActivityStepContainerBlock>

      <ActivityStepContainerBlock
        header={
          <>
            <h2 className="sr-only">IDM preview</h2>
            <p className={workPageSectionContainerTitleClasses}>{WORK_PAGE_IDM_TRAJECTORY_PREVIEW_TITLE}</p>
          </>
        }
        footer={
          <WorkPageActivityFooterToolbarBlock
            right={
              <button
                type="button"
                disabled={!canContinue}
                onClick={onProceedToStep2}
                className={[buttonPrimarySmClasses, !canContinue ? 'cursor-not-allowed opacity-50' : ''].join(' ')}
              >
                {uiTitleCase('continue to pre-processor', locale)}
              </button>
            }
          />
        }
      >
        <div className="flex min-h-0 flex-1 flex-col gap-3">
              {phase !== 'idle' ? (
                <div className="shrink-0 space-y-2">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-[width] duration-150"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {phase === 'running'
                      ? 'Aligning trajectory to video timeline…'
                      : 'Trajectory graphics fused — ready for pre-processor.'}
                  </p>
                </div>
              ) : (
                <p className="shrink-0 text-[11px] text-slate-500">
                  Choose a model and video source, then run fusion to preview trajectory overlay on the input video.
                </p>
              )}

              <div className="flex min-h-[200px] flex-1 flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-slate-200 bg-gradient-to-br from-slate-800 via-slate-700 to-indigo-900 p-4 text-center text-white">
                <span className="text-xs font-medium uppercase tracking-wide text-white/80">Preview</span>
                <p className="max-w-sm text-sm text-white/95">
                  {phase === 'complete'
                    ? 'Overlay: joint axes + gripper trace (dummy render).'
                    : videoMode === 'upload' && uploadFileName
                      ? `Queued: ${uploadFileName}`
                      : videoMode === 'dataset' && activeClip
                        ? `${activeClip.clipLabel}`
                        : 'No video selected yet.'}
                </p>
                {phase === 'complete' ? (
                  <p className="text-[11px] text-emerald-200/95">Trajectory channel muxed into export stream (prototype).</p>
                ) : null}
              </div>
            </div>
      </ActivityStepContainerBlock>
    </div>
  );
}
