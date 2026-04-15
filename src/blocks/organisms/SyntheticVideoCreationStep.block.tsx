import React from 'react';

import { useLanguage } from '../../context/LanguageContext';
import { uiTitleCase } from '../../utils/titleCase';
import { FullscreenOutlined, PauseOutlined, PlayCircleOutlined } from '../../icons';
import { buttonPrimarySmClasses } from '../styles/buttonClasses';
import {
  WORK_PAGE_DATASET_PARAMETERS_TITLE,
  WORK_PAGE_OUTPUT_PREVIEW_TITLE,
  collectTeleopGridHeightClasses,
  workPageSectionContainerTitleClasses,
  workPageStep1TwoColumnGridClasses,
} from '../styles/workPageCanvasClasses';
import { ActivityStepContainerBlock } from '../molecules/ActivityStepContainer.block';
import { WorkPageActivityFooterToolbarBlock } from '../molecules/WorkPageActivityFooterToolbar.block';
import { WorkPageFileUploadDropzoneBlock } from '../molecules/WorkPageFileUploadDropzone.block';
import { WorkPageFormFieldBlock } from '../molecules/WorkPageFormField.block';
import {
  formControlInputClasses,
  formControlTextareaClasses,
  workPageFormFieldStackClasses,
} from '../styles/formFieldClasses';

/** CC0 sample — MDN interactive examples (prototype playback). */
const DEMO_VIDEO_SRC =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm';

type GenerationPhase = 'idle' | 'running' | 'complete';

type Props = {
  /** After successful generation, Save advances to pre-processor step. */
  onProceedToStep2: () => void;
  onNotify?: (message: string) => void;
};

function serializeParams(snapshot: {
  prompt: string;
  sceneName: string;
  durationSec: string;
  referenceFileName: string;
}): string {
  return JSON.stringify({
    prompt: snapshot.prompt,
    sceneName: snapshot.sceneName,
    durationSec: snapshot.durationSec,
    referenceFileName: snapshot.referenceFileName,
  });
}

function formatMediaTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * Generate → Synthetic Video Creation — step 1: same two-column shell as Collect;
 * left parameters, right progress + placeholder / video with controls.
 */
export function SyntheticVideoCreationStepBlock({ onProceedToStep2, onNotify }: Props): JSX.Element {
  const { locale } = useLanguage();
  const [prompt, setPrompt] = React.useState('');
  const [sceneName, setSceneName] = React.useState('');
  const [durationSec, setDurationSec] = React.useState('8');
  const [phase, setPhase] = React.useState<GenerationPhase>('idle');
  const [progressPct, setProgressPct] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  /** After the first successful generation, primary action label switches from Run → Rerun. */
  const [hasCompletedGeneration, setHasCompletedGeneration] = React.useState(false);
  const [referenceFileName, setReferenceFileName] = React.useState('');
  /** Params at last generation completion — Run/Rerun stays disabled until current inputs differ. */
  const [committedParamKey, setCommittedParamKey] = React.useState(() =>
    serializeParams({ prompt: '', sceneName: '', durationSec: '8', referenceFileName: '' }),
  );
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const outputWrapRef = React.useRef<HTMLDivElement | null>(null);
  const prevPhaseRef = React.useRef<GenerationPhase>('idle');
  const [videoTime, setVideoTime] = React.useState(0);
  const [videoDuration, setVideoDuration] = React.useState(0);

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
        onNotify?.('Video generation finished (prototype).');
        return;
      }
      setProgressPct(pct);
    }, 45);
    return () => window.clearInterval(id);
  }, [phase, onNotify]);

  React.useEffect(() => {
    if (phase === 'complete' && prevPhaseRef.current !== 'complete') {
      setHasCompletedGeneration(true);
      setCommittedParamKey(serializeParams({ prompt, sceneName, durationSec, referenceFileName }));
    }
    prevPhaseRef.current = phase;
  }, [phase, prompt, sceneName, durationSec, referenceFileName]);

  React.useEffect(() => {
    if (phase !== 'complete') {
      setVideoTime(0);
      setVideoDuration(0);
    }
  }, [phase]);

  const handleRunOrRerun = (): void => {
    if (phase === 'running') return;
    setPhase('running');
  };

  const currentParamKey = serializeParams({ prompt, sceneName, durationSec, referenceFileName });
  const runPrimaryDisabled = phase === 'running' || currentParamKey === committedParamKey;
  const primaryActionLabel = hasCompletedGeneration ? 'rerun' : 'run';

  const togglePlay = (): void => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const handleFullscreen = (): void => {
    const el = outputWrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen();
    }
  };

  const gridClassName = [workPageStep1TwoColumnGridClasses, collectTeleopGridHeightClasses, 'lg:grid-rows-[minmax(0,1fr)]'].join(' ');

  return (
    <div className={gridClassName}>
      <ActivityStepContainerBlock
        header={
          <>
            <h2 className="sr-only">Synthetic video parameters</h2>
            <p className={workPageSectionContainerTitleClasses}>{WORK_PAGE_DATASET_PARAMETERS_TITLE}</p>
          </>
        }
        footer={
          <WorkPageActivityFooterToolbarBlock
            right={
              <button
                type="button"
                onClick={handleRunOrRerun}
                disabled={runPrimaryDisabled}
                className={[buttonPrimarySmClasses, runPrimaryDisabled ? 'cursor-not-allowed opacity-50' : ''].join(' ')}
              >
                {uiTitleCase(primaryActionLabel, locale)}
              </button>
            }
          />
        }
      >
        <div className={workPageFormFieldStackClasses}>
          <WorkPageFileUploadDropzoneBlock
            selectedFileName={referenceFileName}
            onFileChange={(f) => setReferenceFileName(f?.name ?? '')}
          />
          <WorkPageFormFieldBlock label="Scene / clip name" required>
            <input
              value={sceneName}
              onChange={(e) => setSceneName(e.target.value)}
              className={formControlInputClasses}
              placeholder="e.g. warehouse_pick_lane_A"
              aria-required
            />
          </WorkPageFormFieldBlock>
          <WorkPageFormFieldBlock label="Prompt" required>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={[formControlTextareaClasses, 'min-h-[10rem] resize-y'].join(' ')}
              placeholder="Describe motion, camera, and objects for synthetic video…"
              aria-required
            />
          </WorkPageFormFieldBlock>
          <WorkPageFormFieldBlock label="Target duration (seconds)">
            <input
              value={durationSec}
              onChange={(e) => setDurationSec(e.target.value)}
              className={formControlInputClasses}
              inputMode="numeric"
              placeholder="8"
            />
          </WorkPageFormFieldBlock>
        </div>
      </ActivityStepContainerBlock>

      <ActivityStepContainerBlock
        header={
          <>
            <h2 className="sr-only">Synthetic video output</h2>
            <p className={workPageSectionContainerTitleClasses}>{WORK_PAGE_OUTPUT_PREVIEW_TITLE}</p>
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
        {phase !== 'idle' ? (
              <div className={phase === 'complete' ? 'mt-4 space-y-2' : 'space-y-2'}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-10 shrink-0 text-right text-[11px] tabular-nums text-slate-500">{progressPct}%</span>
                  <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-slate-700 transition-[width] duration-100 ease-linear"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  {progressPct >= 100 ? (
                    <span className="inline-flex h-6 min-h-[1.5rem] shrink-0 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 px-2.5 text-[11px] font-semibold text-emerald-800">
                      complete
                    </span>
                  ) : null}
                </div>
              </div>
            ) : null}

            {phase === 'idle' ? (
              <div
                className="min-h-[12rem] flex-1 rounded-lg border border-dashed border-slate-200 bg-slate-50/80"
                aria-hidden
              />
            ) : null}

            {phase === 'running' ? (
              <div className="mt-4 flex min-h-[12rem] flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-slate-200 bg-slate-900/5 px-4 py-8 text-center">
                <div className="aspect-video w-full max-w-full overflow-hidden rounded-md bg-slate-200/90">
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-slate-600">
                    <span className="text-xs font-medium text-slate-500">Preview</span>
                    <p className="text-sm font-medium text-slate-700">Please wait — your video is being generated.</p>
                    <p className="text-xs text-slate-500">잠시만 기다려 주세요. 영상이 생성되고 있습니다.</p>
                  </div>
                </div>
              </div>
            ) : null}

        {phase === 'complete' ? (
          <div className="mt-4 flex min-h-0 flex-1 flex-col gap-3">
            <div ref={outputWrapRef} className="w-full overflow-hidden rounded-lg border border-slate-200 bg-black">
              <video
                ref={videoRef}
                key={DEMO_VIDEO_SRC}
                className="aspect-video w-full max-w-full object-contain"
                src={DEMO_VIDEO_SRC}
                playsInline
                autoPlay
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={() => {
                  const v = videoRef.current;
                  if (v) setVideoTime(v.currentTime);
                }}
                onLoadedMetadata={() => {
                  const v = videoRef.current;
                  if (v && Number.isFinite(v.duration)) setVideoDuration(v.duration);
                }}
              />
            </div>
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <input
                type="range"
                min={0}
                max={videoDuration > 0 ? videoDuration : 1}
                step={0.01}
                value={videoDuration > 0 ? Math.min(videoTime, videoDuration) : 0}
                onChange={(e) => {
                  const t = parseFloat(e.target.value);
                  const v = videoRef.current;
                  if (v) {
                    v.currentTime = t;
                    setVideoTime(t);
                  }
                }}
                className="h-1.5 min-w-0 flex-1 cursor-pointer accent-indigo-500"
                aria-label="Seek"
              />
              <span className="shrink-0 tabular-nums text-[11px] text-slate-600">
                {formatMediaTime(videoTime)} / {formatMediaTime(videoDuration)}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-800 shadow-sm hover:bg-slate-50"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <PauseOutlined className="h-4 w-4" /> : <PlayCircleOutlined className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-800 shadow-sm hover:bg-slate-50"
                  aria-label="Fullscreen"
                >
                  <FullscreenOutlined className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  onClick={() => onNotify?.('Download requested (prototype).')}
                >
                  {uiTitleCase('download', locale)}
                </button>
                <button
                  type="button"
                  className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  onClick={() => onNotify?.('Details (prototype).')}
                >
                  {uiTitleCase('clip details', locale)}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </ActivityStepContainerBlock>
    </div>
  );
}
