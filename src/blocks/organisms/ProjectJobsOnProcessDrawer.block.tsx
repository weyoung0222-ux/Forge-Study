import React from 'react';

import { CloseOutlined } from '../../icons';
import { useLanguage } from '../../context/LanguageContext';
import { uiTitleCase } from '../../utils/titleCase';

import { ListToolbarBlock } from './ListToolbar.block';
import type { LibrarySource } from '../../screens/library/Library/Library.schema';
import type { WorkspaceJobItem } from '../../data-spec/mocks/workspaceJobs.mock';
import { chipSourceActivityClasses } from '../styles/chipClasses';
import { formControlSelectClasses } from '../styles/formFieldClasses';

type Props = {
  isOpen: boolean;
  jobs: WorkspaceJobItem[];
  onClose: () => void;
};

const sourceLabel = (source: LibrarySource): string => source.charAt(0).toUpperCase() + source.slice(1);

export function ProjectJobsOnProcessDrawerBlock({ isOpen, jobs, onClose }: Props): JSX.Element | null {
  const { t, locale } = useLanguage();
  const drawerTitle = uiTitleCase(t('workspace.jobsButton'), locale);
  const [searchValue, setSearchValue] = React.useState('');
  const [sourceFilter, setSourceFilter] = React.useState<LibrarySource | 'all'>('all');
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'running' | 'queued' | 'blocked'>('all');

  const filteredJobs = React.useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    return jobs.filter((job) => {
      const bySearch =
        q.length === 0 ? true : [job.name, job.description, job.worker].join(' ').toLowerCase().includes(q);
      const bySource = sourceFilter === 'all' ? true : job.source === sourceFilter;
      const byStatus = statusFilter === 'all' ? true : job.status === statusFilter;
      return bySearch && bySource && byStatus;
    });
  }, [jobs, searchValue, sourceFilter, statusFilter]);

  const [mounted, setMounted] = React.useState(isOpen);
  const [panelIn, setPanelIn] = React.useState(false);

  const TRANSITION_MS = 320;

  React.useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setPanelIn(true));
      });
      return () => cancelAnimationFrame(id);
    }
    setPanelIn(false);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen && !mounted) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, mounted]);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const handleAsideTransitionEnd = (event: React.TransitionEvent<HTMLElement>): void => {
    if (event.propertyName !== 'transform') return;
    if (!isOpen) setMounted(false);
  };

  if (!isOpen && !mounted) return null;

  return (
    <div
      className={['fixed inset-0 z-40 bg-slate-900/35 transition-opacity ease-out', panelIn ? 'opacity-100' : 'opacity-0'].join(
        ' ',
      )}
      style={{ transitionDuration: `${TRANSITION_MS}ms` }}
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={drawerTitle}
        onClick={(event) => event.stopPropagation()}
        onTransitionEnd={handleAsideTransitionEnd}
        className={[
          'absolute inset-y-0 right-0 w-[96vw] max-w-[920px] overflow-y-auto border-l border-slate-200 bg-white p-4 shadow-2xl will-change-transform',
          'transform transition-transform ease-out',
          panelIn ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        style={{ transitionDuration: `${TRANSITION_MS}ms` }}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">{drawerTitle}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close jobs drawer"
          >
            <CloseOutlined className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-3">
          <ListToolbarBlock
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            searchPlaceholder={`${uiTitleCase('search jobs', locale)}...`}
            searchAriaLabel={uiTitleCase(t('workspace.jobsSearchAria'), locale)}
            chips={[]}
            sortValue={sourceFilter}
            sortOptions={[
              { value: 'all', label: 'Source : All' },
              { value: 'register', label: 'Source : Register' },
              { value: 'collector', label: 'Source : Collector' },
              { value: 'generator', label: 'Source : Generator' },
              { value: 'curator', label: 'Source : Curator' },
              { value: 'trainer', label: 'Source : Trainer' },
              { value: 'evaluator', label: 'Source : Evaluator' },
            ]}
            sortAriaLabel="Source filter"
            onSortChange={(value) => setSourceFilter(value as LibrarySource | 'all')}
            rightExtras={
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as 'all' | 'running' | 'queued' | 'blocked')}
                aria-label="Status filter"
                className={formControlSelectClasses}
              >
                <option value="all">Status : All</option>
                <option value="running">Status : Running</option>
                <option value="queued">Status : Queued</option>
                <option value="blocked">Status : Blocked</option>
              </select>
            }
          />
        </div>

        <div className="grid gap-3">
          {filteredJobs.map((job) => (
            <article key={job.id} className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{job.name}</p>
                  <p className="mt-1 text-xs text-slate-600">{job.description}</p>
                </div>
                <span className={[chipSourceActivityClasses, 'font-semibold text-slate-600'].join(' ')}>{sourceLabel(job.source)}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                <span>Worker: {job.worker}</span>
                <span>Started: {job.startedAt}</span>
                <span>ETA: {job.eta}</span>
                <span>Status: {job.status}</span>
              </div>
              <div className="mt-2">
                <div className="mb-1 flex items-center justify-between text-[11px] text-slate-600">
                  <span>Progress</span>
                  <span>{job.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-indigo-500"
                    style={{
                      width: `${Math.min(100, Math.max(0, job.progress))}%`,
                    }}
                  />
                </div>
              </div>
            </article>
          ))}
          {filteredJobs.length === 0 ? (
            <p className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-8 text-center text-sm text-slate-500">
              No jobs found for the current filter.
            </p>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
