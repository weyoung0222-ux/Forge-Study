import React from "react";

import { PlusOutlined } from "../../icons";
import { useLanguage } from "../../context/LanguageContext";
import { uiTitleCase } from "../../utils/titleCase";
import {
  buttonPrimarySmClasses,
  buttonSecondarySmClasses,
} from "../styles/buttonClasses";
import { COLLECT_TELEOP_TARGET_EPISODES } from "../../data-spec/mocks/activityWorkflowCounts.mock";
import {
  WORK_PAGE_DATASET_PARAMETERS_TITLE,
  collectTeleopGridHeightClasses,
  workPageCanvasCardClasses,
  workPageSectionContainerTitleClasses,
  workPageStep1TwoColumnGridClasses,
} from "../styles/workPageCanvasClasses";
import {
  formControlInputClasses,
  formControlTextareaClasses,
  workPageFormFieldStackClasses,
} from "../styles/formFieldClasses";
import { WorkPageFormFieldBlock, WorkPageFormFieldLabelText } from "../molecules/WorkPageFormField.block";

type TaskInstructionMode = "single" | "multi";

type CameraSlotState = "disconnected" | "connected";

type Props = {
  /** Called when **Save** is pressed (advances to step 2). */
  onProceedToStep2: () => void;
  /** Transient feedback for Apply / Retry (e.g. workspace toast). */
  onNotify?: (message: string) => void;
};

/** Per-episode max recording length (seconds) — progress bar uses elapsed / this value. */
const MAX_RECORDING_SECONDS = 20;

/**
 * Collect activity — Step 1 (Teleoperation): parameter form + teleop panel (episode, recording progress, camera tiles, session controls).
 * Action semantics: `docs/policies/collect-teleoperation-actions.md`.
 */
export function CollectTeleoperationStepBlock({
  onProceedToStep2,
  onNotify,
}: Props): JSX.Element {
  const { locale } = useLanguage();
  const [robotModel, setRobotModel] = React.useState("");
  const [taskName, setTaskName] = React.useState("");
  const [taskMode, setTaskMode] = React.useState<TaskInstructionMode>("multi");
  const [taskInstruction, setTaskInstruction] = React.useState("");
  const [privateMode, setPrivateMode] = React.useState(false);
  const [fps, setFps] = React.useState("");

  const [totalEpisodes] = React.useState(COLLECT_TELEOP_TARGET_EPISODES);
  const [completedEpisodes, setCompletedEpisodes] = React.useState(0);
  const [isRecording, setIsRecording] = React.useState(false);
  /** Elapsed seconds for the current episode take (0 … max); drives the progress bar. */
  const [elapsedSec, setElapsedSec] = React.useState(0);
  /** Save enabled after Finish, or after current episode recording ends (max time, or Stop). */
  const [saveEnabled, setSaveEnabled] = React.useState(false);

  const [cameraSlots, setCameraSlots] = React.useState<CameraSlotState[]>([
    "disconnected",
    "disconnected",
    "disconnected",
  ]);

  const displayEpisode =
    completedEpisodes >= totalEpisodes ? totalEpisodes : completedEpisodes + 1;
  const clampedElapsed = Math.min(elapsedSec, MAX_RECORDING_SECONDS);
  const episodeProgressPct = Math.min(
    100,
    Math.round((clampedElapsed / MAX_RECORDING_SECONDS) * 100),
  );
  const displayElapsedInt = Math.min(
    Math.floor(clampedElapsed),
    MAX_RECORDING_SECONDS,
  );

  React.useEffect(() => {
    if (!isRecording) return;
    const id = window.setInterval(() => {
      setElapsedSec((prev) => {
        const next = Math.min(prev + 0.1, MAX_RECORDING_SECONDS);
        if (next >= MAX_RECORDING_SECONDS) {
          window.queueMicrotask(() => {
            setIsRecording(false);
            setSaveEnabled(true);
          });
        }
        return next;
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [isRecording]);

  const toggleCamera = (index: number): void => {
    setCameraSlots((prev) => {
      const next = [...prev];
      next[index] =
        prev[index] === "disconnected" ? "connected" : "disconnected";
      return next;
    });
  };

  const handleApply = (): void => {
    onNotify?.("Parameters applied (prototype).");
  };

  const handleStart = (): void => {
    if (isRecording) return;
    setElapsedSec(0);
    setSaveEnabled(false);
    setIsRecording(true);
  };

  const handleStop = (): void => {
    if (!isRecording) return;
    setIsRecording(false);
    setSaveEnabled(true);
  };

  const handleRetry = (): void => {
    setIsRecording(false);
    setElapsedSec(0);
    setSaveEnabled(false);
    onNotify?.(
      "Current episode capture reset — record again from the start of this episode (prototype).",
    );
  };

  const handleNext = (): void => {
    if (isRecording || completedEpisodes >= totalEpisodes) return;
    setCompletedEpisodes((c) => Math.min(totalEpisodes, c + 1));
    setElapsedSec(0);
    setSaveEnabled(false);
  };

  const handleFinish = (): void => {
    setIsRecording(false);
    setSaveEnabled(true);
  };

  const handleSave = (): void => {
    if (!saveEnabled) return;
    onProceedToStep2();
  };

  const statusLine = isRecording
    ? `Recording ${displayElapsedInt} / ${MAX_RECORDING_SECONDS} (s)`
    : elapsedSec < 0.05
      ? `Ready to Start 0 / ${MAX_RECORDING_SECONDS} (s)`
      : `Stopped ${displayElapsedInt} / ${MAX_RECORDING_SECONDS} (s)`;

  const gridClassName = [
    workPageStep1TwoColumnGridClasses,
    collectTeleopGridHeightClasses,
    "lg:grid-rows-[minmax(0,1fr)]",
  ].join(" ");

  return (
    <div className={gridClassName}>
      <section
        className={[
          workPageCanvasCardClasses,
          "flex h-full min-h-0 flex-col",
        ].join(" ")}
      >
        <h2 className="sr-only">Teleoperation parameters</h2>
        <p className={workPageSectionContainerTitleClasses}>{WORK_PAGE_DATASET_PARAMETERS_TITLE}</p>
        <div className={[workPageFormFieldStackClasses, "mt-3 min-h-0 flex-1 overflow-y-auto pr-0.5"].join(" ")}>
          <WorkPageFormFieldBlock label="Robot Model" required>
            <input
              value={robotModel}
              onChange={(e) => setRobotModel(e.target.value)}
              className={formControlInputClasses}
              placeholder="Placeholder"
              aria-required
            />
          </WorkPageFormFieldBlock>

          <WorkPageFormFieldBlock label="Task Name">
            <input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className={formControlInputClasses}
              placeholder="Enter Text"
            />
          </WorkPageFormFieldBlock>

          <div>
            <WorkPageFormFieldLabelText>Task Instruction</WorkPageFormFieldLabelText>
            <div className="mt-1.5 inline-flex rounded-md border border-slate-300 bg-white p-0.5">
              <button
                type="button"
                onClick={() => setTaskMode("single")}
                className={[
                  "rounded px-3 py-1.5 text-xs font-medium transition",
                  taskMode === "single"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-50",
                ].join(" ")}
              >
                Single Task
              </button>
              <button
                type="button"
                onClick={() => setTaskMode("multi")}
                className={[
                  "rounded px-3 py-1.5 text-xs font-medium transition",
                  taskMode === "multi"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-50",
                ].join(" ")}
              >
                Multi Task
              </button>
            </div>
            <textarea
              value={taskInstruction}
              onChange={(e) => setTaskInstruction(e.target.value)}
              className={[
                formControlTextareaClasses,
                "mt-2 min-h-[10rem] resize-y",
              ].join(" ")}
              placeholder="Placeholder"
            />
          </div>

          <div>
            <WorkPageFormFieldLabelText required>Private Mode</WorkPageFormFieldLabelText>
            <div className="mt-1.5 flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={privateMode}
                onClick={() => setPrivateMode((v) => !v)}
                className={[
                  "relative h-7 w-12 shrink-0 rounded-full border transition",
                  privateMode
                    ? "border-indigo-600 bg-indigo-600"
                    : "border-slate-300 bg-slate-200",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition",
                    privateMode ? "left-6" : "left-0.5",
                  ].join(" ")}
                />
              </button>
              <span className="text-xs text-slate-700">
                {privateMode ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>

          <WorkPageFormFieldBlock label="User ID" required>
            <input
              disabled
              className={[
                formControlInputClasses,
                "cursor-not-allowed bg-slate-100 text-slate-500",
              ].join(" ")}
              placeholder="User ID (disabled)"
              aria-disabled
            />
          </WorkPageFormFieldBlock>

          <WorkPageFormFieldBlock label="FPS" required>
            <input
              value={fps}
              onChange={(e) => setFps(e.target.value)}
              className={formControlInputClasses}
              placeholder="Enter..."
              inputMode="numeric"
              aria-required
            />
          </WorkPageFormFieldBlock>
        </div>

        <div className="mt-4 shrink-0 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={handleApply}
            className={buttonPrimarySmClasses}
          >
            {uiTitleCase("apply", locale)}
          </button>
        </div>
      </section>

      <section
        className={[
          workPageCanvasCardClasses,
          "flex h-full min-h-0 flex-col",
        ].join(" ")}
      >
        <h2 className="sr-only">Teleoperation session</h2>

        <div className="shrink-0 border-b border-slate-100 pb-3">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
            <div className="shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center sm:text-left">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                Episode
              </p>
              <p className="text-lg font-semibold tabular-nums text-slate-900">
                {Math.min(displayEpisode, totalEpisodes)} / {totalEpisodes}
              </p>
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
              <p className="text-center text-xs font-medium text-slate-700 sm:text-left">
                {statusLine}
              </p>
              <div className="flex w-full min-w-0 items-center gap-2">
                <span className="w-9 shrink-0 text-right text-[11px] tabular-nums text-slate-500">
                  {episodeProgressPct}%
                </span>
                <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-slate-700 transition-[width] duration-100 ease-linear"
                    style={{ width: `${episodeProgressPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-y-auto py-2">
            <div className="grid w-full max-w-full grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2.35fr)_minmax(0,1fr)] sm:items-center">
            {cameraSlots.map((state, index) => (
              <div key={String(index)} className="flex min-w-0 flex-col items-stretch justify-center">
                <button
                  type="button"
                  onClick={() => toggleCamera(index)}
                  className={[
                    "flex w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed transition aspect-video max-h-[min(40vh,16rem)] sm:max-h-[min(42vh,18rem)]",
                    state === "connected"
                      ? "border-indigo-400 bg-indigo-50/80 text-indigo-900"
                      : "border-slate-300 bg-slate-50 text-slate-500 hover:border-slate-400 hover:bg-white",
                  ].join(" ")}
                  aria-label={
                    state === "connected"
                      ? `Camera ${index + 1} connected`
                      : `Connect camera ${index + 1}`
                  }
                >
                  {state === "connected" ? (
                    <span className="text-center text-xs font-medium leading-snug">
                      Live
                      <br />
                      <span className="text-[10px] font-normal text-slate-600">
                        Camera {index + 1}
                      </span>
                    </span>
                  ) : (
                    <>
                      <PlusOutlined className="h-8 w-8" aria-hidden />
                      <span className="text-[11px]">{uiTitleCase("add feed", locale)}</span>
                    </>
                  )}
                </button>
              </div>
            ))}
            </div>
          </div>
        </div>

        <div className="mt-auto shrink-0 border-t border-slate-100 pt-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center justify-start gap-2">
              <button
                type="button"
                onClick={handleStart}
                disabled={isRecording}
                className={buttonSecondarySmClasses}
              >
                {uiTitleCase("start", locale)}
              </button>
              <button
                type="button"
                onClick={handleStop}
                disabled={!isRecording}
                className={buttonSecondarySmClasses}
              >
                {uiTitleCase("stop", locale)}
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={isRecording || completedEpisodes >= totalEpisodes}
                className={buttonSecondarySmClasses}
              >
                {uiTitleCase("next", locale)}
              </button>
              <button
                type="button"
                onClick={handleRetry}
                className={buttonSecondarySmClasses}
              >
                {uiTitleCase("retry", locale)}
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className={buttonSecondarySmClasses}
              >
                {uiTitleCase("finish", locale)}
              </button>
            </div>
            <div className="flex shrink-0 items-center sm:ml-auto">
              <button
                type="button"
                onClick={handleSave}
                disabled={!saveEnabled}
                className={[
                  buttonPrimarySmClasses,
                  !saveEnabled ? "opacity-40" : "",
                ].join(" ")}
                title={
                  saveEnabled
                    ? "Go to pre-processor"
                    : "Finish, end recording (max or Stop), or Stop after Start"
                }
              >
                {uiTitleCase("save", locale)}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
