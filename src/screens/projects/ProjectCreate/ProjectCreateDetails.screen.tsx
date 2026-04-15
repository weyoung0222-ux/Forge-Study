import React from 'react';

import { GlobalTopNavBlock } from '../../../blocks/molecules/GlobalTopNav.block';
import { ListHeaderBlock } from '../../../blocks/molecules/ListHeader.block';
import { getRobotOptionById } from '../../../data-spec/mocks/projectCreateRobots.mock';
import { useLanguage } from '../../../context/LanguageContext';
import { ArrowLeftOutlined } from '../../../icons';
import {
  createGlobalTopNavItems,
  createTemporaryTopUtilityButtons,
  globalTopNavBrandIcon,
  useGlobalTopNavActions,
} from '../../../navigation/globalTopNav';

type Props = {
  robotId: string | undefined;
  onNavigate: (path: string, options?: { state?: unknown }) => void;
};

/** 프로젝트 상세 입력 단계 — 기획 전 플레이스홀더 */
export function ProjectCreateDetailsScreen({ robotId, onNavigate }: Props): JSX.Element {
  const robot = robotId ? getRobotOptionById(robotId) : undefined;

  const { t } = useLanguage();
  const globalTopNavActions = useGlobalTopNavActions();
  const navItems = createGlobalTopNavItems('projects', onNavigate, t);
  const utilityButtons = createTemporaryTopUtilityButtons(() => {}, () => onNavigate('/'), t);

  return (
    <main className="min-h-screen bg-slate-100">
      <GlobalTopNavBlock
        brand="PhysicalWorksForge"
        brandIcon={globalTopNavBrandIcon}
        onBrandClick={() => onNavigate('/home')}
        items={navItems}
        utilityButtons={utilityButtons}
        actions={globalTopNavActions}
      />
      <div className="mx-auto max-w-3xl px-4 py-6">
        <button
          type="button"
          onClick={() => onNavigate('/projects/new')}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          <ArrowLeftOutlined className="text-xs" />
          Back to robot selection
        </button>
        <ListHeaderBlock
          title="Create project — details"
          subtitle={
            robot
              ? `Selected robot: ${robot.name}. Project name, description, and policies will be defined in a later iteration.`
              : 'No robot in session state. Go back to select a robot.'
          }
        />
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-6">
          <p className="text-sm text-slate-600">
            Route: <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">/projects/new/details</code>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            State: <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">robotId = {robotId ?? '—'}</code>
          </p>
        </div>
      </div>
    </main>
  );
}
