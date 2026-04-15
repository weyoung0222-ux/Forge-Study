/**
 * 버튼 시각 규약 — 칩(chipClasses)과 동일하게 블록에서 임의 Tailwind 조합 대신 이 토큰을 사용한다.
 * Catalog `component.button` 미리보기와 `ButtonCatalogShowcase`와 동일 규격.
 */

const BTN_FOCUS =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1';

/** 모달 하단 전폭 Primary — Select 등 (h-11, text-base) */
export const buttonPrimaryLgFullWidthClasses = [
  'inline-flex h-11 w-full items-center justify-center rounded-md text-base font-semibold',
  'bg-slate-900 text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500',
  BTN_FOCUS,
].join(' ');

/** Primary · md — 주요 CTA (h-9, text-sm) */
export const buttonPrimaryMdClasses = [
  'inline-flex h-9 min-h-[2.25rem] items-center justify-center rounded-md bg-slate-900 px-4 text-sm font-semibold text-white',
  'hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-100',
  BTN_FOCUS,
].join(' ');

/** Secondary · md — 테두리 강조 (h-9) */
export const buttonSecondaryMdClasses = [
  'inline-flex h-9 min-h-[2.25rem] items-center justify-center rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800',
  'hover:bg-slate-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400',
  BTN_FOCUS,
].join(' ');

/** Primary · sm — 보조 영역·툴바 (h-8, text-xs) */
export const buttonPrimarySmClasses = [
  'inline-flex h-8 min-h-[2rem] items-center justify-center rounded-md bg-slate-900 px-3 text-xs font-semibold text-white',
  'hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300',
  BTN_FOCUS,
].join(' ');

/** Secondary · sm */
export const buttonSecondarySmClasses = [
  'inline-flex h-8 min-h-[2rem] items-center justify-center rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700',
  'hover:bg-slate-50 disabled:opacity-50',
  BTN_FOCUS,
].join(' ');

/** Ghost — 아이콘만·닫기 등 (패딩만) */
export const buttonIconGhostClasses = [
  'inline-flex items-center justify-center rounded-md p-1.5 text-slate-500',
  'hover:bg-slate-100 hover:text-slate-900',
  BTN_FOCUS,
].join(' ');

/** Destructive · md — 삭제 등 (프로토타입 기본 톤) */
export const buttonDangerMdClasses = [
  'inline-flex h-9 items-center justify-center rounded-md border border-rose-200 bg-rose-50 px-3 text-sm font-medium text-rose-800',
  'hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50',
  BTN_FOCUS,
].join(' ');

/** 테이블 행 액션 · xs — Publish 등 (칩 sm과 높이 맞춤 h-6) */
export const buttonTableRowActionSmClasses = [
  'inline-flex h-6 min-h-[1.5rem] items-center justify-center rounded border border-slate-300 bg-white px-2 text-[11px] font-medium text-slate-700',
  'hover:bg-slate-50',
  BTN_FOCUS,
].join(' ');

/** 페이지네이션 숫자/화살표 (TablePagination) */
export const buttonPaginationNavClasses = [
  'inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-700',
  'hover:bg-slate-50 disabled:cursor-not-allowed',
  BTN_FOCUS,
].join(' ');

/** 강조 액센트 · sm — 역할 신청 등 (Edit Profile Request access) */
export const buttonAccentAmberSmClasses = [
  'inline-flex h-8 items-center justify-center rounded-md bg-amber-900 px-2.5 text-[11px] font-semibold text-white',
  'hover:bg-amber-950 disabled:opacity-50',
  BTN_FOCUS,
].join(' ');
