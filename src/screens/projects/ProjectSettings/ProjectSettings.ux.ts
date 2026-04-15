import type { ScreenDescriptionItem } from '../../../blocks/organisms/ScreenDescriptionPanel.block';

export const projectSettingsUxDescription: { title: string; summary: string; items: ScreenDescriptionItem[] } = {
  title: 'Project Settings UX',
  summary: 'Project Settings 화면은 탭 기반으로 설정 정보와 운영 데이터를 관리합니다.',
  items: [
    {
      number: 1,
      label: 'Description',
      key: 'settingsHeader',
      title: 'Settings Header',
      description: '설정 화면의 목적과 현재 프로젝트 컨텍스트를 안내하는 헤더 영역',
      bullets: ['프로젝트별 동일 위치 유지', '탭 영역과 시각적으로 분리'],
    },
    {
      number: 2,
      label: 'Description',
      key: 'settingsTabs',
      title: 'Settings Tabs',
      description: 'General / Members / Jobs / Resource 설정 섹션을 전환하는 탭',
      bullets: ['탭 전환 시 콘텐츠 영역만 교체', '고정 순서로 탐색 예측성 유지'],
    },
    {
      number: 3,
      label: 'Description',
      key: 'settingsContent',
      title: 'Tab Content Area',
      description: '탭별 더미 정보가 렌더링되는 메인 콘텐츠 영역',
      bullets: [
        '기존 block 조합으로 구성',
        'Members/Resource는 테이블 중심 조회 구조',
        'Members: Invite members로 이메일 검색·역할 지정 후 초대(프로토타입)',
      ],
    },
    {
      number: 4,
      label: 'Description',
      key: 'sidebar',
      title: 'Project Sidebar',
      description: '프로젝트 컨텍스트 전환과 Dashboard/Workspace/Settings 이동을 담당하는 LNB',
      bullets: ['프로젝트 선택 모달과 연동', '현재 화면(Settings) active 상태 유지'],
    },
  ],
};
