import type { ScreenDescriptionItem } from '../../../blocks/organisms/ScreenDescriptionPanel.block';

export const projectDetailUxDescription: {
  title: string;
  summary: string;
  items: ScreenDescriptionItem[];
} = {
  title: 'Project Detail 화면 설명',
  summary: '프로젝트 운영에 필요한 작업/활동/리소스 정보를 대시보드 형태로 배치합니다.',
  items: [
    { number: 1, label: 'Description', key: 'sidebar', title: '좌측 내비게이션', description: '프로젝트 단위 메뉴 이동 및 프로필 접근 영역' },
    { number: 2, label: 'Description', key: 'header', title: '프로젝트 헤더', description: '프로젝트 타이틀, 설명, 메타 정보를 요약 노출' },
    { number: 3, label: 'Description', key: 'jobs', title: 'Assigned Jobs', description: '현재 할당된 작업 목록과 실행 액션 영역' },
    { number: 4, label: 'Description', key: 'activity', title: 'Recent Completed Activity', description: '최근 완료 이력 목록 영역' },
    { number: 5, label: 'Description', key: 'robotInfo', title: 'Robot Information', description: '로봇 관련 기본 정보 요약 영역' },
    { number: 6, label: 'Description', key: 'output', title: 'Output Summary', description: 'Dataset/Model 산출물 수치 요약 영역' },
    { number: 7, label: 'Description', key: 'member', title: 'Member', description: '프로젝트 참여자 목록 영역' },
  ],
};
