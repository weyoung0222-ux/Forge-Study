/**
 * 네이티브 input / select / textarea 공통 스타일.
 * Catalog `component.input` · `component.select` 미리보기와 블록 폼 필드의 보더·포커스 링을 동일하게 맞춘다.
 *
 * 드롭다운(`<select>`): 브라우저 기본 화살표는 오른쪽 여백을 비대칭으로 만든다.
 * 모든 네이티브 드롭다운은 아래 `formControlSelectClasses`(및 확장)만 사용한다 — 별도 인라인 스타일 금지.
 */
const FORM_CONTROL_FOCUS =
  'focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500';

/** slate-500 chevron — 좌 `pl-3`와 맞추어 아이콘을 오른쪽 0.75rem에 배치 (URL은 Tailwind 정적 스캔용 전체 문자열) */
const NATIVE_SELECT_DROPDOWN_CHROME = [
  'cursor-pointer text-left',
  'appearance-none',
  'bg-[length:1rem_1rem] bg-no-repeat bg-[position:right_0.75rem_center]',
  'bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22m5%207.5%205%205%205-5%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E")]',
  // 텍스트가 아이콘과 겹치지 않도록 오른쪽 확보 (좌 pl-3과 시각 균형)
  'pl-3 pr-10',
].join(' ');

export const FORM_CONTROL_SURFACE = [
  'rounded-md border border-slate-300 bg-white text-sm text-slate-800 placeholder:text-slate-400 shadow-sm',
  FORM_CONTROL_FOCUS,
].join(' ');

/** 단일 행 텍스트·search (기본 h-9, 가로 full) */
export const formControlInputClasses = ['h-9 w-full px-3', FORM_CONTROL_SURFACE].join(' ');

/** 로그인 등 단일 컬럼 폼 — 높이 10 (40px) */
export const formControlInputH10Classes = ['h-10 w-full px-3', FORM_CONTROL_SURFACE].join(' ');

/** Catalog 등 max-width 제한이 필요할 때 */
export const formControlInputMaxSmClasses = ['h-9 w-full max-w-sm px-3', FORM_CONTROL_SURFACE].join(' ');

/** 네이티브 `<select>` 드롭다운 — 단일 소스 (화살표·좌우 여백 포함) */
export const formControlSelectClasses = ['h-9', NATIVE_SELECT_DROPDOWN_CHROME, FORM_CONTROL_SURFACE].join(' ');

/** 리스트 정렬용 — 최소 폭만 추가 */
export const formControlSortSelectClasses = [formControlSelectClasses, 'min-w-[170px]'].join(' ');

/** ListSearchInputBlock — 고정 폭 */
export const formControlSearchInputClasses = ['h-9 w-64 px-3', FORM_CONTROL_SURFACE].join(' ');

/** 여러 줄 */
export const formControlTextareaClasses = ['w-full px-3 py-2', FORM_CONTROL_SURFACE].join(' ');

/** 검색 아이콘 자리 (pl-9) */
export const formControlInputWithIconClasses = ['h-9 w-full pl-9 pr-3', FORM_CONTROL_SURFACE].join(' ');

/**
 * Work page step-1 파라미터 폼 — Register / Collect / Generate 동일 타이포·수직 리듬.
 * 블록: `WorkPageFormFieldBlock`, `WorkPageFormFieldLabelText` (molecules).
 */
export const workPageFormFieldLabelOuterClasses = 'block text-xs text-slate-600';

export const workPageFormFieldLabelInnerClasses =
  'mb-1 block text-xs font-semibold text-slate-900';

/** 단일 컬럼 내 필드 그룹 — 인접 필드 간 간격(File Upload ↔ 첫 인풋 포함) */
export const workPageFormFieldStackClasses = 'flex flex-col gap-4';
