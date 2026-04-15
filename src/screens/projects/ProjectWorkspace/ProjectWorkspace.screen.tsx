import React from 'react';
import type { NavigateOptions } from 'react-router-dom';

import { GlobalTopNavBlock } from '../../../blocks/molecules/GlobalTopNav.block';
import { ListSortSelectBlock } from '../../../blocks/molecules/ListSortSelect.block';
import { OverlayDialogBlock } from '../../../blocks/molecules/OverlayDialog.block';
import { EditProfilePanelBlock } from '../../../blocks/organisms/EditProfilePanel.block';
import { SectionTitleBlock } from '../../../blocks/molecules/SectionTitle.block';
import { ListStatusTabsBlock } from '../../../blocks/molecules/ListStatusTabs.block';
import { TablePaginationBlock } from '../../../blocks/molecules/TablePagination.block';
import { ViewModeToggleBlock } from '../../../blocks/molecules/ViewModeToggle.block';
import { DataTableBlock, type DataTableColumn } from '../../../blocks/organisms/DataTable.block';
import { ListToolbarBlock } from '../../../blocks/organisms/ListToolbar.block';
import type { ProjectSelectorCardItem } from '../../../blocks/organisms/ProjectSelectorCard.block';
import { ActivitySaveDatasetBlock } from '../../../blocks/organisms/ActivitySaveDataset.block';
import { ActivityValidationBlock } from '../../../blocks/organisms/ActivityValidation.block';
import { WorkPageShellBlock, type WorkFlowStep } from '../../../blocks/organisms/WorkPageShell.block';
import { CollectTeleoperationStepBlock } from '../../../blocks/organisms/CollectTeleoperationStep.block';
import { SyntheticVideoCreationStepBlock } from '../../../blocks/organisms/SyntheticVideoCreationStep.block';
import { WorkPageTemplateCanvasBlock, type WorkPageTemplateVariant } from '../../../blocks/organisms/WorkPageTemplateCanvas.block';
import { ProjectSelectorPanelBlock } from '../../../blocks/organisms/ProjectSelectorPanel.block';
import { ProjectWorkspaceActivityCardsBlock } from '../../../blocks/organisms/ProjectWorkspaceActivityCards.block';
import { ActivityDraftHistoryDrawerBlock } from '../../../blocks/organisms/ActivityDraftHistoryDrawer.block';
import { ProjectJobsOnProcessDrawerBlock } from '../../../blocks/organisms/ProjectJobsOnProcessDrawer.block';
import { chipSourceActivityClasses } from '../../../blocks/styles/chipClasses';
import { ProjectWorkspaceSidebarBlock, type ProjectMemberRole } from '../../../blocks/organisms/ProjectWorkspaceSidebar.block';
import { ScreenDescriptionPanelBlock } from '../../../blocks/organisms/ScreenDescriptionPanel.block';
import { ToastBlock } from '../../../blocks/molecules/Toast.block';
import { projectSelectorRows } from '../../../data-spec/mocks/projectSelector.mock';
import type {
  ActivityDraftActivityKey,
  ActivityDraftSession,
} from '../../../data-spec/mocks/activityDraftHistory.mock';
import { activityDraftSessionsMock, createActivityDraftSnapshot } from '../../../data-spec/mocks/activityDraftHistory.mock';
import { getActivitySaveSummary, getDefaultSaveDraft } from '../../../data-spec/mocks/activitySaveDataset.mock';
import { getPreprocessorRecordCountForActivity } from '../../../data-spec/mocks/activityWorkflowCounts.mock';
import { workspaceJobsOnProcessRows } from '../../../data-spec/mocks/workspaceJobs.mock';
import { useLanguage } from '../../../context/LanguageContext';
import { uiTitleCase } from '../../../utils/titleCase';
import {
  createGlobalTopNavItems,
  createTemporaryTopUtilityButtons,
  globalTopNavBrandIcon,
  useGlobalTopNavActions,
} from '../../../navigation/globalTopNav';
import { hrefWorkspaceActivity, hrefWithWorkspaceOverlay } from '../../../navigation/workspaceActivityRoute';
import type { LibrarySource } from '../../library/Library/Library.schema';
import { projectWorkspaceUxDescription } from './ProjectWorkspace.ux';

type Props = {
  projectId: string;
  workKey?: string;
  /** Query `generateMode` when opening Generate (synthetic-video | mimic-augmentation | idm) */
  generateMode?: string;
  /** Current route pathname (no query), e.g. /projects/PJT/workspace/generator */
  workspacePathname: string;
  /** Current route search including `?`, e.g. ?generateMode=synthetic-video — required to open overlays without dropping sub-flow */
  workspaceSearch: string;
  overlayKey?: string;
  /** Router location.state에서 넘어온 임시저장 복원 페이로드 */
  draftRestore?: ActivityDraftSession;
  onClearDraftRestore?: () => void;
  onNavigate: (to: string, options?: NavigateOptions) => void;
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

const workspaceActivityKeys: WorkspaceActivityKey[] = ['register', 'collector', 'generator', 'curator', 'trainer', 'evaluator'];

/** Data Foundry 산출물 — Source policy: register, collector, generator, curator */
const DATA_FOUNDRY_SOURCES: Exclude<LibrarySource, 'all'>[] = ['register', 'collector', 'generator', 'curator'];
/** Model Institute 산출물 — Source policy: trainer, evaluator */
const MODEL_INSTITUTE_SOURCES: Exclude<LibrarySource, 'all'>[] = ['trainer', 'evaluator'];

function isWorkspaceActivityKey(value: string | undefined): value is WorkspaceActivityKey {
  if (!value) return false;
  return workspaceActivityKeys.includes(value as WorkspaceActivityKey);
}

const SOURCE_FILTER_LABEL: Record<Exclude<LibrarySource, 'all'>, string> = {
  register: 'Register',
  collector: 'Collector',
  generator: 'Generator',
  curator: 'Curator',
  trainer: 'Trainer',
  evaluator: 'Evaluator',
};

function buildWorkspaceSourceOptions(tab: WorkspaceTab): Array<{ value: LibrarySource; label: string }> {
  const keys = tab === 'dataFoundry' ? DATA_FOUNDRY_SOURCES : MODEL_INSTITUTE_SOURCES;
  return [{ value: 'all', label: 'Source : All' }, ...keys.map((k) => ({ value: k, label: `Source : ${SOURCE_FILTER_LABEL[k]}` }))];
}

const GENERATE_ACTIVITY_MENU_OPTIONS = [
  { id: 'synthetic-video', label: 'Synthetic Video Creation' },
  { id: 'mimic-augmentation', label: 'Mimic Augmentation' },
  { id: 'idm', label: 'IDM' },
] as const;

function resolveGenerateModeLabel(raw: string | undefined): string | null {
  if (!raw) return null;
  const found = GENERATE_ACTIVITY_MENU_OPTIONS.find((o) => o.id === raw);
  return found ? found.label : null;
}

function createInitialDataFoundrySavedRows(): WorkspaceDatasetRow[] {
  return Array.from({ length: 40 }, (_, index) => {
    const source = DATA_FOUNDRY_SOURCES[index % DATA_FOUNDRY_SOURCES.length];
    return {
      id: `df-dataset-${index + 1}`,
      sourceType: source,
      no: String(index + 1),
      name: `Warehouse Scenarios Collection - Run #${112 + index}`,
      version: index % 3 === 0 ? 'v1.0' : 'v0.9',
      time: '2025-01-21 10:30:11',
      worker: 'Wiyoung',
      preprocessor: index % 2 === 0 ? 'O' : 'X',
    };
  });
}

function isDataFoundryWorkspaceActivity(activity: WorkspaceActivityKey): boolean {
  return (DATA_FOUNDRY_SOURCES as readonly string[]).includes(activity);
}

const modelInstituteSavedRows: WorkspaceDatasetRow[] = Array.from({ length: 32 }, (_, index) => {
  const source = MODEL_INSTITUTE_SOURCES[index % MODEL_INSTITUTE_SOURCES.length];
  return {
    id: `mi-model-${index + 1}`,
    sourceType: source,
    no: String(index + 1),
    name: `Manipulation Policy Checkpoint - Run #${340 + index}`,
    version: index % 2 === 0 ? 'v2.1' : 'v2.0',
    time: '2025-02-03 14:22:08',
    worker: 'Wiyoung',
    preprocessor: index % 2 === 0 ? 'O' : 'X',
  };
});

export function ProjectWorkspaceScreen({
  projectId,
  workKey,
  generateMode,
  workspacePathname,
  workspaceSearch,
  overlayKey,
  draftRestore,
  onClearDraftRestore,
  onNavigate,
}: Props): JSX.Element {
  const [isUxOpen, setIsUxOpen] = React.useState(false);
  const [highlightedKey, setHighlightedKey] = React.useState<HighlightKey | null>(null);
  const [projectSearch, setProjectSearch] = React.useState('');
  const [selectedProjectId, setSelectedProjectId] = React.useState<string>('PJT-002');
  const [pendingProjectId, setPendingProjectId] = React.useState<string | null>('PJT-002');
  const [workspaceTab, setWorkspaceTab] = React.useState<WorkspaceTab>('dataFoundry');
  const [searchValue, setSearchValue] = React.useState('');
  const [sortValue, setSortValue] = React.useState('recent');
  const [sourceValue, setSourceValue] = React.useState<LibrarySource>('all');
  const [pageSize, setPageSize] = React.useState(20);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [publishTargetId, setPublishTargetId] = React.useState<string | null>(null);
  const [publishedIds, setPublishedIds] = React.useState<string[]>([]);
  const [isProjectSelectorOpen, setIsProjectSelectorOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [editProfileDisplayName, setEditProfileDisplayName] = React.useState('');
  const [workFlowStep, setWorkFlowStep] = React.useState<WorkFlowStep>(1);
  const [workFlowMaxStep, setWorkFlowMaxStep] = React.useState<WorkFlowStep>(1);
  const [saveDatasetName, setSaveDatasetName] = React.useState('');
  const [saveDatasetDescription, setSaveDatasetDescription] = React.useState('');
  const [preprocessorContextDatasetName, setPreprocessorContextDatasetName] = React.useState('{Created Data Set Name}');
  const [activityRestoreKey, setActivityRestoreKey] = React.useState(0);
  const [lastRestoredDraft, setLastRestoredDraft] = React.useState<ActivityDraftSession | null>(null);
  const [activityDraftSessions, setActivityDraftSessions] = React.useState<ActivityDraftSession[]>(() => [...activityDraftSessionsMock]);
  const [dataFoundrySavedRowsState, setDataFoundrySavedRowsState] = React.useState<WorkspaceDatasetRow[]>(createInitialDataFoundrySavedRows);
  const [saveToast, setSaveToast] = React.useState<{ message: string } | null>(null);
  const [highlightedSavedRowId, setHighlightedSavedRowId] = React.useState<string | null>(null);
  const prevWorkFlowStepRef = React.useRef<WorkFlowStep>(workFlowStep);
  const skipDefaultSaveForStep3Ref = React.useRef(false);
  const draftRestoreAppliedIdRef = React.useRef<string | null>(null);
  const workPageContentScrollRef = React.useRef<HTMLDivElement>(null);

  const { t, locale } = useLanguage();
  const globalTopNavActions = useGlobalTopNavActions();
  const navItems = createGlobalTopNavItems('projects', onNavigate, t);
  const utilityButtons = createTemporaryTopUtilityButtons(() => setIsUxOpen(true), () => onNavigate('/'), t);

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

  React.useEffect(() => {
    setEditProfileDisplayName(currentProject.nickname);
  }, [currentProject.nickname, currentProject.id]);

  React.useEffect(() => {
    if (isEditProfileOpen) setEditProfileDisplayName(currentProject.nickname);
  }, [isEditProfileOpen, currentProject.nickname]);
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
    trainer: { title: 'Model Train', variant: 'type1-parameter-preview' },
    evaluator: { title: 'Model Evaluate', variant: 'type3-validation-progress' },
  };
  const activeWorkPageActivity = isWorkspaceActivityKey(workKey) ? workKey : null;
  const generateModeLabel =
    activeWorkPageActivity === 'generator' ? resolveGenerateModeLabel(generateMode) : null;

  const workShellTitle =
    activeWorkPageActivity && generateModeLabel
      ? generateModeLabel
      : activeWorkPageActivity
        ? workPageConfigMap[activeWorkPageActivity].title
        : 'Work Page';

  const draftsForCurrentActivity = React.useMemo(() => {
    if (!activeWorkPageActivity) return [];
    let list = activityDraftSessions.filter((d) => d.activity === activeWorkPageActivity);
    if (activeWorkPageActivity === 'generator') {
      const modeNorm = (generateMode ?? '').trim();
      list = list.filter((d) => (d.generateMode ?? '').trim() === modeNorm);
    }
    return list;
  }, [activityDraftSessions, activeWorkPageActivity, generateMode]);

  const isJobsDrawerOpen = overlayKey === 'jobs-on-process';
  const openJobsDrawer = (): void =>
    onNavigate(hrefWithWorkspaceOverlay(workspacePathname, workspaceSearch, 'jobs-on-process'));
  const closeJobsDrawer = (): void => onNavigate(hrefWithWorkspaceOverlay(workspacePathname, workspaceSearch, null));

  const isActivityHistoryDrawerOpen = overlayKey === 'activity-draft-history';
  const openActivityHistoryDrawer = (): void =>
    onNavigate(hrefWithWorkspaceOverlay(workspacePathname, workspaceSearch, 'activity-draft-history'));
  const closeActivityHistoryDrawer = (): void =>
    onNavigate(hrefWithWorkspaceOverlay(workspacePathname, workspaceSearch, null));

  const handleSelectActivityDraft = (draft: ActivityDraftSession): void => {
    draftRestoreAppliedIdRef.current = null;
    onNavigate(hrefWorkspaceActivity(selectedProjectId, draft.activity, { generateMode: draft.generateMode }), {
      state: { activityDraftRestore: draft },
    });
  };

  const handleSaveActivityDraft = (): void => {
    if (!activeWorkPageActivity) return;
    const key = activeWorkPageActivity;
    const cfgTitle = workPageConfigMap[key].title;
    const title = `${cfgTitle} — ${t('workspace.draft.snapshotTitleSuffix')} · ${new Date().toLocaleString()}`;
    const step1Parameters =
      lastRestoredDraft && lastRestoredDraft.step1Parameters.length > 0
        ? lastRestoredDraft.step1Parameters
        : [
            { label: t('workspace.draft.paramActivity'), value: key },
            { label: t('workspace.draft.paramStep'), value: String(workFlowStep) },
          ];
    const draft = createActivityDraftSnapshot({
      activity: key,
      generateMode: key === 'generator' ? generateMode : undefined,
      title,
      savedAtLabel: t('workspace.draft.savedJustNow'),
      step: workFlowStep as 1 | 2 | 3,
      maxUnlockedStep: workFlowMaxStep as 1 | 2 | 3,
      step1Parameters,
      preprocessorContextDatasetTitle: preprocessorContextDatasetName,
      saveDatasetName,
      saveDatasetDescription,
    });
    setActivityDraftSessions((prev) => [draft, ...prev]);
    openActivityHistoryDrawer();
  };

  const savedRowsForTab = workspaceTab === 'dataFoundry' ? dataFoundrySavedRowsState : modelInstituteSavedRows;

  const dismissSaveToast = React.useCallback(() => setSaveToast(null), []);

  const workspaceSourceOptions = React.useMemo(() => buildWorkspaceSourceOptions(workspaceTab), [workspaceTab]);

  const workspaceSavedTableColumns = React.useMemo((): DataTableColumn[] => {
    const nameLabel = workspaceTab === 'dataFoundry' ? 'Dataset Name' : 'Model Name';
    return [
      { key: 'no', label: 'No.', align: 'center' },
      { key: 'name', label: nameLabel },
      { key: 'version', label: 'Version', align: 'center' },
      { key: 'source', label: 'Source', align: 'center' },
      { key: 'time', label: 'Time', align: 'center' },
      { key: 'worker', label: 'Worker', align: 'center' },
      { key: 'preprocessor', label: 'Preprocessor', align: 'center' },
      { key: 'action', label: 'Action', align: 'center' },
    ];
  }, [workspaceTab]);

  React.useEffect(() => {
    setSourceValue('all');
  }, [workspaceTab]);

  const filteredDatasetRows = savedRowsForTab
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

  React.useEffect(() => {
    if (!highlightedSavedRowId) return;
    const id = window.setTimeout(() => setHighlightedSavedRowId(null), 10000);
    return () => window.clearTimeout(id);
  }, [highlightedSavedRowId]);

  React.useEffect(() => {
    if (!activeWorkPageActivity) return;
    setWorkFlowStep(1);
    setWorkFlowMaxStep(1);
    setPreprocessorContextDatasetName('{Created Data Set Name}');
    setLastRestoredDraft(null);
  }, [activeWorkPageActivity]);

  React.useEffect(() => {
    if (!draftRestore) {
      draftRestoreAppliedIdRef.current = null;
      return;
    }
    if (!activeWorkPageActivity) return;
    if (draftRestore.activity !== activeWorkPageActivity) return;
    if (draftRestoreAppliedIdRef.current === draftRestore.id) return;
    draftRestoreAppliedIdRef.current = draftRestore.id;
    skipDefaultSaveForStep3Ref.current = true;
    setWorkFlowStep(draftRestore.step as WorkFlowStep);
    setWorkFlowMaxStep(draftRestore.maxUnlockedStep as WorkFlowStep);
    prevWorkFlowStepRef.current = draftRestore.step as WorkFlowStep;
    setPreprocessorContextDatasetName(draftRestore.preprocessorContextDatasetTitle);
    const def = getDefaultSaveDraft(activeWorkPageActivity);
    setSaveDatasetName(draftRestore.saveDatasetName.trim() ? draftRestore.saveDatasetName : def.datasetName);
    setSaveDatasetDescription(draftRestore.saveDatasetDescription.trim() ? draftRestore.saveDatasetDescription : def.description);
    setActivityRestoreKey((k) => k + 1);
    setLastRestoredDraft(draftRestore);
    onClearDraftRestore?.();
  }, [draftRestore, activeWorkPageActivity, onClearDraftRestore]);

  React.useEffect(() => {
    if (!activeWorkPageActivity) return;
    if (prevWorkFlowStepRef.current === 2 && workFlowStep === 3) {
      workPageContentScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const enteredSaveStep = prevWorkFlowStepRef.current !== 3 && workFlowStep === 3;
    if (enteredSaveStep) {
      if (skipDefaultSaveForStep3Ref.current) {
        skipDefaultSaveForStep3Ref.current = false;
      } else {
        const draft = getDefaultSaveDraft(activeWorkPageActivity);
        setSaveDatasetName(draft.datasetName);
        setSaveDatasetDescription(draft.description);
      }
    }
    prevWorkFlowStepRef.current = workFlowStep;
  }, [activeWorkPageActivity, workFlowStep]);

  const totalPages = Math.max(1, Math.ceil(filteredDatasetRows.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pagedDatasetRows = filteredDatasetRows.slice((safePage - 1) * pageSize, safePage * pageSize);

  const featuredRowIndexOnPage = React.useMemo(() => {
    if (workspaceTab !== 'dataFoundry' || highlightedSavedRowId === null) return null;
    const idx = pagedDatasetRows.findIndex((r) => r.id === highlightedSavedRowId);
    return idx >= 0 ? idx : null;
  }, [workspaceTab, highlightedSavedRowId, pagedDatasetRows]);

  const rows = pagedDatasetRows
    .map((row) => {
      const sourceLabel = row.sourceType.charAt(0).toUpperCase() + row.sourceType.slice(1);
      const isPublished = publishedIds.includes(row.id);
      return {
        datasetId: row.id,
        no: row.no,
        name: row.name,
        version: row.version,
        source: <span className={chipSourceActivityClasses}>{sourceLabel}</span>,
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
                  { key: 'settings', label: 'Settings', onClick: () => onNavigate(`/projects/${selectedProjectId}/workspace/settings`) },
                ]}
                profileName={currentProject.nickname}
                profileRoles={currentProject.roles}
                onProfileClick={() => setIsEditProfileOpen(true)}
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
                    onClick={openJobsDrawer}
                    className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {uiTitleCase(t('workspace.jobsButton'), locale)}
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
                    activityMenus={{ generator: [...GENERATE_ACTIVITY_MENU_OPTIONS] }}
                    onSelectActivityMenuOption={(activityKey, optionId) => {
                      onNavigate(
                        hrefWorkspaceActivity(selectedProjectId, activityKey as ActivityDraftActivityKey, {
                          generateMode: optionId,
                        }),
                      );
                    }}
                    onClickActivity={(activity) => {
                      const nextWorkKey = activity as WorkspaceActivityKey;
                      onNavigate(`/projects/${selectedProjectId}/workspace/${nextWorkKey}`);
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2">
                  <SectionTitleBlock
                    title={workspaceTab === 'dataFoundry' ? 'Saved Datasets' : 'Saved Models'}
                    count={filteredDatasetRows.length}
                    countLabel={workspaceTab === 'dataFoundry' ? 'datasets' : 'models'}
                  />
                </div>
                <div className={highlightClass('workspaceToolbar')}>
                  <ListToolbarBlock
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    searchAriaLabel={
                      workspaceTab === 'dataFoundry' ? 'Search saved datasets' : 'Search saved models'
                    }
                    chips={[]}
                    rightExtras={
                      <div className="flex items-center gap-2">
                        <ListSortSelectBlock
                          value={sourceValue}
                          options={workspaceSourceOptions}
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
                    sortAriaLabel={workspaceTab === 'dataFoundry' ? 'Dataset sort' : 'Model sort'}
                    onSortChange={setSortValue}
                  />
                </div>
                <div className={['mt-2', highlightClass('workspaceTable')].join(' ')}>
                  <DataTableBlock
                    columns={workspaceSavedTableColumns}
                    rows={rows}
                    emptyText={workspaceTab === 'dataFoundry' ? 'No dataset rows found.' : 'No model rows found.'}
                    featuredRowIndex={workspaceTab === 'dataFoundry' ? featuredRowIndexOnPage : null}
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

      <ProjectJobsOnProcessDrawerBlock isOpen={isJobsDrawerOpen} jobs={workspaceJobsOnProcessRows} onClose={closeJobsDrawer} />
      <ActivityDraftHistoryDrawerBlock
        isOpen={isActivityHistoryDrawerOpen}
        drafts={draftsForCurrentActivity}
        onClose={closeActivityHistoryDrawer}
        onSelectDraft={handleSelectActivityDraft}
      />
      <WorkPageShellBlock
        isOpen={activeWorkPageActivity !== null}
        locale={locale}
        title={workShellTitle}
        description={
          activeWorkPageActivity === 'collector'
            ? 'Record robot teleoperation episodes, run validation, then save as a dataset.'
            : activeWorkPageActivity === 'generator' && generateModeLabel
              ? 'Configure parameters, run generation, and review the output.'
              : 'Register, manage, and organize datasets with metadata, tags, ownership, and version tracking.'
        }
        currentStep={workFlowStep}
        maxUnlockedStep={workFlowMaxStep}
        onStepChange={setWorkFlowStep}
        onClose={() => onNavigate(`/projects/${selectedProjectId}/workspace`)}
        onHistoryClick={openActivityHistoryDrawer}
        onSaveDraftClick={handleSaveActivityDraft}
        historyButtonLabel={t('workspace.shell.loadDraft')}
        saveDraftButtonLabel={t('workspace.shell.saveDraft')}
        contentScrollRef={workPageContentScrollRef}
        stepLabels={
          activeWorkPageActivity === 'collector'
            ? ['teleoperation', 'pre-processor', 'save datasets']
            : activeWorkPageActivity === 'generator' && generateMode === 'synthetic-video'
              ? ['synthetic video generation', 'pre-processor', 'save datasets']
              : undefined
        }
      >
        {lastRestoredDraft ? (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-950">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold">Draft restored</p>
                <p className="mt-0.5 text-[11px] text-amber-900/90">
                  “{lastRestoredDraft.title}” — parameters below reflect this session.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLastRestoredDraft(null)}
                className="shrink-0 rounded-md px-2 py-1 text-[11px] font-medium text-amber-900 hover:bg-amber-100"
              >
                Dismiss
              </button>
            </div>
            {workFlowStep >= 2 ? (
              <p className="mt-2 text-[11px] text-amber-900/85">
                {t('workspace.draft.preprocessorContext')}{' '}
                <span className="font-medium">{lastRestoredDraft.preprocessorContextDatasetTitle}</span>
              </p>
            ) : null}
            <dl className="mt-2 grid gap-1.5 border-t border-amber-200/80 pt-2">
              {lastRestoredDraft.step1Parameters.map((row) => (
                <div key={`${lastRestoredDraft.id}-${row.label}`} className="flex flex-wrap gap-x-2 gap-y-0.5 text-[11px]">
                  <dt className="text-amber-800/90">{row.label}</dt>
                  <dd className="font-medium text-amber-950">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
        {activeWorkPageActivity !== null && workFlowStep === 1 && activeWorkPageActivity === 'collector' ? (
          <CollectTeleoperationStepBlock
            onProceedToStep2={() => {
              setWorkFlowMaxStep(2);
              setWorkFlowStep(2);
            }}
            onNotify={(message) => setSaveToast({ message })}
          />
        ) : null}
        {activeWorkPageActivity !== null &&
        workFlowStep === 1 &&
        activeWorkPageActivity === 'generator' &&
        generateMode === 'synthetic-video' ? (
          <SyntheticVideoCreationStepBlock
            onProceedToStep2={() => {
              setWorkFlowMaxStep(2);
              setWorkFlowStep(2);
            }}
            onNotify={(message) => setSaveToast({ message })}
          />
        ) : null}
        {activeWorkPageActivity !== null &&
        workFlowStep === 1 &&
        (activeWorkPageActivity !== 'collector' &&
          !(activeWorkPageActivity === 'generator' && generateMode === 'synthetic-video')) ? (
          <WorkPageTemplateCanvasBlock
            variant={workPageConfigMap[activeWorkPageActivity].variant}
            step1Footer={{
              onPrimary: () => {
                setWorkFlowMaxStep(2);
                setWorkFlowStep(2);
              },
              primaryLabel: 'register',
            }}
          />
        ) : null}
        {activeWorkPageActivity !== null && workFlowStep === 2 ? (
          <ActivityValidationBlock
            key={`${activeWorkPageActivity}-${activityRestoreKey}`}
            datasetName={preprocessorContextDatasetName}
            preprocessorRecordCount={getPreprocessorRecordCountForActivity(activeWorkPageActivity)}
            onPrevious={() => setWorkFlowStep(1)}
            onApplyPreprocessorResult={() => {
              setWorkFlowMaxStep(3);
              setWorkFlowStep(3);
            }}
            onSkipPreprocessor={() => {
              setWorkFlowMaxStep(3);
              setWorkFlowStep(3);
            }}
          />
        ) : null}
        {activeWorkPageActivity !== null && workFlowStep === 3 ? (
          <ActivitySaveDatasetBlock
            key={`${activeWorkPageActivity}-${activityRestoreKey}`}
            datasetName={saveDatasetName}
            datasetDescription={saveDatasetDescription}
            onDatasetNameChange={setSaveDatasetName}
            onDatasetDescriptionChange={setSaveDatasetDescription}
            summary={getActivitySaveSummary(activeWorkPageActivity)}
            footer={{
              onPrevious: () => setWorkFlowStep(2),
              onPrimary: () => {
                if (!activeWorkPageActivity) return;
                if (isDataFoundryWorkspaceActivity(activeWorkPageActivity)) {
                  const def = getDefaultSaveDraft(activeWorkPageActivity);
                  const nameSnapshot = saveDatasetName.trim() ? saveDatasetName : def.datasetName;
                  const newId = `df-dataset-new-${Date.now()}`;
                  const now = new Date();
                  const pad = (n: number): string => String(n).padStart(2, '0');
                  const timeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
                  setDataFoundrySavedRowsState((prev) => {
                    const maxNo = prev.reduce((m, r) => Math.max(m, Number.parseInt(r.no, 10) || 0), 0);
                    const newRow: WorkspaceDatasetRow = {
                      id: newId,
                      sourceType: activeWorkPageActivity,
                      no: String(maxNo + 1),
                      name: nameSnapshot,
                      version: 'v1.0',
                      time: timeStr,
                      worker: 'Wiyoung',
                      preprocessor: 'O',
                    };
                    return [newRow, ...prev];
                  });
                  setWorkspaceTab('dataFoundry');
                  setSourceValue('all');
                  setSearchValue('');
                  setCurrentPage(1);
                  setHighlightedSavedRowId(newId);
                  setSaveToast({
                    message: `${t('workspace.toast.datasetCreated')} — ${nameSnapshot}`,
                  });
                }
                onNavigate(`/projects/${selectedProjectId}/workspace`);
              },
              primaryLabel: 'save dataset',
            }}
          />
        ) : null}
      </WorkPageShellBlock>

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

      <OverlayDialogBlock title="Edit Profile" isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} panelClassName="max-w-lg">
        <EditProfilePanelBlock
          displayName={editProfileDisplayName}
          onDisplayNameChange={setEditProfileDisplayName}
          roles={currentProject.roles}
          onSave={() => {
            window.alert('Profile saved (prototype).');
            setIsEditProfileOpen(false);
          }}
          onCancel={() => setIsEditProfileOpen(false)}
          onRequestDevRole={(role) => window.alert(`Access request sent: ${role} (prototype).`)}
        />
      </OverlayDialogBlock>

      <ToastBlock message={saveToast?.message ?? ''} isOpen={saveToast !== null} onDismiss={dismissSaveToast} />

      <OverlayDialogBlock title="Publish Confirmation" isOpen={publishTargetId !== null} onClose={() => setPublishTargetId(null)}>
        <p className="text-sm text-slate-700">
          {workspaceTab === 'modelInstitute'
            ? '선택한 모델을 Publish 하시겠습니까?'
            : '선택한 데이터셋을 Publish 하시겠습니까?'}
        </p>
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
