# Component–Block–Catalog Governance

## Purpose

- **컴포넌트**는 화면에 반복 등장하는 **최소 UI 단위**이며, **블록**은 컴포넌트(와 다른 블록)를 조합해 만든 **재사용 가능한 덩어리**다.
- **카탈로그**는 프로토타입에서 쓰이는 모든 컴포넌트·블록·화면 패턴을 한곳에서 찾을 수 있게 하는 단일 진실 공급원이다.
- 블록 안에만 존재하고 카탈로그 **컴포넌트** 탭에 정의되지 않은 시각 단위(칩 크기·버튼 변형 등)를 두지 않는다.

## 규칙

### 1. 블록은 컴포넌트 위에만 쌓인다

- 새 블록을 만들 때, 그 안의 **버튼·인풋·셀렉트·칩·배지** 등은 이미 카탈로그 **컴포넌트**에 등록된 토큰/블록을 쓴다.
- 기존에 없는 형태가 필요하면 **먼저 컴포넌트(또는 `src/blocks/styles/*` 토큰)를 추가**한 뒤 블록에서 참조한다.
- 예외: 데이터 전용 로직·레이아웃 그리드만 있고 시각적 단위가 없는 경우는 블록 설명에 “시각 단위 없음”으로 명시한다.

### 2. 버튼(Button)

- 크기·역할별 클래스는 **`src/blocks/styles/buttonClasses.ts`** 에만 정의한다.
- 카탈로그 **`component.button`** 미리보기(`ButtonCatalogShowcase`)와 동일한 토큰을 블록에서 사용한다.

### 3. 탭(Tabs)

- 리스트 상단 **underline** 탭: `tabClasses`의 `tabUnderline*` + `ListStatusTabsBlock`.
- 드로어/패널 **패딩 탭**: `tabDrawer*` (예: `WorkspaceItemDetailDrawerBlock`).
- 카탈로그 **`component.tabs`** 에서 두 패턴을 함께 본다 (`TabsShowcaseBlock`).

### 3a. Select (네이티브 / 기획상 “Dropdown”)

- 네이티브 `<select>` 시각은 **`formControlSelectClasses`** (`formFieldClasses.ts`) 단일 소스. 블록에서는 `ListSortSelectBlock` 등으로 조합한다.
- 카탈로그에는 **`component.select`** 만 등록한다. UI 카피에서 Dropdown이라 부르는 경우도 **별도 `component.dropdown`이 아니라** 동일 유닛으로 본다. 커스텀 패널형 드롭다운이 필요해지면 **새 블록 + 새 카탈로그 유닛**으로만 추가한다.

### 4. 칩(Chip) 계열

- **칩**은 용도·크기가 다르면 카탈로그에서 **구분**한다. 현재 규약:
  - **Filter · md** — 리스트 툴바 **토글** (`h-8`, `text-xs`).
  - **컴팩트 sm (h-6)** — 테이블 **Source**, **역할(Role)**, 섹션 **메타·배지**, 카드 Source 등 동일 높이 (`text-[11px]`, `leading-none`). 임의 `py-0.5` + `text-[10px]` 혼합 금지.
  - **Tag · xs** — 폼 **입력 태그** (제거 버튼, `min-h-6` 정렬).
- 스타일 문자열은 `src/blocks/styles/chipClasses.ts`에 모은다. 블록 파일에 칩 색·패딩을 하드코딩하지 않는다(해당 토큰을 쓰거나 `Chip` 블록 export 사용).
- 새 칩 **크기·변형**이 필요하면: (1) `chipClasses`에 토큰 추가, (2) `Chip.block.tsx`에 변형 노출, (3) `unitDefinitions`의 `component.chip` 설명·Catalog 미리보기 갱신.

### 5. 카탈로그 유닛 정의 (`unitDefinitions.ts`)

- 각 **블록** 항목의 `bullets`에 가능하면 **`구성 컴포넌트:`** 또는 **`구성:`** 한 줄을 넣어, 어떤 컴포넌트·하위 블록을 쓰는지 적는다.
- 각 **화면 패턴** 항목에는 **`주요 블록:`** 또는 **`주요 구성:`**으로 대표 블록·경로를 적는다.
- `codePath`는 해당 유닛의 **대표 구현 파일**을 가리킨다. 컴포넌트는 공용 `Chip.block.tsx`, `ListSearchInput.block.tsx` 등 분리된 파일을 우선한다.

### 6. 변경 시 체크리스트

1. 토큰/컴포넌트 추가 또는 수정 (`chipClasses`, `buttonClasses`, `tabClasses`, `formFieldClasses`, `*.block.tsx`).
2. `src/descriptions/unitDefinitions.ts` 동기화(요약·bullets·codePath).
3. `src/pages/catalog/Catalog/Catalog.page.tsx` 미리보기 매핑.
4. `src/blocks/registry/blockRegistry.ts` / `patternRegistry.ts`가 실제 파일과 일치하는지 확인.

### 7. 관련 문서

- `docs/policies/catalog-description-sync.md` — Catalog 단일 유지·가시성 규칙.
- `docs/policies/ui-pattern-governance.md` — GNB·Description 패널 등 UI 패턴.
- `docs/policies/ui-primitives-inventory.md` — 토큰·컴포넌트 인벤토리(추가 절차).
