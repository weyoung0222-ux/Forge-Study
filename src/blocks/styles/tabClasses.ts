/**
 * 탭(세그먼트 컨트롤) — 하단 보더형 리스트 탭 (ListStatusTabsBlock).
 * Catalog `component.tabs` 미리보기와 동일.
 */

const TAB_FOCUS = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1';

/** 단일 탭 버튼 — 활성 */
export const tabUnderlineItemActiveClasses = [
  'border-b-2 border-slate-900 bg-transparent pb-2 text-sm font-semibold text-slate-900 transition-colors',
  TAB_FOCUS,
].join(' ');

/** 단일 탭 버튼 — 비활성 */
export const tabUnderlineItemInactiveClasses = [
  'border-b-2 border-transparent bg-transparent pb-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800',
  TAB_FOCUS,
].join(' ');

/** 탭 줄 컨테이너 */
export const tabUnderlineNavClasses = 'flex gap-4 border-b border-slate-200';

/** 드로어/패널 상단 탭 — 항목에 좌우 패딩 (WorkspaceItemDetailDrawer 등) */
export const tabDrawerNavClasses = 'mb-3 flex border-b border-slate-200';

export const tabDrawerItemActiveClasses = [
  'border-b-2 border-slate-900 bg-transparent px-3 py-2 text-sm font-semibold text-slate-900 transition-colors',
  TAB_FOCUS,
].join(' ');

export const tabDrawerItemInactiveClasses = [
  'border-b-2 border-transparent bg-transparent px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800',
  TAB_FOCUS,
].join(' ');
