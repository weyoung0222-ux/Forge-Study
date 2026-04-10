import React from 'react';

import { GlobalTopNavBlock } from '../../../blocks/molecules/GlobalTopNav.block';
import { ScreenDescriptionPanelBlock } from '../../../blocks/organisms/ScreenDescriptionPanel.block';
import {
  createGlobalTopNavItems,
  createTemporaryTopUtilityButtons,
  globalTopNavActions,
  globalTopNavBrandIcon,
} from '../../../navigation/globalTopNav';
import { homeDashboardUxDescription } from './HomeDashboard.ux';

type Props = {
  onNavigate: (path: string) => void;
};

type HomeHighlightKey =
  | 'overviewCards'
  | 'bookmarkedProjects'
  | 'myLibrary'
  | 'assignedJobs'
  | 'recentActivity'
  | 'libraryFeed';

function WidgetCard({ title, subtitle }: { title: string; subtitle?: string }): JSX.Element {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs font-medium text-slate-500">{title}</p>
      <div className="mt-2 min-h-9 rounded-md border border-slate-100 bg-slate-50" />
      {subtitle ? <p className="mt-2 text-[11px] text-slate-400">{subtitle}</p> : null}
    </article>
  );
}

function WidgetPanel({ title, children }: { title: string; children: React.ReactNode }): JSX.Element {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function HomeDashboardScreen({ onNavigate }: Props): JSX.Element {
  const navItems = createGlobalTopNavItems('home', onNavigate);
  const [isUxOpen, setIsUxOpen] = React.useState(false);
  const [highlightedKey, setHighlightedKey] = React.useState<HomeHighlightKey | null>(null);
  const topUtilityButtons = createTemporaryTopUtilityButtons(
    () => setIsUxOpen(true),
    () => onNavigate('/'),
  );
  const highlightedSectionClass = (key: HomeHighlightKey): string =>
    highlightedKey === key ? 'rounded-lg ring-2 ring-indigo-400 ring-offset-2 transition' : '';

  return (
    <>
      <main className="min-h-screen bg-slate-100">
        <GlobalTopNavBlock
          brand="PhysicalWorksForge"
          brandIcon={globalTopNavBrandIcon}
          onBrandClick={() => onNavigate('/home')}
          items={navItems}
          utilityButtons={topUtilityButtons}
          actions={globalTopNavActions}
        />

        <div className={isUxOpen ? 'pr-0 transition-[padding] duration-300 lg:pr-[440px]' : 'transition-[padding] duration-300'}>
          <div className="mx-auto w-full max-w-7xl px-6 py-8">
            <header className="mb-6">
              <h1 className="text-3xl font-semibold text-slate-900">Hello, Developer WIYOUNG.</h1>
              <p className="mt-1 text-sm text-slate-600">Overview of your dashboard widgets.</p>
            </header>

            <div className={['grid gap-4 md:grid-cols-3', highlightedSectionClass('overviewCards')].join(' ')}>
              <WidgetCard title="Total Projects" subtitle="Value pending" />
              <WidgetCard title="Datasets Created" subtitle="Value pending" />
              <WidgetCard title="Model Fine-tuned" subtitle="Value pending" />
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <div className={['lg:col-span-2', highlightedSectionClass('bookmarkedProjects')].join(' ')}>
                <WidgetPanel title="Bookmarked Projects">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="h-40 rounded-md border border-slate-200 bg-slate-50" />
                    <div className="h-40 rounded-md border border-slate-200 bg-slate-50" />
                  </div>
                </WidgetPanel>
              </div>
              <div className={highlightedSectionClass('myLibrary')}>
                <WidgetPanel title="My Library">
                  <div className="space-y-2">
                    <div className="h-16 rounded-md border border-slate-200 bg-slate-50" />
                    <div className="h-16 rounded-md border border-slate-200 bg-slate-50" />
                    <div className="h-16 rounded-md border border-slate-200 bg-slate-50" />
                  </div>
                </WidgetPanel>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <div className={['lg:col-span-2', highlightedSectionClass('assignedJobs')].join(' ')}>
                <WidgetPanel title="Assigned Jobs">
                  <div className="space-y-2">
                    <div className="h-20 rounded-md border border-slate-200 bg-slate-50" />
                    <div className="h-20 rounded-md border border-slate-200 bg-slate-50" />
                  </div>
                </WidgetPanel>
              </div>
              <div className={highlightedSectionClass('recentActivity')}>
                <WidgetPanel title="Recent completed Activity">
                  <div className="space-y-2">
                    <div className="h-16 rounded-md border border-slate-200 bg-slate-50" />
                    <div className="h-16 rounded-md border border-slate-200 bg-slate-50" />
                    <div className="h-16 rounded-md border border-slate-200 bg-slate-50" />
                  </div>
                </WidgetPanel>
              </div>
            </div>

            <div className={['mt-4', highlightedSectionClass('libraryFeed')].join(' ')}>
              <WidgetPanel title="Library Feed">
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="h-16 rounded-md border border-slate-200 bg-slate-50" />
                  <div className="h-16 rounded-md border border-slate-200 bg-slate-50" />
                </div>
              </WidgetPanel>
            </div>
          </div>
        </div>
      </main>
      <ScreenDescriptionPanelBlock
        isOpen={isUxOpen}
        title={homeDashboardUxDescription.title}
        summary={homeDashboardUxDescription.summary}
        items={homeDashboardUxDescription.items}
        onClose={() => {
          setIsUxOpen(false);
          setHighlightedKey(null);
        }}
        onItemEnter={(itemKey) => setHighlightedKey(itemKey as HomeHighlightKey)}
        onItemLeave={() => setHighlightedKey(null)}
      />
    </>
  );
}
