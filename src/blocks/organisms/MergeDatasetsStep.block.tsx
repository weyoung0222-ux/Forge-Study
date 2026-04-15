import React from 'react';

import { useLanguage } from '../../context/LanguageContext';
import { uiTitleCase } from '../../utils/titleCase';
import type { LibrarySource } from '../../screens/library/Library/Library.schema';
import { buttonPrimarySmClasses } from '../styles/buttonClasses';
import { chipSourceActivityClasses } from '../styles/chipClasses';
import {
  WORK_PAGE_MERGE_DATASETS_TITLE,
  collectTeleopGridHeightClasses,
  workPageSectionContainerTitleClasses,
} from '../styles/workPageCanvasClasses';
import { ActivityStepContainerBlock } from '../molecules/ActivityStepContainer.block';
import { WorkPageActivityFooterToolbarBlock } from '../molecules/WorkPageActivityFooterToolbar.block';
import { WorkPageFormFieldBlock } from '../molecules/WorkPageFormField.block';
import { formControlInputClasses, formControlTextareaClasses } from '../styles/formFieldClasses';
import {
  computeMergeSelectionPreview,
  formatLargeCount,
} from '../../data-spec/mocks/mergeDatasetSelectionPreview.mock';

export type MergeDatasetPickRow = {
  id: string;
  no: string;
  name: string;
  version: string;
  sourceType: LibrarySource;
  time: string;
  worker: string;
};

type Props = {
  /** Saved dataset rows from the workspace table (Data Foundry). */
  datasets: MergeDatasetPickRow[];
  onProceedToStep2: () => void;
  onNotify?: (message: string) => void;
};

function sourceLabel(source: LibrarySource): string {
  return source.charAt(0).toUpperCase() + source.slice(1);
}

/**
 * Curate → Merge datasets — step 1: multi-select saved datasets, name merged output, continue to pre-processor.
 */
export function MergeDatasetsStepBlock({ datasets, onProceedToStep2, onNotify }: Props): JSX.Element {
  const { locale } = useLanguage();
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<Set<string>>(() => new Set());
  const [mergedName, setMergedName] = React.useState('RFM-Merged-Dataset');
  const [mergedDescription, setMergedDescription] = React.useState('');

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return datasets;
    return datasets.filter((row) => {
      const blob = [row.no, row.name, row.version, sourceLabel(row.sourceType), row.time, row.worker].join(' ').toLowerCase();
      return blob.includes(q);
    });
  }, [datasets, search]);

  const allFilteredIds = React.useMemo(() => filtered.map((r) => r.id), [filtered]);
  const allFilteredSelected =
    filtered.length > 0 && filtered.every((r) => selected.has(r.id));

  const toggleId = (id: string): void => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAllFiltered = (): void => {
    if (allFilteredSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        allFilteredIds.forEach((id) => next.delete(id));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        allFilteredIds.forEach((id) => next.add(id));
        return next;
      });
    }
  };

  const canContinue = selected.size >= 2 && mergedName.trim().length > 0;

  const selectedRows = React.useMemo(
    () => datasets.filter((row) => selected.has(row.id)),
    [datasets, selected],
  );

  const mergePreview =
    selectedRows.length >= 2 ? computeMergeSelectionPreview(selectedRows) : null;

  const handleContinue = (): void => {
    if (!canContinue) return;
    onNotify?.(`Merge queued: ${selected.size} datasets → ${mergedName.trim()} (prototype).`);
    onProceedToStep2();
  };

  return (
    <div className={[collectTeleopGridHeightClasses, 'flex min-h-0 flex-col gap-4 overflow-hidden'].join(' ')}>
      <ActivityStepContainerBlock
        className="min-h-0 flex-1"
        header={
          <>
            <h2 className="sr-only">Select datasets to merge</h2>
            <p className={workPageSectionContainerTitleClasses}>{WORK_PAGE_MERGE_DATASETS_TITLE}</p>
            <p className="mt-1 text-xs text-slate-600">
              Choose two or more saved datasets from this project. They will be combined into a single new dataset for the next steps.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="merge-dataset-search">
            Filter saved datasets
          </label>
          <input
            id="merge-dataset-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, no., source…"
            className={[formControlInputClasses, 'max-w-md'].join(' ')}
            autoComplete="off"
          />
          <span className="text-xs text-slate-500">
            {selected.size} selected
            {filtered.length !== datasets.length ? ` · ${filtered.length} shown` : ''}
          </span>
            </div>
          </>
        }
      >
        <div className="mt-3 overflow-hidden rounded-md border border-slate-200 bg-white">
          <div className="max-h-[min(320px,50vh)] overflow-auto">
            <table className="min-w-full border-collapse text-xs">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="w-10 px-2 py-2 text-center">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300"
                      checked={allFilteredSelected}
                      disabled={filtered.length === 0}
                      onChange={toggleSelectAllFiltered}
                      aria-label="Select all visible datasets"
                    />
                  </th>
                  <th className="px-2 py-2 text-left font-semibold text-slate-600">No.</th>
                  <th className="px-2 py-2 text-left font-semibold text-slate-600">Dataset name</th>
                  <th className="px-2 py-2 text-center font-semibold text-slate-600">Version</th>
                  <th className="px-2 py-2 text-center font-semibold text-slate-600">Source</th>
                  <th className="px-2 py-2 text-center font-semibold text-slate-600">Time</th>
                  <th className="px-2 py-2 text-center font-semibold text-slate-600">Worker</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => {
                  const isOn = selected.has(row.id);
                  return (
                    <tr
                      key={row.id}
                      className={[
                        'border-b border-slate-100 last:border-b-0',
                        isOn ? 'bg-indigo-50/80' : 'hover:bg-slate-50/80',
                      ].join(' ')}
                    >
                      <td className="px-2 py-2 text-center">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300"
                          checked={isOn}
                          onChange={() => toggleId(row.id)}
                          aria-label={`Select dataset ${row.name}`}
                        />
                      </td>
                      <td className="px-2 py-2 tabular-nums text-slate-800">{row.no}</td>
                      <td className="max-w-[14rem] px-2 py-2 font-medium text-slate-900">
                        <button
                          type="button"
                          className="w-full truncate text-left underline-offset-2 hover:underline"
                          onClick={() => toggleId(row.id)}
                        >
                          {row.name}
                        </button>
                      </td>
                      <td className="px-2 py-2 text-center text-slate-700">{row.version}</td>
                      <td className="px-2 py-2 text-center">
                        <span className={chipSourceActivityClasses}>{sourceLabel(row.sourceType)}</span>
                      </td>
                      <td className="px-2 py-2 text-center text-slate-600">{row.time}</td>
                      <td className="px-2 py-2 text-center text-slate-600">{row.worker}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-slate-500">No datasets match your filter.</p>
            ) : null}
          </div>
        </div>

        {mergePreview ? (
          <div
            className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm"
            role="region"
            aria-label={uiTitleCase('merge preview', locale)}
          >
            <p className="text-sm font-semibold tracking-tight text-slate-900">
              {uiTitleCase('merge preview', locale)}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4 sm:gap-x-6">
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Datasets</p>
                <p className="mt-1 text-lg font-bold tabular-nums leading-none text-slate-900">
                  {mergePreview.selectedCount}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Episodes (raw → est.)</p>
                <p className="mt-1 text-lg font-bold tabular-nums leading-none text-slate-900">
                  <span>{mergePreview.combinedEpisodes.toLocaleString('en-US')}</span>
                  <span className="mx-0.5 font-semibold text-slate-400">→</span>
                  <span>{mergePreview.estUniqueEpisodesAfterMerge.toLocaleString('en-US')}</span>
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">RFM transitions</p>
                <p className="mt-1 text-lg font-bold tabular-nums leading-none text-slate-900">
                  {formatLargeCount(mergePreview.combinedTransitions)}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Size (raw → merged)</p>
                <p className="mt-1 text-lg font-bold tabular-nums leading-none text-slate-900">
                  <span>{mergePreview.combinedRawSizeGb.toLocaleString('en-US')}</span>
                  <span className="mx-0.5 font-semibold text-slate-400">→</span>
                  <span>{mergePreview.estimatedMergedBundleSizeGb.toLocaleString('en-US')} GB</span>
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </ActivityStepContainerBlock>

      <ActivityStepContainerBlock
        className="min-h-0 flex-1"
        header={<p className={workPageSectionContainerTitleClasses}>{uiTitleCase('merged output', locale)}</p>}
        footer={
          <WorkPageActivityFooterToolbarBlock
            right={
              <button
                type="button"
                disabled={!canContinue}
                onClick={handleContinue}
                className={[buttonPrimarySmClasses, !canContinue ? 'cursor-not-allowed opacity-50' : ''].join(' ')}
              >
                {uiTitleCase('continue to pre-processor', locale)}
              </button>
            }
          />
        }
      >
        <div className="space-y-3">
          <WorkPageFormFieldBlock label="Merged dataset name" required>
            <input
              value={mergedName}
              onChange={(e) => setMergedName(e.target.value)}
              className={formControlInputClasses}
              autoComplete="off"
              aria-required
            />
          </WorkPageFormFieldBlock>
          <WorkPageFormFieldBlock label="Description">
            <textarea
              value={mergedDescription}
              onChange={(e) => setMergedDescription(e.target.value)}
              rows={4}
              className={[formControlTextareaClasses, 'resize-y'].join(' ')}
              placeholder="Optional notes for the merged dataset manifest…"
            />
          </WorkPageFormFieldBlock>
        </div>
      </ActivityStepContainerBlock>
    </div>
  );
}
