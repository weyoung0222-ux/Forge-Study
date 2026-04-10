# UI Pattern Governance Policy

이 문서는 화면 개발 시 반복 적용되는 공통 원칙을 정의한다.

## 고정 원칙

- 기존 패턴/블록을 우선 활용해 화면을 구성한다.
- 기존 패턴으로 구현 불가능한 UI만 신규 블록을 생성한다.
- 패턴이 생성/변경되면 다음을 반드시 수행한다.
  - 변경 사실을 사용자에게 안내
  - `catalog` 반영
  - 해당 패턴을 사용하는 모든 컴포넌트/화면에 일괄 적용
- 블록/패턴은 항상 재사용 가능한 형태로 설계한다.

## 구현 체크리스트

1. 구현 전:
   - `src/blocks/registry/blockRegistry.ts`
   - `src/blocks/registry/patternRegistry.ts`
   확인 후 재사용 가능성 먼저 판단
2. 구현 중:
   - 블록: `src/blocks/*`
   - 패턴: `src/patterns/*`
   - 화면 연결: `src/screens/*`, `src/pages/*`
3. 구현 후:
   - 레지스트리 동기화
   - catalog 동기화
   - 영향 화면 목록 정리
