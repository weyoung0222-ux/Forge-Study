import React from 'react';

import { GlobalTopNavBlock } from '../../../blocks/molecules/GlobalTopNav.block';
import { ListSortSelectBlock } from '../../../blocks/molecules/ListSortSelect.block';
import { OverlayDialogBlock } from '../../../blocks/molecules/OverlayDialog.block';
import { EditProfilePanelBlock } from '../../../blocks/organisms/EditProfilePanel.block';
import { InviteMemberPanelBlock } from '../../../blocks/organisms/InviteMemberPanel.block';
import { SectionTitleBlock } from '../../../blocks/molecules/SectionTitle.block';
import { ListStatusTabsBlock } from '../../../blocks/molecules/ListStatusTabs.block';
import { TablePaginationBlock } from '../../../blocks/molecules/TablePagination.block';
import { DataTableBlock, type DataTableColumn } from '../../../blocks/organisms/DataTable.block';
import { ListToolbarBlock } from '../../../blocks/organisms/ListToolbar.block';
import { ProjectInfoListPanelBlock } from '../../../blocks/organisms/ProjectInfoListPanel.block';
import { ProjectOutputSummaryPanelBlock } from '../../../blocks/organisms/ProjectOutputSummaryPanel.block';
import type { ProjectSelectorCardItem } from '../../../blocks/organisms/ProjectSelectorCard.block';
import { ProjectSelectorPanelBlock } from '../../../blocks/organisms/ProjectSelectorPanel.block';
import { ProjectWorkspaceSidebarBlock, type ProjectMemberRole } from '../../../blocks/organisms/ProjectWorkspaceSidebar.block';
import { ScreenDescriptionPanelBlock } from '../../../blocks/organisms/ScreenDescriptionPanel.block';
import {
  filterInviteDirectoryUsers,
  inviteDirectoryUsers,
  INVITE_MEMBER_ROLE_OPTIONS,
  type InviteDirectoryUser,
} from '../../../data-spec/mocks/inviteDirectory.mock';
import { projectSelectorRows } from '../../../data-spec/mocks/projectSelector.mock';
import { useLanguage } from '../../../context/LanguageContext';
import {
  createGlobalTopNavItems,
  createTemporaryTopUtilityButtons,
  globalTopNavBrandIcon,
  useGlobalTopNavActions,
} from '../../../navigation/globalTopNav';
import {
  chipSourceActivityClasses,
  chipStatusPausedClasses,
  chipStatusQueuedClasses,
  chipStatusRunningClasses,
} from '../../../blocks/styles/chipClasses';
import type { LibrarySource } from '../../library/Library/Library.schema';
import { UserAddOutlined } from '../../../icons';
import { buttonPrimarySmClasses } from '../../../blocks/styles/buttonClasses';
import { projectSettingsUxDescription } from './ProjectSettings.ux';

type Props = {
  projectId: string;
  onNavigate: (path: string) => void;
};

type HighlightKey = 'settingsHeader' | 'settingsTabs' | 'settingsContent' | 'sidebar';
type SettingsTab = 'general' | 'members' | 'jobs' | 'resource';

type MemberRow = {
  id: string;
  name: string;
  role: string;
  scope: string;
  lastActive: string;
  status: 'active' | 'invited' | 'inactive';
};

type JobRow = {
  id: string;
  jobName: string;
  owner: string;
  source: LibrarySource;
  schedule: string;
  status: 'running' | 'queued' | 'paused';
};

type ResourceRow = {
  id: string;
  resourceName: string;
  type: string;
  source: LibrarySource;
  updatedAt: string;
  owner: string;
};

const memberColumns: DataTableColumn[] = [
  { key: 'name', label: 'Member' },
  { key: 'role', label: 'Role' },
  { key: 'scope', label: 'Scope' },
  { key: 'lastActive', label: 'Last Active', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
];

const jobColumns: DataTableColumn[] = [
  { key: 'jobName', label: 'Job Name' },
  { key: 'owner', label: 'Owner', align: 'center' },
  { key: 'source', label: 'Source', align: 'center' },
  { key: 'schedule', label: 'Schedule', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
];

const resourceColumns: DataTableColumn[] = [
  { key: 'resourceName', label: 'Resource Name' },
  { key: 'type', label: 'Type', align: 'center' },
  { key: 'source', label: 'Source', align: 'center' },
  { key: 'owner', label: 'Owner', align: 'center' },
  { key: 'updatedAt', label: 'Updated At', align: 'center' },
];

const sourceOptions: Array<{ value: LibrarySource; label: string }> = [
  { value: 'all', label: 'Source : All' },
  { value: 'register', label: 'Source : Register' },
  { value: 'collector', label: 'Source : Collector' },
  { value: 'generator', label: 'Source : Generator' },
  { value: 'curator', label: 'Source : Curator' },
  { value: 'trainer', label: 'Source : Trainer' },
  { value: 'evaluator', label: 'Source : Evaluator' },
];

const INITIAL_MEMBER_ROWS: MemberRow[] = [
  { id: 'm-1', name: 'Alex Chen', role: 'Project Owner', scope: 'Project Governance', lastActive: '2026-04-10', status: 'active' },
  { id: 'm-2', name: 'Min Park', role: 'Data Engineer', scope: 'Data Foundry', lastActive: '2026-04-09', status: 'active' },
  { id: 'm-3', name: 'Jin Seo', role: 'Model Engineer', scope: 'Model Institute', lastActive: '2026-04-09', status: 'active' },
  { id: 'm-4', name: 'Chris Yu', role: 'Supporter', scope: 'Operations Support', lastActive: '2026-04-08', status: 'invited' },
  { id: 'm-5', name: 'Taylor Han', role: 'Consumer', scope: 'Library Usage', lastActive: '2026-04-07', status: 'inactive' },
  { id: 'm-6', name: 'Jamie Kim', role: 'Admin', scope: 'Platform Settings', lastActive: '2026-04-06', status: 'active' },
];

const INVITE_ROLE_TO_SCOPE: Record<string, string> = {
  'Project Owner': 'Project Governance',
  'Data Engineer': 'Data Foundry',
  'Model Engineer': 'Model Institute',
  'Consumer': 'Library Usage',
  'Supporter': 'Operations Support',
  'Admin': 'Platform Settings',
};

const jobRows: JobRow[] = [
  { id: 'j-1', jobName: 'Warehouse Register Batch', owner: 'Min Park', source: 'register', schedule: 'Daily 09:00', status: 'running' },
  { id: 'j-2', jobName: 'Teleop Collector Sync', owner: 'Alex Chen', source: 'collector', schedule: 'Every 2h', status: 'queued' },
  { id: 'j-3', jobName: 'Scene Generator Pack', owner: 'Jin Seo', source: 'generator', schedule: 'Manual', status: 'paused' },
  { id: 'j-4', jobName: 'Curation Merge Pipeline', owner: 'Min Park', source: 'curator', schedule: 'Daily 18:00', status: 'running' },
];

const resourceRows: ResourceRow[] = [
  { id: 'r-1', resourceName: 'Warehouse RGB Dataset v1', type: 'Dataset', source: 'register', owner: 'Data Team A', updatedAt: '2026-04-10' },
  { id: 'r-2', resourceName: 'Teleop Driving Clips', type: 'Dataset', source: 'collector', owner: 'Data Team B', updatedAt: '2026-04-09' },
  { id: 'r-3', resourceName: 'Synthetic Pick Samples', type: 'Dataset', source: 'generator', owner: 'Data Team A', updatedAt: '2026-04-08' },
  { id: 'r-4', resourceName: 'Merged Task Pack', type: 'Dataset', source: 'curator', owner: 'Data Team C', updatedAt: '2026-04-07' },
  { id: 'r-5', resourceName: 'Dexmate Base Model', type: 'Model', source: 'trainer', owner: 'Model Team A', updatedAt: '2026-04-06' },
  { id: 'r-6', resourceName: 'Robustness Eval Report', type: 'Report', source: 'evaluator', owner: 'Model Team B', updatedAt: '2026-04-05' },
];

function renderSourceChip(source: LibrarySource): React.ReactNode {
  const label = source.charAt(0).toUpperCase() + source.slice(1);
  return <span className={chipSourceActivityClasses}>{label}</span>;
}

function renderStatusChip(label: string, tone: 'green' | 'amber' | 'slate'): React.ReactNode {
  const className = tone === 'green' ? chipStatusRunningClasses : tone === 'amber' ? chipStatusQueuedClasses : chipStatusPausedClasses;
  return <span className={className}>{label}</span>;
}

export function ProjectSettingsScreen({ projectId, onNavigate }: Props): JSX.Element {
  const [isUxOpen, setIsUxOpen] = React.useState(false);
  const [highlightedKey, setHighlightedKey] = React.useState<HighlightKey | null>(null);
  const [projectSearch, setProjectSearch] = React.useState('');
  const [selectedProjectId, setSelectedProjectId] = React.useState<string>('PJT-002');
  const [pendingProjectId, setPendingProjectId] = React.useState<string | null>('PJT-002');
  const [isProjectSelectorOpen, setIsProjectSelectorOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [editProfileDisplayName, setEditProfileDisplayName] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<SettingsTab>('general');
  const [memberSearchValue, setMemberSearchValue] = React.useState('');
  const [memberSortValue, setMemberSortValue] = React.useState('name');
  const [memberCurrentPage, setMemberCurrentPage] = React.useState(1);
  const [resourceSearchValue, setResourceSearchValue] = React.useState('');
  const [resourceSortValue, setResourceSortValue] = React.useState('recent');
  const [resourceSourceValue, setResourceSourceValue] = React.useState<LibrarySource>('all');
  const [resourceCurrentPage, setResourceCurrentPage] = React.useState(1);
  const [resourcePageSize, setResourcePageSize] = React.useState(10);
  const [memberRowsData, setMemberRowsData] = React.useState<MemberRow[]>(INITIAL_MEMBER_ROWS);
  const [isInviteOpen, setIsInviteOpen] = React.useState(false);
  const [inviteEmailQuery, setInviteEmailQuery] = React.useState('');
  const [inviteSearchResults, setInviteSearchResults] = React.useState<InviteDirectoryUser[]>([]);
  const [inviteSelectedUserId, setInviteSelectedUserId] = React.useState<string | null>(null);
  const [inviteRole, setInviteRole] = React.useState(INVITE_MEMBER_ROLE_OPTIONS[1]!.value);

  const { t } = useLanguage();
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
  }, [projectId, projectOptions]);

  const currentProject = projectOptions.find((item) => item.id === selectedProjectId) ?? projectOptions[0];
  const activeProjectTitle = currentProject.name;

  React.useEffect(() => {
    setEditProfileDisplayName(currentProject.nickname);
  }, [currentProject.nickname, currentProject.id]);

  React.useEffect(() => {
    if (isEditProfileOpen) setEditProfileDisplayName(currentProject.nickname);
  }, [isEditProfileOpen, currentProject.nickname]);

  React.useEffect(() => {
    if (!isInviteOpen) return;
    setInviteEmailQuery('');
    setInviteSearchResults([]);
    setInviteSelectedUserId(null);
    setInviteRole(INVITE_MEMBER_ROLE_OPTIONS[1]!.value);
  }, [isInviteOpen]);

  const filteredProjectOptions = projectOptions.filter((item) => item.name.toLowerCase().includes(projectSearch.trim().toLowerCase()));
  const filteredMemberRows = memberRowsData
    .filter((row) => row.name.toLowerCase().includes(memberSearchValue.trim().toLowerCase()))
    .sort((a, b) => (memberSortValue === 'recent' ? b.lastActive.localeCompare(a.lastActive) : a.name.localeCompare(b.name)));

  const memberTableRows = filteredMemberRows.map((row) => ({
    name: row.name,
    role: row.role,
    scope: row.scope,
    lastActive: row.lastActive,
    status:
      row.status === 'active'
        ? renderStatusChip('Active', 'green')
        : row.status === 'invited'
          ? renderStatusChip('Invited', 'amber')
          : renderStatusChip('Inactive', 'slate'),
  }));

  const filteredResourceRows = resourceRows
    .filter((row) => {
      const bySearch = row.resourceName.toLowerCase().includes(resourceSearchValue.trim().toLowerCase());
      const bySource = resourceSourceValue === 'all' ? true : row.source === resourceSourceValue;
      return bySearch && bySource;
    })
    .sort((a, b) => (resourceSortValue === 'name' ? a.resourceName.localeCompare(b.resourceName) : b.updatedAt.localeCompare(a.updatedAt)));

  const resourceTotalPages = Math.max(1, Math.ceil(filteredResourceRows.length / resourcePageSize));
  const safeResourcePage = Math.min(resourceCurrentPage, resourceTotalPages);
  const pagedResourceRows = filteredResourceRows.slice((safeResourcePage - 1) * resourcePageSize, safeResourcePage * resourcePageSize);

  const resourceTableRows = pagedResourceRows.map((row) => ({
    resourceName: row.resourceName,
    type: row.type,
    source: renderSourceChip(row.source),
    owner: row.owner,
    updatedAt: row.updatedAt,
  }));

  React.useEffect(() => {
    setMemberCurrentPage(1);
  }, [memberSearchValue, memberSortValue]);

  React.useEffect(() => {
    setResourceCurrentPage(1);
  }, [resourceSearchValue, resourceSortValue, resourceSourceValue, resourcePageSize]);

  const highlightClass = (key: HighlightKey): string =>
    highlightedKey === key ? 'relative rounded-lg ring-2 ring-indigo-400 ring-offset-2 transition' : '';

  const renderTabContent = (): JSX.Element => {
    if (activeTab === 'general') {
      return (
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <ProjectInfoListPanelBlock
              title="General Information"
              items={[
                {
                  id: 'g-1',
                  title: 'Project Name',
                  subtitle: activeProjectTitle,
                  meta: 'Configured for warehouse manipulation scenario.',
                },
                {
                  id: 'g-2',
                  title: 'Workspace Scope',
                  subtitle: 'Data Foundry + Model Institute',
                  meta: 'Both domains are enabled for this project.',
                },
                {
                  id: 'g-3',
                  title: 'Default Region',
                  subtitle: 'ap-northeast-2',
                  meta: 'Primary compute and storage region.',
                },
              ]}
            />
            <ProjectOutputSummaryPanelBlock
              title="Quota and Usage"
              metrics={[
                { label: 'Dataset Capacity', value: '1.2 TB', delta: 'Used 68% of project quota' },
                { label: 'Model Capacity', value: '320 GB', delta: 'Used 41% of project quota' },
                { label: 'Monthly Job Hours', value: '480 h', delta: 'Used 172 h this month' },
              ]}
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">Policy Summary</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li>- Source values follow activity policy: register / collector / generator / curator / trainer / evaluator.</li>
              <li>- Publish action requires owner approval in production workflow.</li>
              <li>- Workspace logs are retained for 90 days.</li>
            </ul>
          </div>
        </div>
      );
    }

    if (activeTab === 'members') {
      const memberPageSize = 10;
      const memberTotalPages = Math.max(1, Math.ceil(filteredMemberRows.length / memberPageSize));
      const safeMemberPage = Math.min(memberCurrentPage, memberTotalPages);
      const pagedMemberRows = memberTableRows.slice((safeMemberPage - 1) * memberPageSize, safeMemberPage * memberPageSize);
      return (
        <div className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SectionTitleBlock title="Project Members" count={filteredMemberRows.length} countLabel="people" />
            <button
              type="button"
              onClick={() => setIsInviteOpen(true)}
              className={[buttonPrimarySmClasses, 'inline-flex shrink-0 items-center gap-1.5'].join(' ')}
            >
              <UserAddOutlined className="h-3.5 w-3.5" aria-hidden />
              Invite members
            </button>
          </div>
          <ListToolbarBlock
            searchValue={memberSearchValue}
            onSearchChange={setMemberSearchValue}
            searchAriaLabel="Search members"
            chips={[]}
            sortValue={memberSortValue}
            sortOptions={[
              { value: 'name', label: 'Sort by : Name' },
              { value: 'recent', label: 'Sort by : Recently Active' },
            ]}
            sortAriaLabel="Member sort"
            onSortChange={setMemberSortValue}
          />
          <DataTableBlock columns={memberColumns} rows={pagedMemberRows} emptyText="No members found." />
          <TablePaginationBlock
            currentPage={safeMemberPage}
            pageSize={memberPageSize}
            totalItems={filteredMemberRows.length}
            onPageChange={setMemberCurrentPage}
            totalLabel={`Total ${filteredMemberRows.length} members`}
          />
        </div>
      );
    }

    if (activeTab === 'jobs') {
      const jobTableRows = jobRows.map((row) => ({
        jobName: row.jobName,
        owner: row.owner,
        source: renderSourceChip(row.source),
        schedule: row.schedule,
        status:
          row.status === 'running'
            ? renderStatusChip('Running', 'green')
            : row.status === 'queued'
              ? renderStatusChip('Queued', 'amber')
              : renderStatusChip('Paused', 'slate'),
      }));
      return (
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <DataTableBlock columns={jobColumns} rows={jobTableRows} emptyText="No jobs configured." />
            </div>
            <ProjectInfoListPanelBlock
              title="Job Notes"
              items={[
                { id: 'n-1', title: 'Nightly Batch Window', subtitle: '22:00 - 06:00', meta: 'Large curation jobs are prioritized.' },
                { id: 'n-2', title: 'Retry Policy', subtitle: 'Max 3 retries', meta: 'Applies to Register and Collector pipelines.' },
                { id: 'n-3', title: 'Alert Receiver', subtitle: 'project-owner@forge.local', meta: 'Critical failure alerts only.' },
              ]}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <SectionTitleBlock title="Resource Registry" count={filteredResourceRows.length} countLabel="items" />
        <ListToolbarBlock
          searchValue={resourceSearchValue}
          onSearchChange={setResourceSearchValue}
          searchAriaLabel="Search resources"
          chips={[]}
          rightExtras={
            <ListSortSelectBlock
              value={resourceSourceValue}
              options={sourceOptions}
              ariaLabel="Resource source filter"
              onChange={(value) => setResourceSourceValue(value as LibrarySource)}
            />
          }
          sortValue={resourceSortValue}
          sortOptions={[
            { value: 'recent', label: 'Sort by : Recently Updated' },
            { value: 'name', label: 'Sort by : Name' },
          ]}
          sortAriaLabel="Resource sort"
          onSortChange={setResourceSortValue}
        />
        <DataTableBlock columns={resourceColumns} rows={resourceTableRows} emptyText="No resources found." />
        <TablePaginationBlock
          currentPage={safeResourcePage}
          pageSize={resourcePageSize}
          totalItems={filteredResourceRows.length}
          onPageChange={setResourceCurrentPage}
          onPageSizeChange={setResourcePageSize}
          totalLabel={`Total ${filteredResourceRows.length} resources`}
        />
      </div>
    );
  };

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
        <div className={isUxOpen ? 'pr-0 transition-[padding] duration-300 lg:pr-[440px]' : 'transition-[padding] duration-300'}>
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
                  { key: 'workspace', label: 'Workspace', onClick: () => onNavigate(`/projects/${selectedProjectId}/workspace`) },
                  { key: 'settings', label: 'Settings', active: true, onClick: () => onNavigate(`/projects/${selectedProjectId}/workspace/settings`) },
                ]}
                profileName={currentProject.nickname}
                profileRoles={currentProject.roles}
                onProfileClick={() => setIsEditProfileOpen(true)}
              />
            </div>
            <section className="space-y-4">
              <div className={highlightClass('settingsHeader')}>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Workspace Settings</h1>
                <p className="mt-1.5 text-sm text-slate-600">Manage configuration, members, jobs, and resources for this workspace.</p>
              </div>
              <div className={highlightClass('settingsTabs')}>
                <ListStatusTabsBlock
                  value={activeTab}
                  onChange={(value) => setActiveTab(value as SettingsTab)}
                  items={[
                    { label: 'General', value: 'general' },
                    { label: 'Members', value: 'members' },
                    { label: 'Jobs', value: 'jobs' },
                    { label: 'Resource', value: 'resource' },
                  ]}
                />
              </div>
              <div className={highlightClass('settingsContent')}>{renderTabContent()}</div>
            </section>
          </div>
        </div>
      </main>
      <ScreenDescriptionPanelBlock
        isOpen={isUxOpen}
        title={projectSettingsUxDescription.title}
        summary={projectSettingsUxDescription.summary}
        items={projectSettingsUxDescription.items}
        onClose={() => {
          setIsUxOpen(false);
          setHighlightedKey(null);
        }}
        onItemEnter={(key) => setHighlightedKey(key as HighlightKey)}
        onItemLeave={() => setHighlightedKey(null)}
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
          onNavigate(`/projects/${pendingProjectId}/workspace/settings`);
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

      <OverlayDialogBlock title="Invite members" isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} panelClassName="max-w-lg">
        <InviteMemberPanelBlock
          emailQuery={inviteEmailQuery}
          onEmailQueryChange={setInviteEmailQuery}
          onSearch={() => {
            setInviteSearchResults(filterInviteDirectoryUsers(inviteEmailQuery, inviteDirectoryUsers));
            setInviteSelectedUserId(null);
          }}
          searchResults={inviteSearchResults}
          selectedUserId={inviteSelectedUserId}
          onSelectUser={setInviteSelectedUserId}
          inviteRole={inviteRole}
          onInviteRoleChange={setInviteRole}
          roleOptions={INVITE_MEMBER_ROLE_OPTIONS}
          onCancel={() => setIsInviteOpen(false)}
          onInvite={() => {
            const user = inviteDirectoryUsers.find((u) => u.id === inviteSelectedUserId);
            if (!user) return;
            setMemberRowsData((prev) => [
              ...prev,
              {
                id: `m-inv-${Date.now()}`,
                name: user.name,
                role: inviteRole,
                scope: INVITE_ROLE_TO_SCOPE[inviteRole] ?? 'Project',
                lastActive: '—',
                status: 'invited',
              },
            ]);
            setIsInviteOpen(false);
          }}
        />
      </OverlayDialogBlock>
    </>
  );
}
