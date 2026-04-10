import type { ScreenDescriptionItem } from '../../../blocks/organisms/ScreenDescriptionPanel.block';

export const projectListUxDescription: {
  title: string;
  summary: string;
  items: ScreenDescriptionItem[];
} = {
  title: 'Project List 화면 설명',
  summary: '프로젝트 탐색/필터링/정렬 흐름에서 필요한 핵심 영역만 간결하게 정리합니다.',
  items: [
    {
      number: 1,
      label: 'Description',
      key: 'listHeader',
      title: '헤더 영역',
      description: '화면 목적과 주요 액션(Create Project)을 제공하는 진입 영역',
    },
    {
      number: 2,
      label: 'Description',
      key: 'listToolbar',
      title: '검색/필터/정렬 영역',
      description: '키워드 검색, 역할 필터, 정렬 옵션으로 목록 탐색 범위를 조정',
    },
    {
      number: 3,
      label: 'Description',
      key: 'listStatusTabs',
      title: '상태 탭',
      description: 'All / In Progress / Completed 상태 기준으로 목록을 분기',
    },
    {
      number: 4,
      label: 'Description',
      key: 'listContent',
      title: '프로젝트 카드 목록',
      description: '필터 결과를 카드 형태로 노출하고, 카드 클릭 시 상세 화면으로 이동',
    },
  ],
};
