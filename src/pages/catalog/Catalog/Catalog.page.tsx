import React from 'react';
import { Link } from 'react-router-dom';

import { GlobalTopNavBlock } from '../../../blocks/molecules/GlobalTopNav.block';
import { ListHeaderBlock } from '../../../blocks/molecules/ListHeader.block';
import { OverlayDialogBlock } from '../../../blocks/molecules/OverlayDialog.block';
import { ProjectMetaInfoStripBlock } from '../../../blocks/molecules/ProjectMetaInfoStrip.block';
import { ListStatusTabsBlock } from '../../../blocks/molecules/ListStatusTabs.block';
import { ViewModeToggleBlock, type ViewMode } from '../../../blocks/molecules/ViewModeToggle.block';
import { LibraryAssetGridBlock } from '../../../blocks/organisms/LibraryAssetGrid.block';
import { ListToolbarBlock } from '../../../blocks/organisms/ListToolbar.block';
import { ProjectInfoListPanelBlock } from '../../../blocks/organisms/ProjectInfoListPanel.block';
import { ProjectOutputSummaryPanelBlock } from '../../../blocks/organisms/ProjectOutputSummaryPanel.block';
import { ProjectRobotInfoPanelBlock } from '../../../blocks/organisms/ProjectRobotInfoPanel.block';
import { ProjectSelectorCardBlock } from '../../../blocks/organisms/ProjectSelectorCard.block';
import { ProjectSelectorPanelBlock } from '../../../blocks/organisms/ProjectSelectorPanel.block';
import { ProjectTaskListBlock } from '../../../blocks/organisms/ProjectTaskList.block';
import { ProjectCardGridBlock } from '../../../blocks/organisms/ProjectCardGrid.block';
import { ProjectWorkspaceSidebarBlock } from '../../../blocks/organisms/ProjectWorkspaceSidebar.block';
import { libraryAssetRows } from '../../../data-spec/mocks/libraryAssets.mock';
import { projectListRows } from '../../../data-spec/mocks/projectList.mock';
import { blockUnitItems, componentUnitItems, overlayUnitItems, screenPatternUnitItems } from '../../../descriptions/unitDefinitions';

type DescriptionTab = 'components' | 'blocks' | 'overlays' | 'screenPatterns';

type SampleCardProps = {
  title: string;
  blockId: string;
  description: string;
  codePath: string;
  children: React.ReactNode;
};

function SampleCard({ title, blockId, description, codePath, children }: SampleCardProps): JSX.Element {
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
            코드 열기
          </button>
        </div>
      </div>
      <div className="grid gap-3 p-4">
        <div>
          <p className="text-sm font-medium text-slate-900">Description</p>
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

export function CatalogPage(): JSX.Element {
  const [sampleStatus, setSampleStatus] = React.useState('all');
  const [sampleViewMode, setSampleViewMode] = React.useState<ViewMode>('grid');
  const [sampleTab, setSampleTab] = React.useState<DescriptionTab>('components');
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [isPageExampleOpen, setIsPageExampleOpen] = React.useState(false);
  const [pageExamplePath, setPageExamplePath] = React.useState<string | null>(null);
  const tabLabelMap: Record<DescriptionTab, string> = {
    components: 'Components',
    blocks: 'Blocks',
    overlays: 'Overlay',
    screenPatterns: 'Screen Patterns',
  };

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
    if (id === 'component.button') {
      return (
        <div className="flex gap-2">
          <button className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white">Primary</button>
          <button className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700">Secondary</button>
        </div>
      );
    }
    if (id === 'component.select' || id === 'component.dropdown') {
      return (
        <select className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800">
          <option>Option A</option>
          <option>Option B</option>
        </select>
      );
    }
    if (id === 'component.input') {
      return (
        <input
          placeholder="Type here..."
          className="h-9 w-full max-w-sm rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800"
        />
      );
    }
    if (id === 'component.chip') {
      return (
        <div className="flex gap-2">
          <span className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700">Default</span>
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white">Active</span>
        </div>
      );
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
    if (id === 'desc-rfm.libraryAssetGrid') {
      return <LibraryAssetGridBlock items={libraryAssetRows.slice(0, 4)} viewMode={sampleViewMode} />;
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
    if (id === 'desc-rfm.projectInfoListPanel') {
      return (
        <ProjectInfoListPanelBlock
          title="Recent completed Activity"
          items={[{ id: '1', title: '{Output Name}', subtitle: '(Work Description)', meta: 'Mar 26, 2026 · {User Name}', badge: 'Trainer' }]}
        />
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
      return (
        <div className="overflow-hidden rounded-md border border-slate-200">
          <GlobalTopNavBlock
            brand="PhysicalWorksForge"
            items={[
              { key: 'home', label: 'Home', active: true },
              { key: 'projects', label: 'Projects' },
              { key: 'library', label: 'Library' },
            ]}
          />
        </div>
      );
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
          <input className="h-9 rounded-md border border-slate-300 px-3 text-sm" placeholder="Name" />
          <input className="h-9 rounded-md border border-slate-300 px-3 text-sm" placeholder="Description" />
          <button className="h-9 rounded-md bg-slate-900 text-sm font-semibold text-white">Save</button>
        </div>
      );
    }
    return <p className="text-xs text-slate-500">Preview is not defined for this unit yet.</p>;
  };

  const selectedItem = filteredItems.find((item) => item.id === selectedId) ?? null;
  const pagePreviewPathMap: Record<string, string> = {
    'page.dashboard': '/home',
    'page.list': '/projects',
    'page.detail': '/projects/sample-project',
    'page.form': '/',
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Block and Screen Catalog</h1>
        <p className="mt-1 text-sm text-slate-600">
          Reusable pattern types and block definitions used by this prototype.
        </p>
        <div className="mt-3">
          <Link to="/" className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 hover:bg-slate-50">
            첫화면으로 이동
          </Link>
        </div>
      </header>

      <section className="mb-8 rounded-lg border border-slate-200 bg-white p-4">
        <div className="grid gap-4 md:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">-- {tabLabelMap[sampleTab]}</p>
            <div className="mt-2 flex gap-2">
              {[
                { key: 'components', label: '컴포넌트' },
                { key: 'blocks', label: '블록' },
                { key: 'overlays', label: '오버레이' },
                { key: 'screenPatterns', label: '화면 패턴' },
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
              placeholder="Search..."
              className="mt-3 h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800"
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
              {filteredItems.length === 0 ? <p className="px-2 py-2 text-xs text-slate-500">검색 결과가 없습니다.</p> : null}
            </div>
          </aside>

          <div>
            {sampleTab === 'components' && selectedItem?.id.startsWith('component.card') ? (
              <div className="mb-3 rounded-md border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-semibold text-slate-900">Card Variant Guide</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  <li>`Card - Project`: 프로젝트 탐색/상세 진입 중심 카드</li>
                  <li>`Card - Library Asset`: 에셋 메타 정보 스캔/비교 중심 카드</li>
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
                메뉴에서 항목을 선택하면 상세 미리보기가 표시됩니다.
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
                  예시 확인 (전체화면)
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <OverlayDialogBlock
        title="페이지 유형 전체화면 예시"
        isOpen={isPageExampleOpen}
        onClose={() => setIsPageExampleOpen(false)}
        panelClassName="max-w-6xl"
      >
        <div className="h-[75vh] overflow-hidden rounded-md border border-slate-200">
          {pageExamplePath ? (
            <iframe title="Full screen page example" src={pageExamplePath} className="h-full w-full bg-white" />
          ) : (
            <div className="grid h-full place-items-center text-sm text-slate-500">표시할 페이지 예시가 없습니다.</div>
          )}
        </div>
      </OverlayDialogBlock>
    </main>
  );
}
