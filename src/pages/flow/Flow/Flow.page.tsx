import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { appShellInnerClass } from '../../../styles/appLayoutClasses';
import { iaItems, type Domain, type IaItem } from '../../../data-spec/ia/screenList.ia';

type IaRow = IaItem & {
  no: number;
  code: string;
  screenId: string;
  linkedScreen: string;
};

type ScreenListRow = IaRow;

const domainCodeMap: Record<Domain, string> = {
  Common: 'CM',
  Dev: 'DV',
  'Supporter Center': 'SC',
  'Admin Console': 'AC',
  Consumer: 'CS',
};

const depthCodeMap: Record<string, string> = {
  Login: 'LO',
  Home: 'HO',
  Project: 'PR',
  Projects: 'PR',
  Workspace: 'WS',
  Settings: 'ST',
  Library: 'LI',
  Simulation: 'SI',
  'User & Access': 'UA',
  'Global Navigation': 'GN',
};

function toDepthCode(depth1: string): string {
  if (depthCodeMap[depth1]) return depthCodeMap[depth1];
  const normalized = depth1.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  if (!normalized) return 'UN';
  return normalized.slice(0, 2).padEnd(2, 'X');
}

function buildIaRows(items: IaItem[]): IaRow[] {
  const counters = new Map<string, number>();
  const rows = items.map((item) => {
    const domainCode = domainCodeMap[item.domain];
    const depthCode = toDepthCode(item.depth1);
    const counterKey = `${domainCode}_${depthCode}`;
    const next = (counters.get(counterKey) ?? 0) + 1;
    counters.set(counterKey, next);
    const screenId = `${domainCode}_${depthCode}_${String(next).padStart(2, '0')}`;
    return {
      ...item,
      no: 0,
      code: item.domain,
      screenId,
      linkedScreen: '-',
    };
  });

  const idByKey = new Map(rows.map((row) => [row.key, row]));
  return rows.map((row, index) => {
    const linkedRow = row.linkedToKey ? idByKey.get(row.linkedToKey) : undefined;
    return {
      ...row,
      no: index + 1,
      linkedScreen: linkedRow ? `${linkedRow.screenId} - ${linkedRow.screenName}` : '-',
    };
  });
}

const screenListRows: ScreenListRow[] = buildIaRows(iaItems);
const PROJECT_ID_PREVIEW = 'pjt-002';

function resolvePreviewPath(path: string): string {
  return path.replace(':projectId', PROJECT_ID_PREVIEW);
}

const depthCellClassNameByLevel: Record<number, string> = {
  1: 'px-2 py-2 text-xs text-slate-800 font-medium',
  2: 'px-2 py-2 text-xs text-slate-700',
  3: 'px-2 py-2 text-xs text-slate-700',
  4: 'px-2 py-2 text-xs text-slate-700',
  5: 'px-2 py-2 text-xs text-slate-700',
};

type GroupedDepthRow = {
  row: ScreenListRow;
  depths: [string, string, string, string, string];
  show: [boolean, boolean, boolean, boolean, boolean];
  span: [number, number, number, number, number];
};

function getDisplayDepths(row: ScreenListRow): [string, string, string, string, string] {
  return [row.depth1 ?? '-', row.depth2 ?? '-', row.depth3 ?? '-', row.depth4 ?? '-', row.depth5 ?? '-'];
}

function compareDepthTuple(a: [string, string, string, string, string], b: [string, string, string, string, string]): number {
  for (let i = 0; i < 5; i += 1) {
    const compared = a[i].localeCompare(b[i]);
    if (compared !== 0) return compared;
  }
  return 0;
}

function getDepth1Order(domain: Domain, depth1: string): number {
  if (domain === 'Dev') {
    const order: Record<string, number> = {
      Home: 1,
      Project: 2,
      Library: 3,
    };
    return order[depth1] ?? 99;
  }
  return 99;
}

function getDevDepth3Order(depth3: string): number {
  const order: Record<string, number> = {
    '-': 0,
    Dashboard: 1,
    Workspace: 2,
    Settings: 3,
    'Project Selector': 4,
  };
  return order[depth3] ?? 99;
}

function getWorkspaceDepth4Order(depth4: string): number {
  const order: Record<string, number> = {
    'Data Foundry': 1,
    'Model Institute': 2,
  };
  return order[depth4] ?? 99;
}

function getWorkspaceDepth5Order(depth5: string): number {
  const order: Record<string, number> = {
    '-': 0,
    Register: 1,
    Collector: 2,
    Generator: 3,
    Curator: 4,
    Trainer: 5,
    Evaluator: 6,
  };
  return order[depth5] ?? 99;
}

function groupRowsByDepth(rows: ScreenListRow[]): GroupedDepthRow[] {
  const domain = rows[0]?.domain;
  const sortedRows = [...rows].sort((a, b) => {
    if (domain) {
      const depth1OrderCompared = getDepth1Order(domain, a.depth1) - getDepth1Order(domain, b.depth1);
      if (depth1OrderCompared !== 0) return depth1OrderCompared;
    }

    if (domain === 'Dev' && a.depth1 === 'Project' && b.depth1 === 'Project' && a.depth2 === 'Project List' && b.depth2 === 'Project List') {
      const depth3OrderCompared = getDevDepth3Order(a.depth3 ?? '-') - getDevDepth3Order(b.depth3 ?? '-');
      if (depth3OrderCompared !== 0) return depth3OrderCompared;

      if ((a.depth3 ?? '-') === 'Workspace' && (b.depth3 ?? '-') === 'Workspace') {
        const depth4OrderCompared = getWorkspaceDepth4Order(a.depth4 ?? '-') - getWorkspaceDepth4Order(b.depth4 ?? '-');
        if (depth4OrderCompared !== 0) return depth4OrderCompared;

        const depth5OrderCompared = getWorkspaceDepth5Order(a.depth5 ?? '-') - getWorkspaceDepth5Order(b.depth5 ?? '-');
        if (depth5OrderCompared !== 0) return depth5OrderCompared;
      }
    }

    const depthCompared = compareDepthTuple(getDisplayDepths(a), getDisplayDepths(b));
    if (depthCompared !== 0) return depthCompared;
    return a.no - b.no;
  });

  const grouped: GroupedDepthRow[] = sortedRows.map((row) => ({
    row,
    depths: getDisplayDepths(row),
    show: [false, false, false, false, false],
    span: [0, 0, 0, 0, 0],
  }));

  for (let i = 0; i < grouped.length; i += 1) {
    for (let level = 0; level < 5; level += 1) {
      const previous = grouped[i - 1];
      const current = grouped[i];
      const hasSameParentWithPrevious =
        i > 0 && Array.from({ length: level }).every((_, parentLevel) => previous.depths[parentLevel] === current.depths[parentLevel]);
      const isSameAtLevel = i > 0 && previous.depths[level] === current.depths[level];

      if (hasSameParentWithPrevious && isSameAtLevel) {
        current.show[level] = false;
        current.span[level] = 0;
        continue;
      }

      current.show[level] = true;
      let span = 1;
      for (let j = i + 1; j < grouped.length; j += 1) {
        const hasSameParent =
          Array.from({ length: level }).every((_, parentLevel) => grouped[j].depths[parentLevel] === current.depths[parentLevel]);
        if (!hasSameParent || grouped[j].depths[level] !== current.depths[level]) break;
        span += 1;
      }
      current.span[level] = span;
    }
  }

  return grouped;
}

function domainTranslationKey(domain: Domain): string {
  switch (domain) {
    case 'Common':
      return 'flow.domain.common';
    case 'Dev':
      return 'flow.domain.dev';
    case 'Supporter Center':
      return 'flow.domain.supporter';
    case 'Admin Console':
      return 'flow.domain.admin';
    case 'Consumer':
      return 'flow.domain.consumer';
    default:
      return 'flow.domain.common';
  }
}

export function FlowPage(): JSX.Element {
  const { t } = useLanguage();
  const tableHeaders = React.useMemo(
    () => [
      t('flow.th.no'),
      t('flow.th.code'),
      t('flow.th.screenId'),
      t('flow.th.depth1'),
      t('flow.th.depth2'),
      t('flow.th.depth3'),
      t('flow.th.depth4'),
      t('flow.th.depth5'),
      t('flow.th.description'),
      t('flow.th.type'),
      t('flow.th.path'),
      t('flow.th.linked'),
    ],
    [t],
  );

  const commonRows = screenListRows.filter((row) => row.domain === 'Common');
  const devRows = screenListRows.filter((row) => row.domain === 'Dev');
  const supporterRows = screenListRows.filter((row) => row.domain === 'Supporter Center');
  const adminRows = screenListRows.filter((row) => row.domain === 'Admin Console');
  const consumerRows = screenListRows.filter((row) => row.domain === 'Consumer');
  const sections: Array<{ label: Domain; rows: ScreenListRow[] }> = [
    { label: 'Common' as Domain, rows: commonRows },
    { label: 'Dev' as Domain, rows: devRows },
    { label: 'Supporter Center' as Domain, rows: supporterRows },
    { label: 'Admin Console' as Domain, rows: adminRows },
    { label: 'Consumer' as Domain, rows: consumerRows },
  ].filter((section) => section.rows.length > 0);

  const renderRows = (rows: ScreenListRow[]): JSX.Element[] =>
    groupRowsByDepth(rows).map(({ row, depths, show, span }) => (
      <tr key={row.screenId} className="border-b border-slate-100 align-top last:border-b-0">
        <td className="px-2 py-2 text-center text-xs text-slate-600">{row.no}</td>
        <td className="px-2 py-2 text-xs font-medium text-slate-700">{row.code}</td>
        <td className="px-2 py-2 text-xs font-semibold text-slate-800">{row.screenId}</td>
        {show[0] ? (
          <td rowSpan={span[0]} className={depthCellClassNameByLevel[1]}>
            {depths[0]}
          </td>
        ) : null}
        {show[1] ? (
          <td rowSpan={span[1]} className={depthCellClassNameByLevel[2]}>
            {depths[1]}
          </td>
        ) : null}
        {show[2] ? (
          <td rowSpan={span[2]} className={depthCellClassNameByLevel[3]}>
            {depths[2]}
          </td>
        ) : null}
        {show[3] ? (
          <td rowSpan={span[3]} className={depthCellClassNameByLevel[4]}>
            {depths[3]}
          </td>
        ) : null}
        {show[4] ? (
          <td rowSpan={span[4]} className={depthCellClassNameByLevel[5]}>
            {depths[4]}
          </td>
        ) : null}
        <td className="px-2 py-2 text-xs text-slate-700">{row.description}</td>
        <td className="px-2 py-2 text-center text-xs text-slate-600">{row.type}</td>
        <td className="px-2 py-2 text-xs">
          {row.path ? (
            <Link to={resolvePreviewPath(row.path)} className="text-indigo-600 hover:text-indigo-800 hover:underline">
              {row.path}
            </Link>
          ) : (
            <span className="text-slate-400">-</span>
          )}
        </td>
        <td className="px-2 py-2 text-xs text-slate-700">{row.linkedScreen}</td>
      </tr>
    ));

  return (
    <main className="min-h-screen bg-white py-8">
      <div className={appShellInnerClass}>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">{t('flow.title')}</h1>
        <p className="mt-1 text-sm text-slate-600">{t('flow.subtitle')}</p>
        <p className="mt-1 text-xs text-slate-500">{t('flow.rule')}</p>
        <div className="mt-3 flex gap-2">
          <Link to="/" className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 hover:bg-slate-50">
            {t('flow.linkLogin')}
          </Link>
          <Link to="/projects/pjt-002/workspace/settings" className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 hover:bg-slate-50">
            {t('flow.linkSettings')}
          </Link>
        </div>
      </header>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-[1680px] w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-900">
                {tableHeaders.map((header) => (
                  <th key={header} className="px-2 py-2 text-left text-xs font-semibold text-white">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                <React.Fragment key={section.label}>
                  <tr className="border-b border-slate-200 bg-slate-100">
                    <td colSpan={12} className="px-2 py-1.5 text-xs font-semibold text-slate-700">
                      {t(domainTranslationKey(section.label))}
                    </td>
                  </tr>
                  {renderRows(section.rows)}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      </div>
    </main>
  );
}
