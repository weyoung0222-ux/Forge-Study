import React from 'react';

import { useLanguage } from '../../context/LanguageContext';
import { toTitleCase, type UiTitleCaseLocale, uiTitleCase } from '../../utils/titleCase';
import { buttonPrimarySmClasses, buttonSecondarySmClasses } from '../styles/buttonClasses';
import { chipSourceActivityClasses } from '../styles/chipClasses';
import {
  workPageCanvasCardClasses,
  workPageStep1FooterRowClasses,
  workPageStep1TwoColumnGridClasses,
} from '../styles/workPageCanvasClasses';
import { formControlInputClasses, formControlTextareaClasses } from '../styles/formFieldClasses';
import type { ActivitySaveDatasetSummary } from '../../data-spec/mocks/activitySaveDataset.mock';

export type ActivitySaveDatasetFooterProps = {
  onPrimary?: () => void;
  onPrevious?: () => void;
  primaryLabel?: string;
};

type Props = {
  datasetName: string;
  datasetDescription: string;
  onDatasetNameChange: (value: string) => void;
  onDatasetDescriptionChange: (value: string) => void;
  summary: ActivitySaveDatasetSummary;
  footer?: ActivitySaveDatasetFooterProps;
};

function SaveFooterRow({
  onPrimary,
  onPrevious,
  primaryLabel = 'save',
  locale,
}: ActivitySaveDatasetFooterProps & { locale: UiTitleCaseLocale }): JSX.Element | null {
  if (!onPrimary && !onPrevious) return null;
  return (
    <>
      {onPrevious ? (
        <button type="button" onClick={onPrevious} className={buttonSecondarySmClasses}>
          {uiTitleCase('previous', locale)}
        </button>
      ) : null}
      {onPrimary ? (
        <button type="button" onClick={onPrimary} className={buttonPrimarySmClasses}>
          {uiTitleCase(primaryLabel, locale)}
        </button>
      ) : null}
    </>
  );
}

/** Summary metric — same visual language as Pre-processor step stat cards */
function SummaryMetricCard({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-3">
      <p className="text-xs font-medium text-slate-600">{toTitleCase(label)}</p>
      <p className="mt-1 text-xl font-bold tabular-nums text-slate-900">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div className="flex flex-col gap-0.5 border-b border-slate-100 py-2 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <dt className="shrink-0 text-[11px] font-medium text-slate-500">{toTitleCase(label)}</dt>
      <dd className="min-w-0 text-right text-xs leading-snug text-slate-800 sm:text-left">{value}</dd>
    </div>
  );
}

/**
 * Activity workflow step 3 — aligned with Register step 1 (`workPageCanvasCardClasses` + two-column grid)
 * and Pre-processor step (single `rounded-xl` shell).
 */
export function ActivitySaveDatasetBlock({
  datasetName,
  datasetDescription,
  onDatasetNameChange,
  onDatasetDescriptionChange,
  summary,
  footer,
}: Props): JSX.Element {
  const { locale } = useLanguage();
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">{toTitleCase('save dataset')}</h2>
        <p className="mt-1 text-sm text-slate-700">
          <span className="font-medium text-slate-900">Ready to save.</span>{' '}
          <span className="text-slate-600">
            Review the dataset title, description, and export summary before saving to the library.
          </span>
        </p>

        <div className={`mt-4 ${workPageStep1TwoColumnGridClasses}`}>
          <section className={[workPageCanvasCardClasses, 'flex flex-col'].join(' ')}>
            <p className="text-sm font-semibold text-slate-900">{toTitleCase('dataset to save')}</p>
            <p className="mt-1 text-xs text-slate-600">These fields are persisted with the export manifest.</p>

            <div className="mt-3 space-y-3">
              <label className="block text-xs text-slate-600">
                <span className="mb-1 block">{toTitleCase('dataset name')}</span>
                <input
                  type="text"
                  value={datasetName}
                  onChange={(e) => onDatasetNameChange(e.target.value)}
                  className={[formControlInputClasses, 'text-slate-900'].join(' ')}
                  autoComplete="off"
                  aria-label="Dataset name"
                />
              </label>
              <label className="block text-xs text-slate-600">
                <span className="mb-1 block">{toTitleCase('description')}</span>
                <textarea
                  value={datasetDescription}
                  onChange={(e) => onDatasetDescriptionChange(e.target.value)}
                  rows={8}
                  className={[formControlTextareaClasses, 'resize-y leading-relaxed text-slate-900'].join(' ')}
                  aria-label="Dataset description"
                />
              </label>
              <div>
                <p className="mb-1.5 text-xs text-slate-600">{toTitleCase('domain tags')}</p>
                <div className="flex flex-wrap gap-1.5">
                  {summary.domainTags.map((tag) => (
                    <span key={tag} className={chipSourceActivityClasses}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-1.5 text-[10px] text-slate-500">
                  Tags are derived from this activity; edit name/description above as needed.
                </p>
              </div>
            </div>
          </section>

          <div className="flex min-h-0 flex-col gap-4">
            <section className={workPageCanvasCardClasses}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900">{toTitleCase('output summary')}</p>
                <span className={[chipSourceActivityClasses, 'font-semibold'].join(' ')}>Source: {summary.displaySource}</span>
              </div>
              <p className="mt-1 text-xs text-slate-600">
                Snapshot of what will be stored for <span className="font-medium text-slate-800">{summary.rfmBaseModel}</span> training
                pipelines.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <SummaryMetricCard label="Pre-processed clips" value={String(summary.validatedRecords)} />
                <SummaryMetricCard label="Passed" value={String(summary.validationPassed)} />
                <SummaryMetricCard label="Warned" value={String(summary.validationWarned)} />
                <SummaryMetricCard label="Failed" value={String(summary.validationFailed)} />
              </div>

              <dl className="mt-4 divide-y divide-slate-100 rounded-lg border border-slate-100 bg-slate-50/50 px-3">
                <InfoRow label="Robot platform" value={summary.robotPlatform} />
                <InfoRow label="End effector" value={summary.endEffectorType} />
                <InfoRow label="Task family" value={summary.taskFamily} />
                <InfoRow label="Total duration" value={summary.totalDurationLabel} />
                <InfoRow label="Avg. trajectory" value={summary.avgTrajectoryLength} />
                <InfoRow label="Proprio state dim" value={`${summary.proprioStateDim}D`} />
                <InfoRow label="Action space" value={summary.actionSpaceLabel} />
                <InfoRow label="Coordinate frame" value={summary.coordinateFrame} />
                <InfoRow label="Camera calibration" value={summary.cameraCalibrationId} />
              </dl>
            </section>

            <section className={workPageCanvasCardClasses}>
              <p className="text-sm font-semibold text-slate-900">{toTitleCase('modalities & signals')}</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-slate-700">
                {summary.modalities.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </section>

            <section className={workPageCanvasCardClasses}>
              <p className="text-sm font-semibold text-slate-900">{toTitleCase('what this dataset contains')}</p>
              <ul className="mt-2 space-y-2 text-xs leading-relaxed text-slate-700">
                {summary.contentHighlights.map((line, i) => (
                  <li key={`${i}-${line.slice(0, 24)}`} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={workPageCanvasCardClasses}>
              <p className="text-sm font-semibold text-slate-900">{toTitleCase('export & preprocessing')}</p>
              <dl className="mt-3 space-y-0 divide-y divide-slate-100 rounded-lg border border-slate-100 bg-slate-50/50 px-3">
                <InfoRow label="Format" value={summary.exportFormat} />
                <InfoRow label="Manifest" value={summary.manifestVersion} />
                <InfoRow label="Est. size" value={summary.estimatedSizeLabel} />
                <InfoRow label="Preprocessor" value={summary.preprocessorPipeline} />
              </dl>
            </section>
          </div>
        </div>
      </div>

      {footer ? (
        <div className={workPageStep1FooterRowClasses}>
          <SaveFooterRow
            {...footer}
            primaryLabel={footer.primaryLabel ?? 'save dataset'}
            locale={locale}
          />
        </div>
      ) : null}
    </div>
  );
}
