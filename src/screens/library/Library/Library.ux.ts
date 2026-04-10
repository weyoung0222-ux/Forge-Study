import type { ScreenDescriptionItem } from '../../../blocks/organisms/ScreenDescriptionPanel.block';

export type LibraryUxDescription = {
  title: string;
  summary: string;
  items: ScreenDescriptionItem[];
};

export const libraryUxDescription: LibraryUxDescription = {
  title: 'Library 화면 UX 기획 (블록 단위)',
  summary:
    'Library 화면에서 실제로 중요한 화면 전용 규칙만 정리한다. 공통 블록 규칙은 Descriptions 메뉴의 Common Descriptions를 참조한다.',
  items: [
    {
      number: 1,
      label: 'Description',
      key: 'librarySourceFilter',
      title: 'Source Filter',
      description: '산출물 Source 기준 세부 필터',
      bullets: ['default: all', '선택 값: register, collector, generator, curator, trainer, evaluator'],
    },
    {
      number: 2,
      label: 'Description',
      key: 'viewModeToggle',
      title: 'View Switch Option',
      description: '카드형/리스트형 렌더 방식 전환',
      bullets: ['아이콘 토글 클릭으로 즉시 반영', '사용자 선호 시각화 방식 유지 가능'],
    },
    {
      number: 3,
      label: 'Description',
      key: 'listStatusTabs',
      title: 'Tab',
      description: '산출물 형태 기준으로 프로젝트 카드 필터링',
      bullets: ['Data builder 산출물 -> Dataset', 'Trainer 산출물 -> model'],
    },
    {
      number: 4,
      label: 'Description',
      key: 'libraryAssetCard',
      title: 'Dataset Card',
      description: '생성된 데이터셋 정보가 기입된 카드, 클릭 시 데이터셋 상세로 이동',
    },
    {
      number: 5,
      label: 'Description',
      key: 'libraryAssetCardTitle',
      title: 'Card Title',
      description: '카드의 대표 식별 텍스트',
      bullets: ['최대 28자 노출', '초과 시 말줄임(...) 처리'],
    },
    {
      number: 6,
      label: 'Description',
      key: 'libraryAssetCardSource',
      title: 'Source Badge',
      description: '데이터 출처를 빠르게 구분하는 배지',
      bullets: ['카드 우측 상단 고정 배치', '짧은 텍스트 배지 형태 유지'],
    },
    {
      number: 7,
      label: 'Description',
      key: 'libraryAssetCardMeta',
      title: 'Card Meta',
      description: '보조 정보(프로젝트/용량/생성시점) 표시 영역',
      bullets: ['표시 순서: Project · size · created', '정보 밀도가 높아도 한 줄 스캔이 가능해야 함'],
    },
    {
      number: 8,
      label: 'Description',
      key: 'libraryAssetGrid',
      title: 'Dataset Grid',
      description: '필터 결과를 카드 컬렉션으로 배치',
      bullets: ['Grid 모드: 2열 중심 배치', 'List 모드: 1열 스택 배치'],
    },
  ],
};
