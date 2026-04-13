import React from 'react';

import { GlobalTopNavBlock } from '../../../blocks/molecules/GlobalTopNav.block';
import { ListSortSelectBlock } from '../../../blocks/molecules/ListSortSelect.block';
import { OverlayDialogBlock } from '../../../blocks/molecules/OverlayDialog.block';
import { SectionTitleBlock } from '../../../blocks/molecules/SectionTitle.block';
import { ListStatusTabsBlock } from '../../../blocks/molecules/ListStatusTabs.block';
import { TablePaginationBlock } from '../../../blocks/molecules/TablePagination.block';
import { ViewModeToggleBlock } from '../../../blocks/molecules/ViewModeToggle.block';
import { DataTableBlock, type DataTableColumn } from '../../../blocks/organisms/DataTable.block';
import { ListToolbarBlock } from '../../../blocks/organisms/ListToolbar.block';
import type { ProjectSelectorCardItem } from '../../../blocks/organisms/ProjectSelectorCard.block';
import { WorkPageShellBlock } from '../../../blocks/organisms/WorkPageShell.block';
import type { WorkPageTemplateVariant } from '../../../blocks/organisms/WorkPageTemplateCanvas.block';
import { ProjectSelectorPanelBlock } from '../../../blocks/organisms/ProjectSelectorPanel.block';
import { ProjectWorkspaceActivityCardsBlock } from '../../../blocks/organisms/ProjectWorkspaceActivityCards.block';
import { ProjectJobsOnProcessDrawerBlock } from '../../../blocks/organisms/ProjectJobsOnProcessDrawer.block';
import { ProjectWorkspaceSidebarBlock, type ProjectMemberRole } from '../../../blocks/organisms/ProjectWorkspaceSidebar.block';
import { ScreenDescriptionPanelBlock } from '../../../blocks/organisms/ScreenDescriptionPanel.block';
import { projectSelectorRows } from '../../../data-spec/mocks/projectSelector.mock';
import { workspaceJobsOnProcessRows } from '../../../data-spec/mocks/workspaceJobs.mock';
import {
  createGlobalTopNavItems,
  createTemporaryTopUtilityButtons,
  globalTopNavActions,
  globalTopNavBrandIcon,
} from '../../../navigation/globalTopNav';
import type { LibrarySource } from '../../library/Library/Library.schema';
import { projectWorkspaceUxDescription } from './ProjectWorkspace.ux';

type Props = {
  projectId: string;
  onNavigate: (path: string) => void;
};

type HighlightKey =
  | 'workspaceHeader'
  | 'workspaceTab'
  | 'workspaceActivities'
  | 'workspaceToolbar'
  | 'workspaceTable'
  | 'workspaceJobsDrawer'
  | 'sidebar';
type WorkspaceTab = 'dataFoundry' | 'modelInstitute';
type WorkspaceDatasetRow = {
  id: string;
  sourceType: LibrarySource;
  no: string;
  name: string;
  version: string;
  time: string;
  worker: string;
  preprocessor: string;
};
type WorkspaceActivityKey = 'register' | 'collector' | 'generator' | 'curator' | 'trainer' | 'evaluator';

const sourceOptions: Array<{ value: LibrarySource; label: string }> = [
  { value: 'all', label: 'Source : All' },
  { value: 'register', label: 'Source : Register' },
  { value: 'collector', label: 'Source : Collector' },
  { value: 'generator', label: 'Source : Generator' },
  { value: 'curator', label: 'Source : Curator' },
  { value: 'trainer', label: 'Source : Trainer' },
  { value: 'evaluator', label: 'Source : Evaluator' },
];

const workspaceTableColumns: DataTableColumn[] = [
  { key: 'no', label: 'No.', align: 'center' },
  { key: 'name', label: 'Dataset Name' },
  { key: 'version', label: 'Version', align: 'center' },
  { key: 'source', label: 'Source', align: 'center' },
  { key: 'time', label: 'Time', align: 'center' },
  { key: 'worker', label: 'Worker', align: 'center' },
  { key: 'preprocessor', label: 'Preprocessor', align: 'center' },
  { key: 'action', label: 'Action', align: 'center' },
];

export function ProjectWorkspaceScreen({ projectId, onNavigate }: Props): JSX.Element {
  const [isUxOpen, setIsUxOpen] = React.useState(false);
  const [highlightedKey, setHighlightedKey] = React.useState<HighlightKey | null>(null);
  const [isProjectSelectorOpen, setIsProjectSelectorOpen] = React.useState(false);
  const [projectSearch, setProjectSearch] = React.useState('');
  const [activeWorkPageActivity, setActiveWorkPageActivity] = React.useState<WorkspaceActivityKey | null>(null);
  const [selectedProjectId, setSelectedProjectId] = React.useState<string>('PJT-002');
  const [pendingProjectId, setPendingProjectId] = React.useState<string | null>('PJT-002');
  const [workspaceTab, setWorkspaceTab] = React.useState<WorkspaceTab>('dataFoundry');
  const [searchValue, setSearchValue] = React.useState('');
  const [sortValue, setSortValue] = React.useState('recent');
  const [sourceValue, setSourceValue] = React.useState<LibrarySource>('all');
  const [pageSize, setPageSize] = React.useState(20);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isJobsDrawerOpen, setIsJobsDrawerOpen] = React.useState(false);
  const [publishTargetId, setPublishTargetId] = React.useState<string | null>(null);
  const [publishedIds, setPublishedIds] = React.useState<string[]>([]);

  const navItems = createGlobalTopNavItems('projects', onNavigate);
  const utilityButtons = createTemporaryTopUtilityButtons(() => setIsUxOpen(true), () => onNavigate('/'));

  const projectOptions: Array<ProjectSelectorCardItem & { nickname: string; roles: ProjectMemberRole[] }> = projectSelectorRows;

  React.useEffect(() => {
    const resolved =
      projectOptions.find((item) => item.id.toLowerCase() === projectId.toLowerCase()) ?? projectOptions.find((item) => item.id === 'PJT-002');
    if (!resolved) return;
    setSelectedProjectId(resolved.id);
    setPendingProjectId(resolved.id);
  }, [projectId]);

  const currentProject = projectOptions.find((item) => item.id === selectedProjectId) ?? projectOptions[0];
  const activeProjectTitle = currentProject.name;
  const filteredProjectOptions = projectOptions.filter((item) => item.name.toLowerCase().includes(projectSearch.trim().toLowerCase()));

  const activityItems =
    workspaceTab === 'dataFoundry'
      ? [
          { key: 'register', title: 'Register', description: 'Upload existing data to the platform.' },
          { key: 'collector', title: 'Collect', description: 'Data collection through teleoperation.' },
          { key: 'generator', title: 'Generate', description: 'Augment and produce datasets.' },
          { key: 'curator', title: 'Curate', description: 'Merge datasets and create a new data.' },
        ]
      : [
          { key: 'trainer', title: 'Trainer', description: 'Train and fine-tune models.' },
          { key: 'evaluator', title: 'Evaluator', description: 'Evaluate model quality and robustness.' },
        ];
  const workPageConfigMap: Record<WorkspaceActivityKey, { title: string; variant: WorkPageTemplateVariant }> = {
    register: { title: 'Data Register', variant: 'type2-parameter-only' },
    collector: { title: 'Data Collect', variant: 'type1-parameter-preview' },
    generator: { title: 'Data Generate', variant: 'type1-parameter-preview' },
    curator: { title: 'Data Curate', variant: 'type2-parameter-columns' },
    trainer: { title: 'Model Train', variant: 'type4-save-deploy' },
    evaluator: { title: 'Model Evaluate', variant: 'type3-validation-progress' },
  };

  const datasetRows: WorkspaceDatasetRow[] = Array.from({ length: 50 }, (_, index) => {
    const sourceKeys: LibrarySource[] = ['register', 'collector', 'generator', 'curator', 'trainer', 'evaluator'];
    const source = sourceKeys[index % sourceKeys.length];
    return {
      id: `dataset-${index + 1}`,
      sourceType: source,
      no: String(index + 1),
      name: `Warehouse Scenarios Collection - Run #${112 + index}`,
      version: index % 3 === 0 ? 'v1.0' : 'v0.9',
      time: '2025-01-21 10:30:11',
      worker: 'Wiyoung',
      preprocessor: index % 2 === 0 ? 'O' : 'X',
    };
  });

  const filteredDatasetRows = datasetRows
    .filter((row) => {
      const bySearch = row.name.toLowerCase().includes(searchValue.trim().toLowerCase());
      const bySource = sourceValue === 'all' ? true : row.sourceType === sourceValue;
      return bySearch && bySource;
    })
    .sort((a, b) => {
      if (sortValue === 'name') return a.name.localeCompare(b.name);
      return Number(b.no) - Number(a.no);
    });

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, sourceValue, sortValue, workspaceTab, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filteredDatasetRows.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pagedDatasetRows = filteredDatasetRows.slice((safePage - 1) * pageSize, safePage * pageSize);

  const rows = pagedDatasetRows
    .map((row) => {
      const sourceLabel = row.sourceType.charAt(0).toUpperCase() + row.sourceType.slice(1);
      const isPublished = publishedIds.includes(row.id);
      return {
        datasetId: row.id,
        no: row.no,
        name: row.name,
        version: row.version,
        source: (
          <span className="rounded-full border border-slate-300 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-700">{sourceLabel}</span>
        ),
        time: row.time,
        worker: row.worker,
        preprocessor: row.preprocessor,
        action: (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              if (isPublished) return;
              setPublishTargetId(row.id);
            }}
            disabled={isPublished}
            className={[
              'rounded border px-2 py-0.5 text-[10px]',
              isPublished
                ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
            ].join(' ')}
          >
            {isPublished ? 'Published' : 'Publish'}
          </button>
        ),
      };
    });
  const highlightClass = (key: HighlightKey): string =>
    highlightedKey === key ? 'relative rounded-lg ring-2 ring-indigo-400 ring-offset-2 transition' : '';

  return (
    <>
      <main className="min-h-screen bg-slate-100">
        <GlobalTopNavBlock
          brand="PhysicalWorksForge"
          brandIcon={globalTopNavBrandIcon}
          onBrandClick={() => onNavigate('/home')}
          items={navItems}
          utilityButtons={utilityButtons}
          actions={globalTopNavActions}
        />

        <div
          className={
            isUxOpen
              ? 'pr-0 transition-[padding] duration-300 lg:pr-[440px]'
              : 'transition-[padding] duration-300'
          }
        >
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[200px_minmax(0,1fr)]">
            <div className={highlightClass('sidebar')}>
              <ProjectWorkspaceSidebarBlock
                projectTitle={activeProjectTitle}
                onProjectTitleClick={() => {
                  setPendingProjectId(selectedProjectId);
                  setIsProjectSelectorOpen(true);
                }}
                items={[
                  { key: 'dashboard', label: 'Dashboard', onClick: () => onNavigate(`/projects/${selectedProjectId}`) },
                  { key: 'workspace', label: 'Workspace', active: true },
                  { key: 'settings', label: 'Settings' },
                ]}
                profileName={currentProject.nickname}
                profileRoles={currentProject.roles}
              />
            </div>

            <section className="space-y-4">
              <div className={highlightClass('workspaceHeader')}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Workspace</h1>
                    <p className="mt-1.5 text-sm text-slate-600">Project description goes here. This should be a short summary of the project.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsJobsDrawerOpen(true)}
                    className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Jobs on process
                  </button>
                </div>
              </div>

              <div className={highlightClass('workspaceTab')}>
                <ListStatusTabsBlock
                  value={workspaceTab}
                  onChange={(value) => setWorkspaceTab(value as WorkspaceTab)}
                  items={[
                    { label: 'Data Foundry', value: 'dataFoundry' },
                    { label: 'Model Institute', value: 'modelInstitute' },
                  ]}
                />
                <div className={['mt-4', highlightClass('workspaceActivities')].join(' ')}>
                  <ProjectWorkspaceActivityCardsBlock
                    items={activityItems}
                    onClickActivity={(activity) => {
                      setActiveWorkPageActivity(activity as WorkspaceActivityKey);
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2">
                  <SectionTitleBlock title="Saved Datasets" count={filteredDatasetRows.length} countLabel="datasets" />
                </div>
                <div className={highlightClass('workspaceToolbar')}>
                  <ListToolbarBlock
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    searchAriaLabel="Search saved datasets"
                    chips={[]}
                    rightExtras={
                      <div className="flex items-center gap-2">
                        <ListSortSelectBlock
                          value={sourceValue}
                          options={sourceOptions}
                          ariaLabel="Source filter"
                          onChange={(value) => setSourceValue(value as LibrarySource)}
                        />
                        <ViewModeToggleBlock value="list" onChange={() => {}} />
                      </div>
                    }
                    sortValue={sortValue}
                    sortOptions={[
                      { value: 'recent', label: 'Sort by : Recently Added' },
                      { value: 'name', label: 'Sort by : Name' },
                    ]}
                    sortAriaLabel="Dataset sort"
                    onSortChange={setSortValue}
                  />
                </div>
                <div className={['mt-2', highlightClass('workspaceTable')].join(' ')}>
                  <DataTableBlock
                    columns={workspaceTableColumns}
                    rows={rows}
                    emptyText="No dataset rows found."
                  />
                </div>
                <div className="mt-2">
                  <TablePaginationBlock
                    currentPage={safePage}
                    pageSize={pageSize}
                    totalItems={filteredDatasetRows.length}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                    totalLabel={`Total ${filteredDatasetRows.length.toLocaleString()}건`}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <ScreenDescriptionPanelBlock
        isOpen={isUxOpen}
        title={projectWorkspaceUxDescription.title}
        summary={projectWorkspaceUxDescription.summary}
        items={projectWorkspaceUxDescription.items}
        onClose={() => {
          setIsUxOpen(false);
          setHighlightedKey(null);
        }}
        onItemEnter={(key) => setHighlightedKey(key as HighlightKey)}
        onItemLeave={() => setHighlightedKey(null)}
      />

      <ProjectJobsOnProcessDrawerBlock isOpen={isJobsDrawerOpen} jobs={workspaceJobsOnProcessRows} onClose={() => setIsJobsDrawerOpen(false)} />
      <WorkPageShellBlock
        isOpen={activeWorkPageActivity !== null}
        title={activeWorkPageActivity ? workPageConfigMap[activeWorkPageActivity].title : 'Work Page'}
        variant={activeWorkPageActivity ? workPageConfigMap[activeWorkPageActivity].variant : 'type1-parameter-preview'}
        onClose={() => setActiveWorkPageActivity(null)}
        onHistoryClick={() => {
          window.alert('History panel will be connected in next step.');
        }}
      />

      <ProjectSelectorPanelBlock
        isOpen={isProjectSelectorOpen}
        title="Project"
        count={projectOptions.length}
        searchValue={projectSearch}
        onSearchChange={setProjectSearch}
        items={filteredProjectOptions}
        selectedProjectId={pendingProjectId}
        onSelectProject={setPendingProjectId}
        onClose={() => setIsProjectSelectorOpen(false)}
        onCreateProject={() => onNavigate('/projects/new')}
        onConfirmSelect={() => {
          if (!pendingProjectId) return;
          setSelectedProjectId(pendingProjectId);
          setIsProjectSelectorOpen(false);
          onNavigate(`/projects/${pendingProjectId}/workspace`);
        }}
      />

      <OverlayDialogBlock title="Publish Confirmation" isOpen={publishTargetId !== null} onClose={() => setPublishTargetId(null)}>
        <p className="text-sm text-slate-700">선택한 데이터셋을 Publish 하시겠습니까?</p>
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setPublishTargetId(null)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => {
              if (!publishTargetId) return;
              setPublishedIds((prev) => (prev.includes(publishTargetId) ? prev : [...prev, publishTargetId]));
              setPublishTargetId(null);
            }}
            className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            확인
          </button>
        </div>
      </OverlayDialogBlock>
    </>
  );
}
