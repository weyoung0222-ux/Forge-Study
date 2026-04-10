# 화면 생성 템플릿

## 1) 기본 규칙
- 모든 화면은 `blocks`를 조합해서 만든다.
- `blocks`는 재사용 가능해야 한다.
- 새로운 UI는 반드시 `block`으로 먼저 정의한 뒤 화면에서 사용한다.
- `blocks catalog`(registry + catalog preview)는 항상 최신 상태로 유지한다.
- `Source` 표기는 `docs/policies/source-policy.md`를 따른다.
- `Source`는 activity 기반 값(`register`, `collector`, `generator`, `curator`, `trainer`, `evaluator`)만 사용한다.

## 2) 작업 절차
1. 와이어프레임/요구사항을 기준으로 화면을 블록 단위로 분해한다.
2. 기존 블록 재사용 가능 여부를 먼저 판단한다.
3. 부족한 UI는 신규 블록으로 정의한다. (재사용 가능한 props 구조)
4. 화면(`screen`)을 블록 조합으로 구현한다.
5. 라우팅(`page`)과 화면 연결을 반영한다.
6. 카탈로그/레지스트리를 동기화한다.

## 3) 파일 반영 체크리스트
- 화면 구현
  - `src/screens/<domain>/<ScreenName>/<ScreenName>.screen.tsx`
  - 필요 시 `*.ux.ts` (Description 패널용 설명 데이터)
- 페이지 연결
  - `src/pages/.../*.page.tsx`
  - `src/pages/.../*.route.ts` (신규 경로 필요 시)
- 블록 구현
  - `src/blocks/molecules/*.block.tsx`
  - `src/blocks/organisms/*.block.tsx`
- 레지스트리/카탈로그 동기화
  - `src/blocks/registry/blockRegistry.ts`
  - `src/blocks/registry/patternRegistry.ts`
  - `src/descriptions/unitDefinitions.ts`
  - `src/pages/catalog/Catalog/Catalog.page.tsx`

## 4) 블록 설계 원칙
- 화면 전용 하드코딩을 피하고, 재사용 가능한 prop 기반으로 설계한다.
- 공통 네비게이션/오버레이/드로워 등은 기존 공통 블록을 우선 사용한다.
- 유사 UI가 2회 이상 등장하면 공통 블록으로 승격한다.
- 접근성(aria-label, 버튼 role, 키보드 동작)을 기본 반영한다.
- Source chip/badge는 placeholder(`{Source}`) 대신 실제 activity label을 사용한다.

## 5) 결과 정리 형식 (응답 템플릿)
- Block 구조 목록
- 재사용 블록 / 신규 블록 구분
- 생성된 코드
- catalog 업데이트 내용

## 6) 최종 검증
- 라우팅 동작 확인 (`목록 -> 상세` 등)
- Catalog 항목 노출/검색/미리보기 정상 동작 확인
- Description(우측 패널) 연동 화면의 하이라이트 동작 확인
- 변경 파일 lint 에러 확인 및 정리
