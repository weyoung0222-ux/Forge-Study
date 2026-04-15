# UI Primitives Inventory

프로토타입에서 **카탈로그에 올리고 토큰으로 고정**한 UI 단위와 파일 위치를 한눈에 본다. 새 단위를 추가할 때는 여기에 한 줄 적고, `unitDefinitions.ts` + Catalog 미리보기 + (해당 시) `src/blocks/styles/*`를 같은 작업에서 갱신한다.

## 토큰 / 스타일 소스

| 영역 | 파일 | 비고 |
|------|------|------|
| 폼 input / select / textarea | `src/blocks/styles/formFieldClasses.ts` | 포커스 링 통일 |
| 칩·배지 | `src/blocks/styles/chipClasses.ts` | Source, 역할, 메타 등 h-6 규약 |
| 버튼 | `src/blocks/styles/buttonClasses.ts` | md/sm, 테이블 행, 모달 전폭 |
| 탭 | `src/blocks/styles/tabClasses.ts` | underline 리스트, 드로어 패딩 |
| 역할 칩 색 | `src/blocks/utils/memberRolePresentation.ts` | user-role-policy 정합 |

## Catalog `component.*` 유닛 (요약)

| id | 대표 구현 / 미리보기 |
|----|---------------------|
| `component.button` | `Button.block.tsx` → `ButtonCatalogShowcase` |
| `component.input` | `ListSearchInput.block.tsx`, `formFieldClasses` |
| `component.textarea` | `formFieldClasses.formControlTextareaClasses` |
| `component.select` | `ListSortSelect.block.tsx` — 네이티브 select(기획상 Dropdown 호칭 포함) 동일 토큰 |
| `component.chip` | `Chip.block.tsx` |
| `component.toggle` | `ViewModeToggle.block.tsx` |
| `component.tabs` | `TabsShowcase.block.tsx` + `ListStatusTabs.block.tsx` |
| `component.card.project` | `ProjectCard.block.tsx` |
| `component.card.library` | `LibraryAssetCard.block.tsx` |

## 블록 단위 (예시)

| 블록 | 구성에 자주 쓰는 컴포넌트 토큰 |
|------|------------------------------|
| `ListToolbarBlock` | input, chip(filter), select |
| `ListStatusTabsBlock` | tabClasses |
| `TablePaginationBlock` | buttonPaginationNavClasses |
| `FormTagInputBlock` | input, chip(tag), RemovableTagChip |

## 새 primitive 추가 절차

1. `src/blocks/styles/` 또는 `molecules/*.block.tsx`에 구현.
2. `src/descriptions/unitDefinitions.ts`에 `component.*` 또는 `desc-rfm.*` 항목 추가 (`renderable`, `usedInPrototype`).
3. `Catalog.page.tsx`에 `renderPreview` 분기.
4. `docs/policies/component-block-catalog-governance.md`에 규칙이 바뀌면 한 줄 보강.
5. `src/blocks/registry/blockRegistry.ts`에 블록 메타가 필요하면 추가.

## 연쇄 반영이 보장되는 범위

- **토큰**(`src/blocks/styles/*Classes.ts`)을 import하는 블록·화면은, 그 토큰을 바꾸면 **같은 클래스를 쓰는 모든 곳**에 반영된다.
- **카탈로그 `component.*`** 는 정의상 **한 유닉당 한 번**만 둔다. 동일 미리보기·동일 토큰을 다른 이름으로 중복 등록하지 않는다(예: Select와 Dropdown 분리 없음).
- **주의**: 화면에 인라인 Tailwind만으로 그린 시각 요소는 토큰과 무관하게 남을 수 있다. 신규·수정 시에는 블록 + 공용 토큰 경유를 우선한다.

## 관련 문서

- `component-block-catalog-governance.md` — 블록·컴포넌트 관계
- `catalog-description-sync.md` — Catalog 단일 유지
