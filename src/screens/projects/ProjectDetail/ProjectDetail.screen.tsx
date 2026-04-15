import React from 'react';

import { GlobalTopNavBlock } from '../../../blocks/molecules/GlobalTopNav.block';
import { OverlayDialogBlock } from '../../../blocks/molecules/OverlayDialog.block';
import { EditProfilePanelBlock } from '../../../blocks/organisms/EditProfilePanel.block';
import { ProjectMetaInfoStripBlock } from '../../../blocks/molecules/ProjectMetaInfoStrip.block';
import { ProjectInfoListPanelBlock, type ProjectInfoListItem } from '../../../blocks/organisms/ProjectInfoListPanel.block';
import { ProjectOutputSummaryPanelBlock } from '../../../blocks/organisms/ProjectOutputSummaryPanel.block';
import { ProjectRobotInfoPanelBlock } from '../../../blocks/organisms/ProjectRobotInfoPanel.block';
import type { ProjectSelectorCardItem } from '../../../blocks/organisms/ProjectSelectorCard.block';
import { ProjectSelectorPanelBlock } from '../../../blocks/organisms/ProjectSelectorPanel.block';
import { ProjectTaskListBlock } from '../../../blocks/organisms/ProjectTaskList.block';
import { ProjectWorkspaceSidebarBlock, type ProjectMemberRole } from '../../../blocks/organisms/ProjectWorkspaceSidebar.block';
import { ScreenDescriptionPanelBlock } from '../../../blocks/organisms/ScreenDescriptionPanel.block';
import { projectSelectorRows } from '../../../data-spec/mocks/projectSelector.mock';
import { appShellInnerClass } from '../../../styles/appLayoutClasses';
import { useLanguage } from '../../../context/LanguageContext';
import {
  createGlobalTopNavItems,
  createTemporaryTopUtilityButtons,
  globalTopNavBrandIcon,
  useGlobalTopNavActions,
} from '../../../navigation/globalTopNav';
import { projectDetailUxDescription } from './ProjectDetail.ux';

type Props = {
  projectId: string;
  currentPath: string;
  overlayKey?: string;
  onNavigate: (path: string) => void;
};
type ProjectDetailOverlayKey = 'project-selector' | 'edit-profile';

type HighlightKey = 'sidebar' | 'header' | 'jobs' | 'activity' | 'robotInfo' | 'output' | 'member';

export function ProjectDetailScreen({ projectId, currentPath, overlayKey, onNavigate }: Props): JSX.Element {
  const [isUxOpen, setIsUxOpen] = React.useState(false);
  const [highlightedKey, setHighlightedKey] = React.useState<HighlightKey | null>(null);
  const [projectSearch, setProjectSearch] = React.useState('');
  const [selectedProjectId, setSelectedProjectId] = React.useState<string>('PJT-002');
  const [pendingProjectId, setPendingProjectId] = React.useState<string | null>('PJT-002');
  const [isLayoutMenuOpen, setIsLayoutMenuOpen] = React.useState(false);
  const layoutMenuRef = React.useRef<HTMLDivElement>(null);
  const [editProfileDisplayName, setEditProfileDisplayName] = React.useState('');

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
  }, [projectId]);

  const filteredProjectOptions = projectOptions.filter((item) => item.name.toLowerCase().includes(projectSearch.trim().toLowerCase()));
  const currentProject = projectOptions.find((item) => item.id === selectedProjectId) ?? projectOptions[0];
  const activeProjectTitle = currentProject.name;

  const activeOverlay = overlayKey as ProjectDetailOverlayKey | undefined;
  const isProjectSelectorOpen = activeOverlay === 'project-selector';
  const isEditProfileOpen = activeOverlay === 'edit-profile';

  React.useEffect(() => {
    setEditProfileDisplayName(currentProject.nickname);
  }, [currentProject.nickname, currentProject.id]);

  React.useEffect(() => {
    if (isEditProfileOpen) setEditProfileDisplayName(currentProject.nickname);
  }, [isEditProfileOpen, currentProject.nickname]);

  React.useEffect(() => {
    if (!isLayoutMenuOpen) return;
    const onDocMouseDown = (event: MouseEvent): void => {
      if (layoutMenuRef.current && !layoutMenuRef.current.contains(event.target as Node)) {
        setIsLayoutMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [isLayoutMenuOpen]);
  const openOverlay = (nextOverlay: ProjectDetailOverlayKey): void => onNavigate(`${currentPath}?overlay=${nextOverlay}`);
  const closeOverlay = (): void => onNavigate(currentPath);

  const tasks = Array.from({ length: 3 }, (_, index) => ({
    id: `task-${index + 1}`,
    title: 'To-do Name',
    tag: 'Data Build',
    description: 'Collect datasets through videos recorded by physical robots.',
    dueDate: 'Due: Apr 15, 2026',
    priority: 'Priority: High',
  }));

  const activityItems = Array.from({ length: 4 }, (_, index) => ({
    id: `activity-${index + 1}`,
    title: '{Output Name}',
    subtitle: '(Work Description)',
    meta: 'Mar 26, 2026 · {User Name}',
    badge: ['Register', 'Collector', 'Trainer', 'Evaluator'][index] ?? 'Register',
  }));

  const memberItems: ProjectInfoListItem[] = [
    {
      id: 'member-1',
      title: 'Alex Chen',
      subtitle: 'alex.chen@company.com',
      meta: 'Last active · Today',
      member: {
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexChen&backgroundColor=b6e3f4',
        roles: ['project owner'],
      },
    },
    {
      id: 'member-2',
      title: 'Mina Park',
      subtitle: 'mina.park@company.com',
      meta: 'Last active · Yesterday',
      member: {
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MinaPark&backgroundColor=c0aede',
        roles: ['data engineer'],
      },
    },
    {
      id: 'member-3',
      title: 'Jordan Lee',
      subtitle: 'jordan.lee@company.com',
      meta: 'Last active · 2 days ago',
      member: {
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JordanLee&backgroundColor=d1d4f9',
        roles: ['data engineer', 'model engineer'],
      },
    },
    {
      id: 'member-4',
      title: 'Sam Rivera',
      subtitle: 'sam.rivera@company.com',
      meta: 'Last active · This week',
      member: {
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SamRivera&backgroundColor=ffd5dc',
        roles: ['model engineer'],
      },
    },
    {
      id: 'member-5',
      title: 'Casey Kim',
      subtitle: 'casey.kim@company.com',
      meta: 'Last active · This week',
      member: {
        avatarUrl: null,
        roles: ['data engineer'],
      },
    },
  ];

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

        <div className={isUxOpen ? 'pr-0 transition-[padding] duration-300 lg:pr-[440px]' : 'transition-[padding] duration-300'}>
          <div className={[appShellInnerClass, 'grid grid-cols-1 gap-4 py-4 lg:grid-cols-[200px_minmax(0,1fr)]'].join(' ')}>
            <div className={highlightClass('sidebar')}>
              <ProjectWorkspaceSidebarBlock
                projectTitle={activeProjectTitle}
                onProjectTitleClick={() => {
                  setPendingProjectId(selectedProjectId);
                  openOverlay('project-selector');
                }}
                items={[
                  { key: 'dashboard', label: 'Dashboard', active: true, onClick: () => onNavigate(`/projects/${selectedProjectId}`) },
                  { key: 'workspace', label: 'Workspace', onClick: () => onNavigate(`/projects/${selectedProjectId}/workspace`) },
                  { key: 'settings', label: 'Settings', onClick: () => onNavigate(`/projects/${selectedProjectId}/workspace/settings`) },
                ]}
                profileName={currentProject.nickname}
                profileRoles={currentProject.roles}
                onProfileClick={() => openOverlay('edit-profile')}
              />
            </div>

            <section className="space-y-4">
              <div className={highlightClass('header')}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h1 className="text-3xl font-semibold text-slate-900">{activeProjectTitle}</h1>
                    <p className="mt-1 text-sm text-slate-600">{'{Project description}'}</p>
                  </div>
                  <div className="relative" ref={layoutMenuRef}>
                    <button
                      type="button"
                      onClick={() => setIsLayoutMenuOpen((open) => !open)}
                      aria-expanded={isLayoutMenuOpen}
                      className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      Edit Layout
                    </button>
                    {isLayoutMenuOpen ? (
                      <div
                        role="menu"
                        className="absolute right-0 z-20 mt-1 min-w-[11rem] rounded-md border border-slate-200 bg-white py-1 shadow-lg"
                      >
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => setIsLayoutMenuOpen(false)}
                          className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          Edit Layout
                        </button>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => setIsLayoutMenuOpen(false)}
                          className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          Reset Layout
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mt-3">
                  <ProjectMetaInfoStripBlock
                    items={[
                      { label: 'Task', value: 'Manipulation / Pick-and-Place' },
                      { label: 'Robot', value: 'Dexmate Vega' },
                      { label: 'Started Date', value: 'Apr 15, 2026' },
                      { label: 'Owner', value: 'Robotics Team Alpha' },
                    ]}
                  />
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <div className={['lg:col-span-2', highlightClass('jobs')].join(' ')}>
                  <ProjectTaskListBlock title="Assigned Jobs" items={tasks} />
                </div>
                <div className={highlightClass('activity')}>
                  <ProjectInfoListPanelBlock title="Recent completed Activity" items={activityItems} />
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <div className={highlightClass('robotInfo')}>
                  <ProjectRobotInfoPanelBlock
                    title="Robot Information"
                    robotName="Dexmate Vega"
                    lines={['Task: Pick & Place', 'Environment: Simulation', 'Gripper: RGB-D Camera']}
                  />
                </div>
                <div className={highlightClass('output')}>
                  <ProjectOutputSummaryPanelBlock
                    title="Output"
                    metrics={[
                      { label: 'Datasets', value: '1,000', delta: '+2 increased this week' },
                      { label: 'Model', value: '1,000', delta: '+2 increased this week' },
                    ]}
                  />
                </div>
                <div className={highlightClass('member')}>
                  <ProjectInfoListPanelBlock title="Member" items={memberItems} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <ScreenDescriptionPanelBlock
        isOpen={isUxOpen}
        title={projectDetailUxDescription.title}
        summary={projectDetailUxDescription.summary}
        items={projectDetailUxDescription.items}
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
        onClose={closeOverlay}
        onCreateProject={() => onNavigate('/projects/new')}
        onConfirmSelect={() => {
          if (!pendingProjectId) return;
          setSelectedProjectId(pendingProjectId);
          onNavigate(`/projects/${pendingProjectId}`);
        }}
      />

      <OverlayDialogBlock title="Edit Profile" isOpen={isEditProfileOpen} onClose={closeOverlay} panelClassName="max-w-lg">
        <EditProfilePanelBlock
          displayName={editProfileDisplayName}
          onDisplayNameChange={setEditProfileDisplayName}
          roles={currentProject.roles}
          onSave={() => {
            window.alert('Profile saved (prototype).');
            closeOverlay();
          }}
          onCancel={closeOverlay}
          onRequestDevRole={(role) => window.alert(`Access request sent: ${role} (prototype).`)}
        />
      </OverlayDialogBlock>
    </>
  );
}
