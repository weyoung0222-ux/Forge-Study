import React from 'react';

import { tabDrawerItemActiveClasses, tabDrawerItemInactiveClasses, tabDrawerNavClasses } from '../styles/tabClasses';
import { ListStatusTabsBlock } from './ListStatusTabs.block';

/**
 * Catalog `component.tabs` — 리스트용 underline 탭 + 드로어용 패딩 탭 예시.
 */
export function TabsShowcaseBlock(): JSX.Element {
  const [listValue, setListValue] = React.useState('all');
  const [drawerTab, setDrawerTab] = React.useState<'a' | 'b'>('a');

  return (
    <div className="space-y-8 text-left">
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">List · underline (gap-4)</p>
        <p className="mb-2 text-[11px] text-slate-600">ListStatusTabsBlock — 목록 상태 필터</p>
        <ListStatusTabsBlock
          value={listValue}
          onChange={setListValue}
          items={[
            { label: 'All', value: 'all' },
            { label: 'In Progress', value: 'in-progress' },
          ]}
        />
      </section>
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Drawer · padded</p>
        <p className="mb-2 text-[11px] text-slate-600">tabDrawer* — 우측 드로어 Overview / Detail (WorkspaceItemDetailDrawer)</p>
        <nav className={tabDrawerNavClasses}>
          <button
            type="button"
            className={drawerTab === 'a' ? tabDrawerItemActiveClasses : tabDrawerItemInactiveClasses}
            onClick={() => setDrawerTab('a')}
          >
            Tab A
          </button>
          <button
            type="button"
            className={drawerTab === 'b' ? tabDrawerItemActiveClasses : tabDrawerItemInactiveClasses}
            onClick={() => setDrawerTab('b')}
          >
            Tab B
          </button>
        </nav>
      </section>
    </div>
  );
}
