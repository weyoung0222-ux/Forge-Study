import React from 'react';

import { GlobalTopNavBlock } from '../../../blocks/molecules/GlobalTopNav.block';
import { ListHeaderBlock } from '../../../blocks/molecules/ListHeader.block';
import { ProjectInfoListPanelBlock } from '../../../blocks/organisms/ProjectInfoListPanel.block';
import { ProjectOutputSummaryPanelBlock } from '../../../blocks/organisms/ProjectOutputSummaryPanel.block';
import { getLibraryAssetDetailView } from '../../../data-spec/mocks/libraryAssets.mock';
import { useLanguage } from '../../../context/LanguageContext';
import { appShellInnerClass } from '../../../styles/appLayoutClasses';
import { ArrowLeftOutlined } from '../../../icons';
import {
  createGlobalTopNavItems,
  createTemporaryTopUtilityButtons,
  globalTopNavBrandIcon,
  useGlobalTopNavActions,
} from '../../../navigation/globalTopNav';

type NavigateFn = (to: string, options?: { state?: unknown }) => void;

type Props = {
  assetKind: 'dataset' | 'model';
  assetId: string;
  onNavigate: NavigateFn;
};

export function LibraryAssetDetailScreen({ assetKind, assetId, onNavigate }: Props): JSX.Element {
  const asset = getLibraryAssetDetailView(assetId);

  const { t } = useLanguage();
  const globalTopNavActions = useGlobalTopNavActions();
  const navItems = createGlobalTopNavItems('library', onNavigate, t);
  const utilityButtons = createTemporaryTopUtilityButtons(() => {}, () => onNavigate('/'), t);

  const wrongKind = asset && asset.type !== assetKind;

  if (!asset || wrongKind) {
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
        <div className={[appShellInnerClass, 'py-10'].join(' ')}>
          <p className="text-sm text-slate-700">
            {wrongKind ? 'This asset exists under a different library tab.' : 'Asset not found.'}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/library')}
            className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            <ArrowLeftOutlined />
            Back to Library
          </button>
        </div>
      </main>
    );
  }

  const kindLabel = assetKind === 'dataset' ? 'Dataset' : 'Model';
  const subtitle = `${kindLabel} · ${asset.detailSummary} (${asset.workDescription})`;

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

      <div className={[appShellInnerClass, 'py-4'].join(' ')}>
        <div className="mb-4">
          <button
            type="button"
            onClick={() => onNavigate('/library', { state: { selectedAssetId: asset.id } })}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            <ArrowLeftOutlined aria-hidden className="text-xs" />
            Back to Library
          </button>
        </div>

        <ListHeaderBlock title={asset.outputName} subtitle={subtitle} />

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <ProjectInfoListPanelBlock
            title="Overview"
            items={[
              {
                id: 'o-1',
                title: 'Source activity',
                subtitle: asset.sourceLabel,
                meta: `Registered as ${asset.sourceType} output (prototype).`,
                badge: asset.sourceLabel,
              },
              {
                id: 'o-2',
                title: 'Version',
                subtitle: asset.detailVersion,
                meta: asset.detailProject,
              },
              {
                id: 'o-3',
                title: 'Storage',
                subtitle: asset.fileSize,
                meta: `Created ${asset.createdLabel.replace(/^Created /, '')}`,
              },
            ]}
          />
          <ProjectOutputSummaryPanelBlock
            title="Usage snapshot (dummy)"
            metrics={[
              { label: 'Downloads', value: '128', delta: 'Last 7 days (prototype)' },
              { label: 'Linked projects', value: '3', delta: 'PJT-002, PJT-003, PJT-004' },
            ]}
          />
        </div>

        <section className="mt-6 rounded-lg border border-dashed border-slate-300 bg-white/80 p-4">
          <p className="text-sm font-semibold text-slate-900">Detail body (placeholder)</p>
          <p className="mt-2 text-sm text-slate-600">
            Full lineage, schema, and actions will be defined in a later design pass. Route:{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">
              {assetKind === 'dataset' ? `/library/datasets/${assetId}` : `/library/models/${assetId}`}
            </code>
          </p>
        </section>
      </div>
    </main>
  );
}
