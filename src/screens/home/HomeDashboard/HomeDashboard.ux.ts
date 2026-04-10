import type { ScreenDescriptionItem } from '../../../blocks/organisms/ScreenDescriptionPanel.block';

export const homeDashboardUxDescription: {
  title: string;
  summary: string;
  items: ScreenDescriptionItem[];
} = {
  title: 'Home Dashboard 화면 설명',
  summary: '로그인 직후 전체 작업 상태를 한 번에 파악하기 위한 대시보드형 화면입니다.',
  items: [
    {
      number: 1,
      label: 'Description',
      key: 'overviewCards',
      title: '요약 카드',
      description: '핵심 지표를 빠르게 스캔하는 상단 KPI 카드 영역',
    },
    {
      number: 2,
      label: 'Description',
      key: 'bookmarkedProjects',
      title: 'Bookmarked Projects',
      description: '자주 확인하는 프로젝트를 우선 노출하는 위젯 영역',
    },
    {
      number: 3,
      label: 'Description',
      key: 'myLibrary',
      title: 'My Library',
      description: '개인 라이브러리 항목을 최근 기준으로 확인하는 위젯',
    },
    {
      number: 4,
      label: 'Description',
      key: 'assignedJobs',
      title: 'Assigned Jobs',
      description: '현재 진행해야 할 작업 상태를 요약/추적하는 위젯',
    },
    {
      number: 5,
      label: 'Description',
      key: 'recentActivity',
      title: 'Recent Completed Activity',
      description: '최근 완료된 작업 이력을 확인하는 위젯',
    },
    {
      number: 6,
      label: 'Description',
      key: 'libraryFeed',
      title: 'Library Feed',
      description: '라이브러리 관련 최신 항목을 하단 피드로 보여주는 영역',
    },
  ],
};
