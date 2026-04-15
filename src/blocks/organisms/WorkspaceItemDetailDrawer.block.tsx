import React from 'react';

import { CloseOutlined } from '../../icons';
import { TablePaginationBlock } from '../molecules/TablePagination.block';
import { buttonIconGhostClasses, buttonSecondaryMdClasses } from '../styles/buttonClasses';
import {
  chipSourceActivityClasses,
  chipValidationFailCompactClasses,
  chipValidationSuccessCompactClasses,
  chipValidationWarnCompactClasses,
} from '../styles/chipClasses';
import { tabDrawerItemActiveClasses, tabDrawerItemInactiveClasses, tabDrawerNavClasses } from '../styles/tabClasses';
import { formControlInputClasses, formControlSelectClasses } from '../styles/formFieldClasses';
import { DataTableBlock, type DataTableColumn } from './DataTable.block';

type DetailOverviewItem = {
  label: string;
  value: string;
};

type TaskDetailRecord = {
  id: string;
  recordId: string;
  videoLabel: string;
  status: 'success' | 'fail' | 'warn';
  contents: string;
  validation: 'success' | 'fail' | 'warn';
  duration: string;
};

type TaskDetailSummary = {
  total: number;
  passed: number;
  failed: number;
  warned: number;
};

type Props = {
  isOpen: boolean;
  previewMode?: boolean;
  highlighted?: boolean;
  title: string;
  subtitle: string;
  summary: string;
  source: string;
  overviewItems: DetailOverviewItem[];
  taskDetailSummary: TaskDetailSummary;
  taskDetailRecords: TaskDetailRecord[];
  onClose: () => void;
};

export function WorkspaceItemDetailDrawerBlock({
  isOpen,
  previewMode = false,
  highlighted = false,
  title,
  subtitle,
  summary,
  source,
  overviewItems,
  taskDetailSummary,
  taskDetailRecords,
  onClose,
}: Props): JSX.Element | null {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'taskDetails'>('overview');
  const [taskSearch, setTaskSearch] = React.useState('');
  const [taskPage, setTaskPage] = React.useState(1);
  const [taskPageSize, setTaskPageSize] = React.useState(20);

  const filteredTaskRecords = taskDetailRecords.filter((record) =>
    [record.recordId, record.contents].join(' ').toLowerCase().includes(taskSearch.trim().toLowerCase()),
  );
  const taskTotalPages = Math.max(1, Math.ceil(filteredTaskRecords.length / taskPageSize));
  const safeTaskPage = Math.min(taskPage, taskTotalPages);
  const pagedTaskRecords = filteredTaskRecords.slice((safeTaskPage - 1) * taskPageSize, safeTaskPage * taskPageSize);

  React.useEffect(() => {
    setTaskPage(1);
  }, [taskSearch, taskPageSize, activeTab]);

  const taskColumns: DataTableColumn[] = [
    { key: 'index', label: 'Index', align: 'center' },
    { key: 'recordId', label: 'Record ID', align: 'center' },
    { key: 'video', label: 'Video', align: 'center' },
    { key: 'status', label: 'Status', align: 'center' },
    { key: 'contents', label: 'Contents' },
    { key: 'validation', label: 'Validation', align: 'center' },
    { key: 'duration', label: 'Duration', align: 'center' },
  ];

  const statusChip = (value: 'success' | 'fail' | 'warn'): JSX.Element => {
    const className =
      value === 'success'
        ? chipValidationSuccessCompactClasses
        : value === 'fail'
          ? chipValidationFailCompactClasses
          : chipValidationWarnCompactClasses;
    const label = value === 'success' ? 'Success' : value === 'fail' ? 'Fail' : 'Warn';
    return <span className={className}>{label}</span>;
  };

  const taskRows = pagedTaskRecords.map((record, index) => ({
    index: String((safeTaskPage - 1) * taskPageSize + index + 1),
    recordId: record.recordId,
    video: (
      <span className="inline-flex h-5 min-w-10 items-center justify-center rounded border border-slate-300 bg-white px-1 text-[10px] text-slate-600">
        {record.videoLabel}
      </span>
    ),
    status: statusChip(record.status),
    contents: record.contents,
    validation: statusChip(record.validation),
    duration: record.duration,
  }));

  if (!isOpen) return null;

  const drawerBody = (
    <>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>
        <button type="button" onClick={onClose} className={buttonIconGhostClasses} aria-label="Close detail drawer">
          <CloseOutlined className="h-4 w-4" />
        </button>
      </div>

      <nav className={tabDrawerNavClasses}>
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={activeTab === 'overview' ? tabDrawerItemActiveClasses : tabDrawerItemInactiveClasses}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('taskDetails')}
          className={activeTab === 'taskDetails' ? tabDrawerItemActiveClasses : tabDrawerItemInactiveClasses}
        >
          Task Details
        </button>
      </nav>

      {activeTab === 'overview' ? (
        <section className="rounded-md border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-slate-900">{summary}</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {overviewItems.map((item) => (
                  <div key={item.label} className="rounded border border-slate-200 bg-white px-2.5 py-2">
                    <p className="text-[11px] text-slate-500">{item.label}</p>
                    <p className="mt-0.5 text-xs font-medium text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <span className={[chipSourceActivityClasses, 'font-semibold'].join(' ')}>{source}</span>
          </div>
        </section>
      ) : (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              value={taskSearch}
              onChange={(event) => setTaskSearch(event.target.value)}
              placeholder="Search"
              className={formControlInputClasses}
              aria-label="Search task details"
            />
            <select className={formControlSelectClasses} aria-label="Version filter">
              <option>Version v0.1</option>
              <option>Version v0.2</option>
            </select>
            <button type="button" className={buttonSecondaryMdClasses}>
              Export
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {[
              { label: 'Total Records', value: taskDetailSummary.total },
              { label: 'Passed Records', value: taskDetailSummary.passed },
              { label: 'Failed Records', value: taskDetailSummary.failed },
              { label: 'Warned Records', value: taskDetailSummary.warned },
            ].map((card) => (
              <article key={card.label} className="rounded-lg border border-slate-200 bg-white px-3 py-2.5">
                <p className="text-[11px] text-slate-500">{card.label}</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{card.value}</p>
              </article>
            ))}
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <DataTableBlock columns={taskColumns} rows={taskRows} emptyText="No task detail records." />
            <TablePaginationBlock
              currentPage={safeTaskPage}
              pageSize={taskPageSize}
              totalItems={filteredTaskRecords.length}
              onPageChange={setTaskPage}
              onPageSizeChange={setTaskPageSize}
              totalLabel={`Total ${filteredTaskRecords.length}건`}
            />
          </div>
        </section>
      )}
    </>
  );

  if (previewMode) {
    return (
      <aside
        className={[
          'relative h-full w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-xl',
          highlighted ? 'ring-2 ring-indigo-400 ring-offset-2' : '',
        ].join(' ')}
      >
        {drawerBody}
      </aside>
    );
  }

  return (
    <div className="fixed inset-0 z-40 bg-slate-900/35" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Workspace item detail"
        onClick={(event) => event.stopPropagation()}
        className={[
          'absolute inset-y-0 right-0 w-[96vw] max-w-[920px] overflow-y-auto border-l border-slate-200 bg-white p-4 shadow-2xl',
          highlighted ? 'ring-2 ring-indigo-400 ring-offset-2' : '',
        ].join(' ')}
      >
        {drawerBody}
      </aside>
    </div>
  );
}
