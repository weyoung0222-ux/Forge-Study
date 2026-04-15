import React from 'react';

import { GlobalTopNavBlock } from '../../../blocks/molecules/GlobalTopNav.block';
import { RobotSelectCardBlock } from '../../../blocks/molecules/RobotSelectCard.block';
import { projectCreateRobotOptions } from '../../../data-spec/mocks/projectCreateRobots.mock';
import { useLanguage } from '../../../context/LanguageContext';
import {
  createGlobalTopNavItems,
  createTemporaryTopUtilityButtons,
  globalTopNavBrandIcon,
  useGlobalTopNavActions,
} from '../../../navigation/globalTopNav';

type Props = {
  onNavigate: (path: string, options?: { state?: unknown }) => void;
};

export function ProjectCreateScreen({ onNavigate }: Props): JSX.Element {
  const [selectedRobotId, setSelectedRobotId] = React.useState<string | null>(null);
  const selected = projectCreateRobotOptions.find((r) => r.id === selectedRobotId) ?? null;

  const { t } = useLanguage();
  const globalTopNavActions = useGlobalTopNavActions();
  const navItems = createGlobalTopNavItems('projects', onNavigate, t);
  const utilityButtons = createTemporaryTopUtilityButtons(() => {}, () => onNavigate('/'), t);

  const handleSelectClick = (): void => {
    if (!selectedRobotId) return;
    onNavigate('/projects/new/details', { state: { robotId: selectedRobotId } });
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#F5F5F5]">
      <GlobalTopNavBlock
        brand="PhysicalWorksForge"
        brandIcon={globalTopNavBrandIcon}
        onBrandClick={() => onNavigate('/home')}
        items={navItems}
        utilityButtons={utilityButtons}
        actions={globalTopNavActions}
      />

      <div className="flex min-h-0 w-full flex-1 flex-col lg:flex-row lg:items-stretch">
        {/* 좌측: 미선택 안내 또는 선택 로봇 대형 프리뷰 */}
        <section
          className="relative flex min-h-[40vh] flex-1 flex-col items-center justify-center overflow-hidden px-6 py-10 lg:min-h-[calc(100vh-3.5rem)]"
          aria-label="Robot preview"
        >
          {!selected ? (
            <h1 className="text-center text-4xl font-light tracking-tight text-slate-400 sm:text-5xl lg:text-6xl">
              Select a Robot,
            </h1>
          ) : (
            <>
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
                aria-hidden
              >
                <span className="select-none text-[12rem] font-extralight leading-none text-slate-200/90 sm:text-[14rem] lg:text-[16rem]">
                  {selected.name}
                </span>
              </div>
              <div className="relative z-[1] flex max-w-lg flex-col items-center">
                <div
                  className={[
                    'flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br shadow-2xl sm:h-80 sm:w-80',
                    selected.previewTone,
                  ].join(' ')}
                >
                  <span className="text-8xl drop-shadow-sm" aria-hidden>
                    🤖
                  </span>
                </div>
                <p className="mt-6 text-center text-lg font-semibold text-slate-900">{selected.name}</p>
                <p className="mt-1 text-center text-sm text-slate-600">Prototype render — replace with 3D asset.</p>
              </div>
            </>
          )}
        </section>

        {/* 우측: 2x2 그리드 + Select */}
        <aside className="flex w-full shrink-0 flex-col border-t border-slate-200 bg-[#F5F5F5] px-5 py-6 lg:w-[min(100%,420px)] lg:border-l lg:border-t-0 lg:py-10">
          <div className="grid grid-cols-2 gap-3">
            {projectCreateRobotOptions.map((opt) => (
              <RobotSelectCardBlock
                key={opt.id}
                option={opt}
                selected={selectedRobotId === opt.id}
                onSelect={setSelectedRobotId}
              />
            ))}
          </div>
          <button
            type="button"
            disabled={!selectedRobotId}
            onClick={handleSelectClick}
            className={[
              'mt-5 h-11 w-full rounded-lg text-sm font-semibold text-white transition',
              selectedRobotId
                ? 'cursor-pointer bg-[#1A1A1A] hover:bg-slate-800'
                : 'cursor-not-allowed bg-slate-400 opacity-70',
            ].join(' ')}
          >
            Select
          </button>
        </aside>
      </div>
    </main>
  );
}
