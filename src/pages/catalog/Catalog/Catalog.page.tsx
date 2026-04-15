import React from 'react';
import { Link } from 'react-router-dom';

import { appShellInnerClass } from '../../../styles/appLayoutClasses';

import { GlobalTopNavBlock } from '../../../blocks/molecules/GlobalTopNav.block';
import { ListHeaderBlock } from '../../../blocks/molecules/ListHeader.block';
import { OverlayDialogBlock } from '../../../blocks/molecules/OverlayDialog.block';
import { ProjectMetaInfoStripBlock } from '../../../blocks/molecules/ProjectMetaInfoStrip.block';
import { SectionTitleBlock } from '../../../blocks/molecules/SectionTitle.block';
import { ListStatusTabsBlock } from '../../../blocks/molecules/ListStatusTabs.block';
import { TablePaginationBlock } from '../../../blocks/molecules/TablePagination.block';
import { ViewModeToggleBlock, type ViewMode } from '../../../blocks/molecules/ViewModeToggle.block';
import { DataTableBlock } from '../../../blocks/organisms/DataTable.block';
import { LibraryAssetGridBlock } from '../../../blocks/organisms/LibraryAssetGrid.block';
import { ListToolbarBlock } from '../../../blocks/organisms/ListToolbar.block';
import { ProjectInfoListPanelBlock } from '../../../blocks/organisms/ProjectInfoListPanel.block';
import { ProjectOutputSummaryPanelBlock } from '../../../blocks/organisms/ProjectOutputSummaryPanel.block';
import { ProjectRobotInfoPanelBlock } from '../../../blocks/organisms/ProjectRobotInfoPanel.block';
import { ProjectSelectorCardBlock } from '../../../blocks/organisms/ProjectSelectorCard.block';
import { ProjectSelectorPanelBlock } from '../../../blocks/organisms/ProjectSelectorPanel.block';
import { ProjectTaskListBlock } from '../../../blocks/organisms/ProjectTaskList.block';
import { ProjectCardGridBlock } from '../../../blocks/organisms/ProjectCardGrid.block';
import { ProjectJobsOnProcessDrawerBlock } from '../../../blocks/organisms/ProjectJobsOnProcessDrawer.block';
import { ActivityDraftHistoryDrawerBlock } from '../../../blocks/organisms/ActivityDraftHistoryDrawer.block';
import { ActivitySaveDatasetBlock } from '../../../blocks/organisms/ActivitySaveDataset.block';
import { CollectTeleoperationStepBlock } from '../../../blocks/organisms/CollectTeleoperationStep.block';
import { CurateAnalyticsStepBlock } from '../../../blocks/organisms/CurateAnalyticsStep.block';
import { MergeDatasetsStepBlock, type MergeDatasetPickRow } from '../../../blocks/organisms/MergeDatasetsStep.block';
import { IdmTrajectoryStepBlock } from '../../../blocks/organisms/IdmTrajectoryStep.block';
import { MimicAugmentationStepBlock } from '../../../blocks/organisms/MimicAugmentationStep.block';
import { SyntheticVideoCreationStepBlock } from '../../../blocks/organisms/SyntheticVideoCreationStep.block';
import { ActivityValidationBlock } from '../../../blocks/organisms/ActivityValidation.block';
import { WorkPageShellBlock, type WorkFlowStep } from '../../../blocks/organisms/WorkPageShell.block';
import { WorkPageTemplateCanvasBlock } from '../../../blocks/organisms/WorkPageTemplateCanvas.block';
import { ProjectWorkspaceActivityCardsBlock } from '../../../blocks/organisms/ProjectWorkspaceActivityCards.block';
import { ProjectWorkspaceSidebarBlock } from '../../../blocks/organisms/ProjectWorkspaceSidebar.block';
import { WorkspaceItemDetailDrawerBlock } from '../../../blocks/organisms/WorkspaceItemDetailDrawer.block';
import { EditProfilePanelBlock } from '../../../blocks/organisms/EditProfilePanel.block';
import { InviteMemberPanelBlock } from '../../../blocks/organisms/InviteMemberPanel.block';
import { ToastBlock } from '../../../blocks/molecules/Toast.block';
import { ButtonCatalogShowcase } from '../../../blocks/molecules/Button.block';
import { ChipCatalogVariantShowcase } from '../../../blocks/molecules/Chip.block';
import { FormTagInputBlock } from '../../../blocks/molecules/FormTagInput.block';
import { WorkPageFormFieldBlock } from '../../../blocks/molecules/WorkPageFormField.block';
import { WorkPageFileUploadDropzoneBlock } from '../../../blocks/molecules/WorkPageFileUploadDropzone.block';
import { ActivityStepContainerBlock } from '../../../blocks/molecules/ActivityStepContainer.block';
import { WorkPageActivityFooterToolbarBlock } from '../../../blocks/molecules/WorkPageActivityFooterToolbar.block';
import { TabsShowcaseBlock } from '../../../blocks/molecules/TabsShowcase.block';
import { RobotSelectCardBlock } from '../../../blocks/molecules/RobotSelectCard.block';
import { buttonPrimarySmClasses, buttonSecondarySmClasses } from '../../../blocks/styles/buttonClasses';
import { libraryAssetRows } from '../../../data-spec/mocks/libraryAssets.mock';
import { projectCreateRobotOptions } from '../../../data-spec/mocks/projectCreateRobots.mock';
import { activityDraftSessionsMock } from '../../../data-spec/mocks/activityDraftHistory.mock';
import {
  filterInviteDirectoryUsers,
  inviteDirectoryUsers,
  INVITE_MEMBER_ROLE_OPTIONS,
} from '../../../data-spec/mocks/inviteDirectory.mock';
import { getActivitySaveSummary, getDefaultSaveDraft } from '../../../data-spec/mocks/activitySaveDataset.mock';
import { projectListRows } from '../../../data-spec/mocks/projectList.mock';
import { blockUnitItems, componentUnitItems, overlayUnitItems, screenPatternUnitItems } from '../../../descriptions/unitDefinitions';
import { buttonPrimaryMdClasses, buttonTableRowActionSmClasses } from '../../../blocks/styles/buttonClasses';
import { chipSourceActivityClasses } from '../../../blocks/styles/chipClasses';
import {
  formControlInputClasses,
  formControlInputMaxSmClasses,
  formControlSelectClasses,
  formControlTextareaClasses,
} from '../../../blocks/styles/formFieldClasses';
import { useLanguage } from '../../../context/LanguageContext';
import { createGlobalTopNavItems, globalTopNavBrandIcon, useGlobalTopNavActions } from '../../../navigation/globalTopNav';

type DescriptionTab = 'components' | 'blocks' | 'overlays' | 'screenPatterns';

function EditProfileCatalogPreview(): JSX.Element {
  const [name, setName] = React.useState('Mina Park');
  return (
    <div className="max-h-[min(440px,75vh)] overflow-auto rounded-md border border-slate-200 bg-white p-2">
      <EditProfilePanelBlock
        displayName={name}
        onDisplayNameChange={setName}
        roles={['data engineer']}
        onSave={() => {}}
        onCancel={() => {}}
        onRequestDevRole={() => {}}
      />
    </div>
  );
}

function InviteMemberCatalogPreview(): JSX.Element {
  const [email, setEmail] = React.useState('sam');
  const [results, setResults] = React.useState(() => filterInviteDirectoryUsers('sam', inviteDirectoryUsers));
  const [sel, setSel] = React.useState<string | null>('inv-u1');
  const [role, setRole] = React.useState(INVITE_MEMBER_ROLE_OPTIONS[1]!.value);
  return (
    <div className="max-h-[min(480px,80vh)] overflow-auto rounded-md border border-slate-200 bg-white p-2">
      <InviteMemberPanelBlock
        emailQuery={email}
        onEmailQueryChange={setEmail}
        onSearch={() => {
          setResults(filterInviteDirectoryUsers(email, inviteDirectoryUsers));
          setSel(null);
        }}
        searchResults={results}
        selectedUserId={sel}
        onSelectUser={setSel}
        inviteRole={role}
        onInviteRoleChange={setRole}
        roleOptions={INVITE_MEMBER_ROLE_OPTIONS}
        onInvite={() => {}}
        onCancel={() => {}}
      />
    </div>
  );
}

function FormTagInputCatalogPreview(): JSX.Element {
  const [tags, setTags] = React.useState(['tag1', 'tag2', 'tag3', 'tag4']);
  return (
    <div className="w-full max-w-sm rounded-md border border-slate-200 bg-white p-3">
      <FormTagInputBlock
        label="Tags"
        tags={tags}
        onTagsChange={setTags}
        inputPlaceholder="Placeholder"
        inputAriaLabel="Add tags"
      />
    </div>
  );
}

function WorkPageFileUploadDropzoneCatalogPreview(): JSX.Element {
  const [fileName, setFileName] = React.useState('');
  return (
    <div className="w-full max-w-md rounded-md border border-slate-200 bg-white p-3">
      <WorkPageFileUploadDropzoneBlock selectedFileName={fileName} onFileChange={(f) => setFileName(f?.name ?? '')} />
    </div>
  );
}

function WorkPageFormFieldCatalogPreview(): JSX.Element {
  const [v, setV] = React.useState('');
  return (
    <div className="w-full max-w-sm rounded-md border border-slate-200 bg-white p-3">
      <WorkPageFormFieldBlock label="Sample field" required>
        <input className={formControlInputClasses} value={v} onChange={(e) => setV(e.target.value)} placeholder="Placeholder" />
      </WorkPageFormFieldBlock>
    </div>
  );
}

type SampleCardProps = {
  title: string;
  blockId: string;
  description: string;
  codePath: string;
  children: React.ReactNode;
};

function SampleCard({ title, blockId, description, codePath, children }: SampleCardProps): JSX.Element {
  const { t } = useLanguage();
  const handleOpenCode = async (): Promise<void> => {
    const workspaceRoot = '/Users/wiyoung/Downloads/Forge_1';
    const absPath = `${workspaceRoot}/${codePath}`.replace(/\/+/g, '/');
    const vscodeUri = `vscode://file/${absPath}`;

    window.open(vscodeUri, '_self');

    try {
      await navigator.clipboard.writeText(codePath);
    } catch {
      // Ignore clipboard errors; deep-link open is primary action.
    }
  };

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-blue-50 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{title}</p>
            <p className="mt-1 rounded bg-white/80 px-1.5 py-0.5 font-mono text-xs text-slate-700">{blockId}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              void handleOpenCode();
            }}
            className="rounded-md border border-blue-200 bg-white px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-50"
            title={codePath}
          >
            {t('catalog.sampleCard.openCode')}
          </button>
        </div>
      </div>
      <div className="grid gap-3 p-4">
        <div>
          <p className="text-sm font-medium text-slate-900">{t('common.description')}</p>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
          <p className="mt-2 rounded bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-600">{codePath}</p>
        </div>
        <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-3">
          {children}
        </div>
      </div>
    </article>
  );
}

const CATALOG_MERGE_DATASET_PREVIEW_ROWS: MergeDatasetPickRow[] = [
  {
    id: 'cat-m1',
    no: '1',
    name: 'Warehouse Scenarios - Run #112',
    version: 'v1.0',
    sourceType: 'register',
    time: '2025-01-21 10:30',
    worker: 'Wiyoung',
  },
  {
    id: 'cat-m2',
    no: '2',
    name: 'Pick Route LiveCollect',
    version: 'v0.9',
    sourceType: 'collector',
    time: '2025-01-22 09:00',
    worker: 'Wiyoung',
  },
  {
    id: 'cat-m3',
    no: '3',
    name: 'Synth Grasp Batch',
    version: 'v1.0',
    sourceType: 'generator',
    time: '2025-01-23 11:15',
    worker: 'Wiyoung',
  },
  {
    id: 'cat-m4',
    no: '4',
    name: 'Curated Merge v0',
    version: 'v0.8',
    sourceType: 'curator',
    time: '2025-01-24 08:00',
    worker: 'Wiyoung',
  },
];

function CatalogGlobalTopNavPreview(): JSX.Element {
  const { t } = useLanguage();
  const actions = useGlobalTopNavActions();
  return (
    <div className="overflow-hidden rounded-md border border-slate-200">
      <GlobalTopNavBlock
        brand="PhysicalWorksForge"
        brandIcon={globalTopNavBrandIcon}
        onBrandClick={() => {}}
        items={createGlobalTopNavItems('home', () => {}, t)}
        actions={actions}
      />
    </div>
  );
}

export function CatalogPage(): JSX.Element {
  const { t } = useLanguage();
  const [sampleStatus, setSampleStatus] = React.useState('all');
  const [sampleViewMode, setSampleViewMode] = React.useState<ViewMode>('grid');
  const [sampleTab, setSampleTab] = React.useState<DescriptionTab>('components');
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [isPageExampleOpen, setIsPageExampleOpen] = React.useState(false);
  const [pageExamplePath, setPageExamplePath] = React.useState<string | null>(null);
  const [catalogWorkFlowStep, setCatalogWorkFlowStep] = React.useState<WorkFlowStep>(2);
  const catalogWorkFlowMax: WorkFlowStep = 3;
  const tabLabelMap = React.useMemo(
    (): Record<DescriptionTab, string> => ({
      components: t('catalog.tabLabel.components'),
      blocks: t('catalog.tabLabel.blocks'),
      overlays: t('catalog.tabLabel.overlays'),
      screenPatterns: t('catalog.tabLabel.screenPatterns'),
    }),
    [t],
  );

  const activeItems = (
    sampleTab === 'components'
      ? componentUnitItems
      : sampleTab === 'blocks'
        ? blockUnitItems
        : sampleTab === 'overlays'
          ? overlayUnitItems
          : screenPatternUnitItems
  ).filter((item) => item.renderable && item.usedInPrototype);
  const filteredItems = activeItems.filter((item) => {
    const q = searchKeyword.trim().toLowerCase();
    if (!q) return true;
    return item.title.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
  });
  const [selectedId, setSelectedId] = React.useState<string | null>(activeItems[0]?.id ?? null);

  React.useEffect(() => {
    if (filteredItems.length === 0) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !filteredItems.some((item) => item.id === selectedId)) {
      setSelectedId(filteredItems[0].id);
    }
  }, [filteredItems, selectedId]);

  const renderPreview = (id: string): React.ReactNode => {
    if (id === 'component.toast') {
      return (
        <ToastBlock
          layout="inline"
          message="New dataset has been created."
          isOpen
          onDismiss={() => {}}
          autoHideMs={0}
        />
      );
    }
    if (id === 'component.button') {
      return <ButtonCatalogShowcase />;
    }
    if (id === 'component.select') {
      return (
        <select className={formControlSelectClasses}>
          <option>Option A</option>
          <option>Option B</option>
        </select>
      );
    }
    if (id === 'component.input') {
      return (
        <input
          placeholder="Type here..."
          className={formControlInputMaxSmClasses}
        />
      );
    }
    if (id === 'component.textarea') {
      return (
        <textarea
          placeholder="Multiple lines…"
          rows={4}
          className={[formControlTextareaClasses, 'max-w-sm'].join(' ')}
        />
      );
    }
    if (id === 'component.tabs') {
      return <TabsShowcaseBlock />;
    }
    if (id === 'component.chip') {
      return <ChipCatalogVariantShowcase />;
    }
    if (id === 'component.toggle') {
      return <ViewModeToggleBlock value={sampleViewMode} onChange={setSampleViewMode} />;
    }
    if (id === 'component.card.project') {
      return <ProjectCardGridBlock items={projectListRows.slice(0, 1)} />;
    }
    if (id === 'component.card.library') {
      return <LibraryAssetGridBlock items={libraryAssetRows.slice(0, 2)} viewMode={sampleViewMode} />;
    }
    if (id === 'desc-rfm.listHeader') {
      return <ListHeaderBlock title="Sample Header" subtitle="Block-level preview" primaryAction={{ label: 'Create', onClick: () => {} }} />;
    }
    if (id === 'desc-rfm.sectionTitle') {
      return <SectionTitleBlock title="Saved Datasets" count={1248} countLabel="datasets" />;
    }
    if (id === 'desc-rfm.listToolbar') {
      return (
        <ListToolbarBlock
          searchValue=""
          onSearchChange={() => {}}
          searchAriaLabel="Catalog sample search"
          chips={[{ key: 'all', label: 'All', active: true, onClick: () => {} }]}
          rightExtras={<ViewModeToggleBlock value={sampleViewMode} onChange={setSampleViewMode} />}
          sortValue="recent"
          sortOptions={[
            { value: 'recent', label: 'Sort by : Recently Added' },
            { value: 'title', label: 'Sort by : Title' },
          ]}
          sortAriaLabel="Catalog sample sort"
          onSortChange={() => {}}
        />
      );
    }
    if (id === 'desc-rfm.listStatusTabs') {
      return (
        <div className="rounded-md border border-slate-200 bg-white p-3">
          <ListStatusTabsBlock
            value={sampleStatus}
            onChange={setSampleStatus}
            items={[
              { label: 'All', value: 'all' },
              { label: 'In Progress', value: 'in-progress' },
              { label: 'Completed', value: 'completed' },
            ]}
          />
        </div>
      );
    }
    if (id === 'desc-rfm.libraryAssetGrid') {
      return <LibraryAssetGridBlock items={libraryAssetRows.slice(0, 4)} viewMode={sampleViewMode} />;
    }
    if (id === 'desc-rfm.dataTable') {
      return (
        <DataTableBlock
          columns={[
            { key: 'no', label: 'No.', align: 'center' },
            { key: 'name', label: 'Dataset Name' },
            { key: 'source', label: 'Source', align: 'center' },
            { key: 'action', label: 'Action', align: 'center' },
          ]}
          rows={[
            {
              no: '1',
              name: 'Warehouse Scenarios Collection',
              source: <span className={chipSourceActivityClasses}>Generator</span>,
              action: (
                <button type="button" className={buttonTableRowActionSmClasses}>
                  Publish
                </button>
              ),
            },
            {
              no: '2',
              name: 'Dexmate Motion Dataset',
              source: <span className={chipSourceActivityClasses}>Curator</span>,
              action: (
                <button type="button" className={buttonTableRowActionSmClasses}>
                  Publish
                </button>
              ),
            },
          ]}
        />
      );
    }
    if (id === 'desc-rfm.tablePagination') {
      return <TablePaginationBlock currentPage={2} pageSize={10} totalItems={47} onPageChange={() => {}} />;
    }
    if (id === 'desc-rfm.projectWorkspaceSidebar') {
      return (
        <ProjectWorkspaceSidebarBlock
          projectTitle="{Project Title}"
          items={[
            { key: 'dashboard', label: 'Dashboard', active: true },
            { key: 'workspace', label: 'Workspace' },
            { key: 'settings', label: 'Settings' },
          ]}
          profileName="{Nickname}"
          profileRoles={['project owner', 'data engineer', 'model engineer']}
        />
      );
    }
    if (id === 'desc-rfm.projectMetaInfoStrip') {
      return (
        <ProjectMetaInfoStripBlock
          items={[
            { label: 'Task', value: 'Manipulation / Pick-and-Place' },
            { label: 'Robot', value: 'Dexmate Vega' },
            { label: 'Started Date', value: 'Apr 15, 2026' },
            { label: 'Owner', value: 'Robotics Team Alpha' },
          ]}
        />
      );
    }
    if (id === 'desc-rfm.projectTaskList') {
      return (
        <ProjectTaskListBlock
          title="Assigned Jobs"
          items={[
            {
              id: '1',
              title: 'To-do Name',
              tag: 'Data Build',
              description: 'Collect datasets through videos recorded by physical robots.',
              dueDate: 'Due: Apr 15, 2026',
              priority: 'Priority: High',
            },
          ]}
        />
      );
    }
    if (id === 'desc-rfm.projectWorkspaceActivityCards') {
      return (
        <ProjectWorkspaceActivityCardsBlock
          items={[
            { key: 'register', title: 'Register', description: 'Upload existing data to the platform.' },
            { key: 'collector', title: 'Collect', description: 'Data collection through teleoperation.' },
            { key: 'generator', title: 'Generate', description: 'Augment and produce datasets.' },
            { key: 'curator', title: 'Curate', description: 'Merge datasets and create a new data.' },
          ]}
          activityMenus={{
            generator: [
              { id: 'synthetic-video', label: 'Synthetic Video Generation' },
              { id: 'mimic-augmentation', label: 'Mimic Augmentation' },
              { id: 'idm', label: 'IDM' },
            ],
            curator: [
              { id: 'merge-datasets', label: 'Merge datasets' },
              { id: 'analytics', label: 'Analytics' },
            ],
          }}
          onSelectActivityMenuOption={() => {}}
        />
      );
    }
    if (id === 'desc-rfm.projectInfoListPanel') {
      return (
        <div className="space-y-4">
          <ProjectInfoListPanelBlock
            title="Recent completed Activity"
            items={[{ id: '1', title: '{Output Name}', subtitle: '(Work Description)', meta: 'Mar 26, 2026 · {User Name}', badge: 'Trainer' }]}
          />
          <ProjectInfoListPanelBlock
            title="Member (avatar + role chips)"
            items={[
              {
                id: 'm-1',
                title: 'Alex Chen',
                subtitle: 'alex.chen@company.com',
                meta: 'Last active · Today',
                member: { avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Catalog1', roles: ['project owner'] },
              },
            ]}
          />
        </div>
      );
    }
    if (id === 'desc-rfm.projectRobotInfoPanel') {
      return (
        <ProjectRobotInfoPanelBlock
          title="Robot Information"
          robotName="Dexmate Vega"
          lines={['Task: Pick & Place', 'Environment: Simulation', 'Gripper: RGB-D Camera']}
        />
      );
    }
    if (id === 'desc-rfm.projectOutputSummaryPanel') {
      return (
        <ProjectOutputSummaryPanelBlock
          title="Output"
          metrics={[
            { label: 'Datasets', value: '1,000', delta: '+2 increased this week' },
            { label: 'Model', value: '1,000', delta: '+2 increased this week' },
          ]}
        />
      );
    }
    if (id === 'desc-rfm.projectSelectorCard') {
      return (
        <ProjectSelectorCardBlock
          item={{
            id: 'pjt-002',
            name: 'Project 2',
            applicableModel: 'GROOT N1.5',
            fineTuningModels: '8 Models',
            relatedDatasets: '1,248 Datasets',
            imageLabel: 'human',
          }}
          selected
        />
      );
    }
    if (id === 'desc-rfm.globalTopNav') {
      return <CatalogGlobalTopNavPreview />;
    }
    if (id === 'desc-rfm.overlayDialog') {
      return (
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
          Overlay dialog block is used for centered modal interactions.
        </div>
      );
    }
    if (id === 'desc-rfm.screenDescriptionPanel') {
      return (
        <div className="relative h-44 overflow-hidden rounded-md border border-slate-200 bg-slate-50">
          <div className="absolute inset-y-0 right-0 w-1/2 border-l border-slate-200 bg-white p-3">
            <p className="text-xs font-semibold text-slate-900">Screen Description Panel</p>
            <div className="mt-2 space-y-2">
              <div className="h-8 rounded border border-slate-200 bg-slate-50" />
              <div className="h-8 rounded border border-slate-200 bg-slate-50" />
            </div>
          </div>
        </div>
      );
    }
    if (id === 'desc-rfm.projectSelectorPanel') {
      return (
        <ProjectSelectorPanelBlock
          isOpen
          previewMode
          title="Project"
          count={6}
          searchValue=""
          onSearchChange={() => {}}
          items={[
            {
              id: 'pjt-001',
              name: 'Project 1',
              applicableModel: 'GROOT N1.5',
              fineTuningModels: '8 Models',
              relatedDatasets: '1,248 Datasets',
            },
            {
              id: 'pjt-002',
              name: 'Project 2',
              applicableModel: 'GROOT N1.5',
              fineTuningModels: '8 Models',
              relatedDatasets: '1,248 Datasets',
              imageLabel: 'human',
            },
            {
              id: 'pjt-006',
              name: 'Project 6',
              applicableModel: 'GROOT N1.5',
              fineTuningModels: '8 Models',
              relatedDatasets: '1,248 Datasets',
            },
          ]}
          selectedProjectId="pjt-002"
          onSelectProject={() => {}}
          onClose={() => {}}
          onCreateProject={() => {}}
          onConfirmSelect={() => {}}
        />
      );
    }
    if (id === 'desc-rfm.workspaceItemDetailDrawer') {
      return (
        <div className="relative h-56 overflow-hidden rounded-md border border-slate-200 bg-slate-50">
          <div className="absolute inset-y-0 right-0 w-[70%]">
            <WorkspaceItemDetailDrawerBlock
              isOpen
              previewMode
              title="진행 중입니다."
              subtitle="Project description goes here."
              summary="Warehouse Scenarios Collection - Run #112"
              source="Generator"
              overviewItems={[
                { label: 'No.', value: '1' },
                { label: 'Dataset Name', value: 'Warehouse Scenarios Collection - Run #112' },
                { label: 'Project Name', value: 'Project 2' },
                { label: 'Version', value: 'v1.0' },
                { label: 'Source', value: 'Generator' },
                { label: 'Worker', value: 'Wiyoung' },
              ]}
              taskDetailSummary={{ total: 500, passed: 150, failed: 150, warned: 150 }}
              taskDetailRecords={[
                {
                  id: 'task-1',
                  recordId: 'REC-0001',
                  videoLabel: 'img',
                  status: 'warn',
                  contents: "Retrieve all the groceries and store them in the pantry start() takeAndDrop('grocery','pantry') stop...",
                  validation: 'warn',
                  duration: '50',
                },
                {
                  id: 'task-2',
                  recordId: 'REC-0002',
                  videoLabel: 'img',
                  status: 'fail',
                  contents: "Retrieve all the groceries and store them in the pantry start() takeAndDrop('grocery','pantry') stop...",
                  validation: 'fail',
                  duration: '50',
                },
              ]}
              onClose={() => {}}
            />
          </div>
        </div>
      );
    }
    if (id === 'desc-rfm.activityDraftHistoryDrawer') {
      return (
        <div className="relative h-64 overflow-hidden rounded-md border border-slate-200 bg-slate-50">
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-md">
            <ActivityDraftHistoryDrawerBlock
              isOpen
              drafts={activityDraftSessionsMock.slice(0, 3)}
              onClose={() => {}}
              onSelectDraft={() => {}}
            />
          </div>
        </div>
      );
    }
    if (id === 'desc-rfm.projectJobsOnProcessDrawer') {
      return (
        <div className="relative h-56 overflow-hidden rounded-md border border-slate-200 bg-slate-50">
          <div className="absolute inset-y-0 right-0 w-[72%]">
            <ProjectJobsOnProcessDrawerBlock
              isOpen
              jobs={[
                {
                  id: 'job-1',
                  name: 'Generate synthetic grasp trajectories',
                  description: 'Domain randomization based dataset generation for gripper policy.',
                  source: 'generator',
                  worker: 'Mina',
                  progress: 72,
                  status: 'running',
                  startedAt: '2026-04-13 09:20',
                  eta: '1h 10m',
                },
                {
                  id: 'job-2',
                  name: 'Curate warehouse scenario merge',
                  description: 'Merge run datasets and resolve label conflicts.',
                  source: 'curator',
                  worker: 'Alex',
                  progress: 41,
                  status: 'running',
                  startedAt: '2026-04-13 08:50',
                  eta: '2h 30m',
                },
              ]}
              onClose={() => {}}
            />
          </div>
        </div>
      );
    }
    if (id === 'desc-rfm.formTagInput') {
      return <FormTagInputCatalogPreview />;
    }
    if (id === 'desc-rfm.workPageFormField') {
      return <WorkPageFormFieldCatalogPreview />;
    }
    if (id === 'desc-rfm.workPageFileUploadDropzone') {
      return <WorkPageFileUploadDropzoneCatalogPreview />;
    }
    if (id === 'desc-rfm.activityStepContainer') {
      return (
        <div className="h-64 max-w-md">
          <ActivityStepContainerBlock
            header={<p className="text-sm font-semibold text-slate-900">Activity step title</p>}
            footer={
              <WorkPageActivityFooterToolbarBlock
                left={
                  <>
                    <button type="button" className={buttonSecondarySmClasses}>
                      Secondary
                    </button>
                  </>
                }
                right={<button type="button" className={buttonPrimarySmClasses}>Primary</button>}
              />
            }
          >
            <div className="space-y-2 text-xs leading-relaxed text-slate-600">
              {Array.from({ length: 10 }, (_, i) => (
                <p key={`line-${String(i)}`}>Scrollable body line {i + 1} — fills space between header and footer.</p>
              ))}
            </div>
          </ActivityStepContainerBlock>
        </div>
      );
    }
    if (id === 'desc-rfm.workPageActivityFooterToolbar') {
      return (
        <div className="max-w-xl rounded-lg border border-slate-200 bg-white p-3">
          <p className="mb-2 text-xs text-slate-500">
            Left/right button groups for use inside ActivityStepContainer footer (flex layout, not sticky).
          </p>
          <div className="border-t border-slate-200 pt-3">
            <WorkPageActivityFooterToolbarBlock
              left={
                <>
                  <button type="button" className={buttonSecondarySmClasses}>
                    Start
                  </button>
                  <button type="button" className={buttonSecondarySmClasses}>
                    Stop
                  </button>
                </>
              }
              right={<button type="button" className={buttonPrimarySmClasses}>Save</button>}
            />
          </div>
        </div>
      );
    }
    if (id === 'desc-rfm.workPageTemplateCanvas') {
      return <WorkPageTemplateCanvasBlock variant="type1-parameter-preview" />;
    }
    if (id === 'desc-rfm.collectTeleoperationStep') {
      return (
        <div className="max-h-[min(560px,82vh)] overflow-auto rounded-md border border-slate-200 bg-slate-50 p-2">
          <CollectTeleoperationStepBlock onProceedToStep2={() => {}} />
        </div>
      );
    }
    if (id === 'desc-rfm.syntheticVideoCreationStep') {
      return (
        <div className="max-h-[min(560px,82vh)] overflow-auto rounded-md border border-slate-200 bg-slate-50 p-2">
          <SyntheticVideoCreationStepBlock onProceedToStep2={() => {}} />
        </div>
      );
    }
    if (id === 'desc-rfm.mimicAugmentationStep') {
      return (
        <div className="max-h-[min(560px,82vh)] overflow-auto rounded-md border border-slate-200 bg-slate-50 p-2">
          <MimicAugmentationStepBlock onProceedToStep2={() => {}} />
        </div>
      );
    }
    if (id === 'desc-rfm.idmTrajectoryStep') {
      return (
        <div className="max-h-[min(560px,82vh)] overflow-auto rounded-md border border-slate-200 bg-slate-50 p-2">
          <IdmTrajectoryStepBlock onProceedToStep2={() => {}} />
        </div>
      );
    }
    if (id === 'desc-rfm.mergeDatasetsStep') {
      return (
        <div className="max-h-[min(560px,82vh)] overflow-auto rounded-md border border-slate-200 bg-slate-50 p-2">
          <MergeDatasetsStepBlock datasets={CATALOG_MERGE_DATASET_PREVIEW_ROWS} onProceedToStep2={() => {}} />
        </div>
      );
    }
    if (id === 'desc-rfm.curateAnalyticsStep') {
      return (
        <div className="max-h-[min(480px,70vh)] overflow-auto rounded-md border border-slate-200 bg-slate-50 p-2">
          <CurateAnalyticsStepBlock onProceedToStep2={() => {}} />
        </div>
      );
    }
    if (id === 'desc-rfm.activityValidation') {
      return (
        <div className="max-h-[min(480px,70vh)] overflow-auto rounded-md border border-slate-200 bg-slate-50 p-2">
          <ActivityValidationBlock
            onPrevious={() => {}}
            onApplyPreprocessorResult={() => {}}
            onSkipPreprocessor={() => {}}
          />
        </div>
      );
    }
    if (id === 'desc-rfm.activitySaveDataset') {
      const draft = getDefaultSaveDraft('register');
      return (
        <div className="max-h-[min(520px,78vh)] overflow-auto rounded-md border border-slate-200 bg-slate-50 p-2">
          <ActivitySaveDatasetBlock
            datasetName={draft.datasetName}
            datasetDescription={draft.description}
            onDatasetNameChange={() => {}}
            onDatasetDescriptionChange={() => {}}
            summary={getActivitySaveSummary('register')}
          />
        </div>
      );
    }
    if (id === 'desc-rfm.workPageShell') {
      return (
        <div className="h-[380px] overflow-hidden rounded-md border border-slate-200 bg-slate-100">
          <WorkPageShellBlock
            embedded
            isOpen
            title="{Work Name}"
            description="Register, manage, and organize datasets with metadata, tags, ownership, and version tracking."
            currentStep={catalogWorkFlowStep}
            maxUnlockedStep={catalogWorkFlowMax}
            onStepChange={setCatalogWorkFlowStep}
            onClose={() => {}}
            onHistoryClick={() => {}}
          >
            <p className="text-sm text-slate-600">
              Step {catalogWorkFlowStep} preview — open Workspace activity for full flow. Max unlocked: {catalogWorkFlowMax}.
            </p>
          </WorkPageShellBlock>
        </div>
      );
    }
    if (id === 'page.list') {
      return (
        <div className="grid gap-2">
          <ListStatusTabsBlock
            value={sampleStatus}
            onChange={setSampleStatus}
            items={[
              { label: 'All', value: 'all' },
              { label: 'In Progress', value: 'in-progress' },
            ]}
          />
          <ProjectCardGridBlock items={projectListRows.slice(0, 2)} />
        </div>
      );
    }
    if (id === 'page.dashboard') {
      return (
        <div className="grid gap-2 md:grid-cols-3">
          <div className="h-16 rounded-md border border-slate-200 bg-slate-50" />
          <div className="h-16 rounded-md border border-slate-200 bg-slate-50" />
          <div className="h-16 rounded-md border border-slate-200 bg-slate-50" />
        </div>
      );
    }
    if (id === 'page.form') {
      return (
        <div className="grid max-w-sm gap-2">
          <input className={formControlInputMaxSmClasses} placeholder="Name" />
          <input className={formControlInputMaxSmClasses} placeholder="Description" />
          <button type="button" className={buttonPrimaryMdClasses}>
            Save
          </button>
        </div>
      );
    }
    if (id === 'page.workspace') {
      return (
        <div className="grid gap-2">
          <div className="h-10 rounded-md border border-slate-200 bg-slate-50" />
          <div className="grid gap-2 md:grid-cols-4">
            <div className="h-14 rounded-md border border-slate-200 bg-slate-50" />
            <div className="h-14 rounded-md border border-slate-200 bg-slate-50" />
            <div className="h-14 rounded-md border border-slate-200 bg-slate-50" />
            <div className="h-14 rounded-md border border-slate-200 bg-slate-50" />
          </div>
          <div className="h-24 rounded-md border border-slate-200 bg-slate-50" />
        </div>
      );
    }
    if (id === 'page.settings') {
      return (
        <div className="grid gap-2">
          <div className="h-10 rounded-md border border-slate-200 bg-slate-50" />
          <div className="h-8 rounded-md border border-slate-200 bg-slate-50" />
          <div className="grid gap-2 md:grid-cols-2">
            <div className="h-24 rounded-md border border-slate-200 bg-slate-50" />
            <div className="h-24 rounded-md border border-slate-200 bg-slate-50" />
          </div>
        </div>
      );
    }
    if (id === 'page.work') {
      return (
        <div className="grid gap-2">
          <div className="h-10 rounded-md border border-slate-200 bg-slate-50" />
          <div className="h-8 rounded-md border border-slate-200 bg-slate-50" />
          <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="h-24 rounded-md border border-slate-200 bg-slate-50" />
            <div className="h-24 rounded-md border border-slate-200 bg-slate-50" />
          </div>
        </div>
      );
    }
    if (id === 'desc-rfm.robotSelectCard') {
      const sample = projectCreateRobotOptions[0];
      return (
        <div className="max-w-[200px]">
          <RobotSelectCardBlock option={sample} selected={false} onSelect={() => {}} />
        </div>
      );
    }
    if (id === 'desc-rfm.editProfilePanel') {
      return <EditProfileCatalogPreview />;
    }
    if (id === 'desc-rfm.inviteMemberPanel') {
      return <InviteMemberCatalogPreview />;
    }
    if (id === 'page.createProjectRobot') {
      return (
        <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,200px)]">
          <div className="flex h-28 items-center justify-center rounded-md border border-dashed border-slate-300 bg-[#F5F5F5] text-xs text-slate-500">
            Large robot preview
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {projectCreateRobotOptions.slice(0, 4).map((opt) => (
              <div key={opt.id} className="h-12 rounded-md border border-slate-200 bg-white" />
            ))}
          </div>
        </div>
      );
    }
    return <p className="text-xs text-slate-500">{t('catalog.preview.undefined')}</p>;
  };

  const selectedItem = filteredItems.find((item) => item.id === selectedId) ?? null;
  const pagePreviewPathMap: Record<string, string> = {
    'page.dashboard': '/home',
    'page.list': '/projects',
    'page.createProjectRobot': '/projects/new',
    'page.detail': '/projects/sample-project',
    'page.workspace': '/projects/pjt-002/workspace',
    'page.settings': '/projects/pjt-002/workspace/settings',
    'page.work': '/projects/pjt-002/workspace/register',
    'page.form': '/',
  };

  return (
    <main className="min-h-screen bg-white py-8">
      <div className={appShellInnerClass}>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">{t('catalog.title')}</h1>
        <p className="mt-1 text-sm text-slate-600">{t('catalog.subtitle')}</p>
        <div className="mt-3">
          <Link to="/" className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 hover:bg-slate-50">
            {t('catalog.linkFirst')}
          </Link>
        </div>
      </header>

      <section className="mb-8 overflow-hidden rounded-lg border border-slate-200 bg-white p-4">
        <div className="grid gap-4 md:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">-- {tabLabelMap[sampleTab]}</p>
            <div className="mt-2 flex gap-2">
              {[
                { key: 'components' as const, label: t('catalog.tab.components') },
                { key: 'blocks' as const, label: t('catalog.tab.blocks') },
                { key: 'overlays' as const, label: t('catalog.tab.overlays') },
                { key: 'screenPatterns' as const, label: t('catalog.tab.screenPatterns') },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setSampleTab(tab.key as DescriptionTab);
                    setSearchKeyword('');
                  }}
                  className={[
                    'rounded-md border px-2 py-1 text-xs',
                    sampleTab === tab.key
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
                  ].join(' ')}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <input
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              placeholder={t('catalog.searchPlaceholder')}
              className={['mt-3', formControlInputClasses].join(' ')}
            />
            <div className="mt-3 max-h-[560px] space-y-1 overflow-y-auto pr-1">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={[
                    'w-full rounded-md px-2 py-2 text-left text-sm',
                    selectedId === item.id ? 'bg-white font-semibold text-slate-900 shadow-sm' : 'text-slate-700 hover:bg-white',
                  ].join(' ')}
                >
                  {item.title}
                </button>
              ))}
              {filteredItems.length === 0 ? <p className="px-2 py-2 text-xs text-slate-500">{t('catalog.emptySearch')}</p> : null}
            </div>
          </aside>

          <div className="min-w-0">
            {sampleTab === 'components' && selectedItem?.id.startsWith('component.card') ? (
              <div className="mb-3 rounded-md border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-semibold text-slate-900">{t('catalog.cardGuide.title')}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  <li>{t('catalog.cardGuide.project')}</li>
                  <li>{t('catalog.cardGuide.library')}</li>
                </ul>
              </div>
            ) : null}
            {selectedItem ? (
              <SampleCard
                title={selectedItem.title}
                blockId={selectedItem.id.replace('desc-', '')}
                description={selectedItem.summary}
                codePath={selectedItem.codePath}
              >
                {renderPreview(selectedItem.id)}
              </SampleCard>
            ) : (
              <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                {t('catalog.selectPrompt')}
              </div>
            )}
            {sampleTab === 'screenPatterns' && selectedItem ? (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => {
                    const path = pagePreviewPathMap[selectedItem.id];
                    if (!path) return;
                    setPageExamplePath(path);
                    setIsPageExampleOpen(true);
                  }}
                  className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {t('catalog.exampleFullscreen')}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
      </div>

      <OverlayDialogBlock
        title={t('catalog.fullscreenTitle')}
        isOpen={isPageExampleOpen}
        onClose={() => setIsPageExampleOpen(false)}
        variant="fullscreen"
      >
        <div className="flex h-full min-h-0 flex-col overflow-hidden bg-slate-50">
          {pageExamplePath ? (
            <iframe title={t('catalog.fullscreenTitle')} src={pageExamplePath} className="h-full min-h-0 w-full flex-1 border-0 bg-white" />
          ) : (
            <div className="grid flex-1 place-items-center text-sm text-slate-500">{t('catalog.fullscreenEmpty')}</div>
          )}
        </div>
      </OverlayDialogBlock>
    </main>
  );
}
