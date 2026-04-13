import React from 'react';

import { GlobalTopNavBlock } from '../../../blocks/molecules/GlobalTopNav.block';
import { ProjectMetaInfoStripBlock } from '../../../blocks/molecules/ProjectMetaInfoStrip.block';
import { ProjectInfoListPanelBlock } from '../../../blocks/organisms/ProjectInfoListPanel.block';
import { ProjectOutputSummaryPanelBlock } from '../../../blocks/organisms/ProjectOutputSummaryPanel.block';
import { ProjectRobotInfoPanelBlock } from '../../../blocks/organisms/ProjectRobotInfoPanel.block';
import type { ProjectSelectorCardItem } from '../../../blocks/organisms/ProjectSelectorCard.block';
import { ProjectSelectorPanelBlock } from '../../../blocks/organisms/ProjectSelectorPanel.block';
import { ProjectTaskListBlock } from '../../../blocks/organisms/ProjectTaskList.block';
import { ProjectWorkspaceSidebarBlock, type ProjectMemberRole } from '../../../blocks/organisms/ProjectWorkspaceSidebar.block';
import { ScreenDescriptionPanelBlock } from '../../../blocks/organisms/ScreenDescriptionPanel.block';
import { projectSelectorRows } from '../../../data-spec/mocks/projectSelector.mock';
import {
  createGlobalTopNavItems,
  createTemporaryTopUtilityButtons,
  globalTopNavActions,
  globalTopNavBrandIcon,
} from '../../../navigation/globalTopNav';
import { projectDetailUxDescription } from './ProjectDetail.ux';

type Props = {
  projectId: string;
  onNavigate: (path: string) => void;
};

type HighlightKey = 'sidebar' | 'header' | 'jobs' | 'activity' | 'robotInfo' | 'output' | 'member';

export function ProjectDetailScreen({ projectId, onNavigate }: Props): JSX.Element {
  const [isUxOpen, setIsUxOpen] = React.useState(false);
  const [highlightedKey, setHighlightedKey] = React.useState<HighlightKey | null>(null);
  const [isLayoutMenuOpen, setIsLayoutMenuOpen] = React.useState(false);
  const [isProjectSelectorOpen, setIsProjectSelectorOpen] = React.useState(false);
  const [projectSearch, setProjectSearch] = React.useState('');
  const [selectedProjectId, setSelectedProjectId] = React.useState<string>('PJT-002');
  const [pendingProjectId, setPendingProjectId] = React.useState<string | null>('PJT-002');

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

  const filteredProjectOptions = projectOptions.filter((item) => item.name.toLowerCase().includes(projectSearch.trim().toLowerCase()));
  const currentProject = projectOptions.find((item) => item.id === selectedProjectId) ?? projectOptions[0];
  const activeProjectTitle = currentProject.name;

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

  const memberItems = Array.from({ length: 5 }, (_, index) => ({
    id: `member-${index + 1}`,
    title: 'Alex Chen',
    subtitle: index === 0 ? 'Project Owner' : 'Data Builder / Model Trainer / Evaluator',
  }));

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
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[200px_minmax(0,1fr)]">
            <div className={highlightClass('sidebar')}>
              <ProjectWorkspaceSidebarBlock
                projectTitle={activeProjectTitle}
                onProjectTitleClick={() => {
                  setPendingProjectId(selectedProjectId);
                  setIsProjectSelectorOpen(true);
                }}
                items={[
                  { key: 'dashboard', label: 'Dashboard', active: true, onClick: () => onNavigate(`/projects/${selectedProjectId}`) },
                  { key: 'workspace', label: 'Workspace', onClick: () => onNavigate(`/projects/${selectedProjectId}/workspace`) },
                  { key: 'settings', label: 'Settings' },
                ]}
                profileName={currentProject.nickname}
                profileRoles={currentProject.roles}
              />
            </div>

            <section className="space-y-4">
              <div className={highlightClass('header')}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h1 className="text-3xl font-semibold text-slate-900">{activeProjectTitle}</h1>
                    <p className="mt-1 text-sm text-slate-600">{'{Project description}'}</p>
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsLayoutMenuOpen((prev) => !prev)}
                      className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      Edit Layout
                    </button>
                    {isLayoutMenuOpen ? (
                      <div className="absolute right-0 top-8 z-10 w-32 rounded-md border border-slate-200 bg-white p-1 shadow">
                        <button className="block w-full rounded px-2 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50">Edit Layout</button>
                        <button className="block w-full rounded px-2 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50">Reset Layout</button>
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
        onClose={() => setIsProjectSelectorOpen(false)}
        onCreateProject={() => onNavigate('/projects/new')}
        onConfirmSelect={() => {
          if (!pendingProjectId) return;
          setSelectedProjectId(pendingProjectId);
          setIsProjectSelectorOpen(false);
          onNavigate(`/projects/${pendingProjectId}`);
        }}
      />
    </>
  );
}
