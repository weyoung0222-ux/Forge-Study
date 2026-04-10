export type CommonDescriptionEntry = {
  id: string;
  label: 'Description' | 'Policy' | 'Flow';
  name: string;
  scope: 'block' | 'pattern';
  summary: string;
  bullets: string[];
};

export const commonDescriptionDictionary: CommonDescriptionEntry[] = [
  {
    id: 'rfm.globalTopNav',
    label: 'Description',
    name: 'GlobalTopNavBlock',
    scope: 'block',
    summary: '전역 이동과 시스템 액션(공지/설정/알림) 진입을 담당한다.',
    bullets: ['좌측 브랜드/메뉴, 우측 아이콘 액션 구조', '아이콘 액션은 Overlay 또는 Popover로 확장 가능'],
  },
  {
    id: 'rfm.listHeader',
    label: 'Description',
    name: 'ListHeaderBlock',
    scope: 'block',
    summary: '화면 목적(타이틀/서브타이틀)과 상단 주요 액션 버튼을 제공한다.',
    bullets: ['primaryAction은 선택값', '화면 목적과 사용자 액션을 첫 스캔에서 이해 가능해야 함'],
  },
  {
    id: 'rfm.listToolbar',
    label: 'Description',
    name: 'ListToolbarBlock',
    scope: 'block',
    summary: '검색, 칩 필터, 정렬, 우측 확장 액션을 한 줄 컨트롤로 묶는다.',
    bullets: ['검색 변경 즉시 반영', 'rightExtras 슬롯으로 화면별 컨트롤 확장'],
  },
  {
    id: 'rfm.listStatusTabs',
    label: 'Description',
    name: 'ListStatusTabsBlock',
    scope: 'block',
    summary: '유형/상태 전환 탭을 제공해 리스트 데이터 컨텍스트를 바꾼다.',
    bullets: ['active 탭은 시각적으로 명확히 구분', '탭 전환 시 데이터셋이 즉시 변경'],
  },
  {
    id: 'rfm.viewModeToggle',
    label: 'Description',
    name: 'ViewModeToggleBlock',
    scope: 'block',
    summary: '리스트/그리드 렌더 방식을 전환한다.',
    bullets: ['icon 기반 토글', '선택 상태가 즉시 레이아웃에 반영'],
  },
  {
    id: 'list-base',
    label: 'Description',
    name: 'ListBasePattern',
    scope: 'pattern',
    summary: 'GNB + 헤더 + 툴바 + 탭 + 컨텐츠 영역의 리스트형 화면 공통 패턴이다.',
    bullets: ['신규 리스트 화면의 기본 뼈대', '화면 특화 UI는 children 또는 rightExtras로 확장'],
  },
];

export function getCommonDescriptionById(id: string): CommonDescriptionEntry | undefined {
  return commonDescriptionDictionary.find((entry) => entry.id === id);
}
