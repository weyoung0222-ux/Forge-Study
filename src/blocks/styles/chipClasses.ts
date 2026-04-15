/**
 * 칩(Chip) / 배지 시각 규약 — 블록에 인라인 Tailwind로 칩을 새로 만들지 말고 이 토큰 또는 Chip.block export를 사용한다.
 * Catalog `component.chip` 미리보기와 동일한 규격이다.
 *
 * 높이: **컴팩트(sm)** 계열은 모두 `h-6` (24px) + `leading-none` + `inline-flex items-center` 로 맞춘다.
 * (기존 py-0.5 + text-[10px] 혼합으로 17~21px로 흐르던 문제 방지)
 */

/** 컴팩트 칩 공통 — 한 줄 24px 캡슐 */
const CHIP_COMPACT_LAYOUT =
  'inline-flex items-center justify-center shrink-0 rounded-full border leading-none [line-height:1]';

const CHIP_COMPACT_H = 'h-6 min-h-[1.5rem]';

/** Filter · md — 리스트 필터 토글 (약 32px 높이) */
export const chipFilterInactiveClasses = [
  'inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 transition-colors hover:border-slate-400',
  'h-8 min-h-[2rem]',
].join(' ');

export const chipFilterActiveClasses = [
  'inline-flex items-center justify-center rounded-full border border-slate-900 bg-slate-900 px-3 text-xs font-medium text-white',
  'h-8 min-h-[2rem]',
].join(' ');

/** Tag · xs — 폼 태그 줄 (제거 버튼 포함 행) */
export const chipTagRowShellClasses =
  'inline-flex max-w-full min-h-6 items-center gap-0.5 rounded-full border border-slate-300 bg-slate-50 py-0.5 pl-2 pr-0.5 text-[11px] font-medium leading-none text-slate-600';

export const chipTagRemoveButtonClasses =
  'inline-flex shrink-0 rounded-full p-0.5 text-slate-500 hover:bg-slate-200 hover:text-slate-800';

/** Meta · xs — 섹션 카운트 등 읽기 전용 배지 */
export const chipMetaCountClasses = [
  CHIP_COMPACT_LAYOUT,
  CHIP_COMPACT_H,
  'border-slate-300 bg-slate-50 px-2.5 text-[11px] font-semibold text-slate-600',
].join(' ');

/**
 * Source · sm — source-policy 활동 키(register / collector / …) 테이블·카드 배지.
 * DataTable, Workspace, Settings, Catalog 미리보기 공통.
 */
export const chipSourceActivityClasses = [
  CHIP_COMPACT_LAYOUT,
  CHIP_COMPACT_H,
  'border-slate-300 bg-slate-50 px-2.5 text-[11px] font-medium capitalize text-slate-700',
].join(' ');

/**
 * Neutral badge — 리스트 행 우측 배지(ProjectInfoListPanel `badge`), 카탈로그 플레이스홀더 등.
 */
export const chipBadgeNeutralCompactClasses = [
  CHIP_COMPACT_LAYOUT,
  CHIP_COMPACT_H,
  'border-slate-300 bg-white px-2.5 text-[11px] font-medium text-slate-600',
].join(' ');

/**
 * Role · sm — 역할 칩 껍데기(h-6). 색은 `memberRoleChipSurfaceClass`와 조합.
 */
export const chipRoleCompactShellClasses = [
  'inline-flex items-center justify-center h-6 min-h-[1.5rem] max-h-6 shrink-0 rounded-full border px-2.5 text-[11px] font-medium leading-none [line-height:1]',
].join(' ');

/** 카드 상단 Source 라벨(라이브러리 에셋 카드 등) — Source · sm 과 동일 높이 */
export const chipCardSourceLabelClasses = chipSourceActivityClasses;

/** 패널/모달 타이틀 옆 카운트 (ProjectSelector 등) */
export const chipTitleInlineCountClasses = [
  CHIP_COMPACT_LAYOUT,
  CHIP_COMPACT_H,
  'border-slate-300 bg-white px-2 text-xs font-medium text-slate-500',
].join(' ');

const CHIP_STATUS_ROW =
  'inline-flex items-center justify-center h-6 min-h-[1.5rem] max-h-6 shrink-0 rounded-full border px-2.5 text-[11px] font-medium leading-none [line-height:1]';

/** 상태 배지 — Granted 등 긍정 (Edit Profile 등) */
export const chipStatusPositiveCompactClasses = [
  CHIP_STATUS_ROW,
  'border-emerald-200 bg-emerald-50 font-semibold text-emerald-800',
].join(' ');

/** Job/리소스 테이블 상태 톤 (Settings 등) */
export const chipStatusRunningClasses = [CHIP_STATUS_ROW, 'border-emerald-200 bg-emerald-50 text-emerald-700'].join(' ');

export const chipStatusQueuedClasses = [CHIP_STATUS_ROW, 'border-amber-200 bg-amber-50 text-amber-700'].join(' ');

export const chipStatusPausedClasses = [CHIP_STATUS_ROW, 'border-slate-200 bg-slate-100 text-slate-600'].join(' ');

/** 테이블 행 Success / Fail / Warn (WorkspaceItemDetailDrawer 등) */
export const chipValidationSuccessCompactClasses = [CHIP_STATUS_ROW, 'border-emerald-200 bg-emerald-50 font-semibold text-emerald-700'].join(
  ' ',
);

export const chipValidationFailCompactClasses = [CHIP_STATUS_ROW, 'border-rose-200 bg-rose-50 font-semibold text-rose-700'].join(' ');

export const chipValidationWarnCompactClasses = [CHIP_STATUS_ROW, 'border-amber-200 bg-amber-50 font-semibold text-amber-700'].join(' ');
