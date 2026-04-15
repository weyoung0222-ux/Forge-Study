/**
 * Work page 캔버스(Register step 1 `type2-parameter-only` 기준) — Collect 등 동일 셸 안에서 너비·간격 통일.
 */
import { toTitleCase } from '../../utils/titleCase';

export const workPageStep1TwoColumnGridClasses =
  'grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-stretch';

/** Register step1 `WorkCanvasFooterRow`와 동일 — 카드 밖 하단 액션 정렬 */
export const workPageStep1FooterRowClasses = 'flex flex-wrap items-center justify-end gap-2 pt-2';

/**
 * Collect teleop 2-col grid: fill WorkPageShell content height without outer scroll.
 * `WorkPageShellBlock` sets `--work-page-shell-scroll-inner-px` (client height minus vertical padding).
 */
export const collectTeleopGridHeightClasses =
  'min-h-0 h-[min(52rem,var(--work-page-shell-scroll-inner-px,calc(100dvh-16rem)))] max-h-[min(52rem,var(--work-page-shell-scroll-inner-px,calc(100dvh-16rem)))]';

export const workPageCanvasCardClasses = 'rounded-lg border border-slate-200 bg-white p-3';

/** 모든 activity step-1 좌측 파라미터 카드 상단 제목 (고정 문구, Title Case) */
export const WORK_PAGE_DATASET_PARAMETERS_TITLE = toTitleCase('dataset parameters');

/** Register step-1 우측(file upload) 카드 상단 제목 */
export const WORK_PAGE_FILE_SETTINGS_TITLE = toTitleCase('file settings');

/** 출력 프리뷰 등 우측/보조 카드 머리글 */
export const WORK_PAGE_OUTPUT_PREVIEW_TITLE = toTitleCase('output preview');

/** 좌·우 주요 컨테이너 박스 타이틀 — 인풋 필드 라벨(`WorkPageFormFieldBlock`)과 구분되는 섹션 머리글 */
export const workPageSectionContainerTitleClasses = 'text-sm font-semibold tracking-tight text-slate-900';
