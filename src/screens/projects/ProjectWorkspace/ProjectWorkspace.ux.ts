import type { ScreenDescriptionItem } from '../../../blocks/organisms/ScreenDescriptionPanel.block';

export const projectWorkspaceUxDescription: { title: string; summary: string; items: ScreenDescriptionItem[] } = {
  title: 'Project Workspace UX',
  summary: 'Workspace 화면은 Activity 진입과 데이터셋 운영을 한 화면에서 수행하도록 구성됩니다.',
  items: [
    {
      number: 1,
      label: 'Description',
      key: 'workspaceHeader',
      title: 'Workspace Header',
      description: '현재 프로젝트 컨텍스트와 화면 목적을 보여주는 제목 영역',
      bullets: ['타이틀/요약 설명 노출', '프로젝트별 동일 위치 유지'],
    },
    {
      number: 2,
      label: 'Description',
      key: 'workspaceTab',
      title: 'Domain Tabs',
      description: 'Data Foundry / Model Institute 도메인 전환',
      bullets: ['탭 변경 시 Activity 카드셋 동기화', '기본값은 Data Foundry'],
    },
    {
      number: 3,
      label: 'Description',
      key: 'workspaceActivities',
      title: 'Activity Entry Cards',
      description: '각 work의 진입 버튼 역할을 하는 클릭형 카드',
      bullets: [
        'Data Foundry: Register / Collect / Generate / Curate',
        'Collect: 1단계 스텝 라벨 Teleoperation — 파라미터·텔레옵 패널(에피소드·녹화·카메라)은 CollectTeleoperationStepBlock',
        'Model Institute: Trainer / Evaluator',
        '클릭 시 후속 워크플로우 진입 트리거',
      ],
    },
    {
      number: 4,
      label: 'Description',
      key: 'workspaceToolbar',
      title: 'Saved list toolbar',
      description: '검색·Source 필터·정렬·뷰 토글로 하단 저장 목록을 조작',
      bullets: [
        'Data Foundry 탭: Source 필터는 register·collector·generator·curator',
        'Model Institute 탭: Source 필터는 trainer·evaluator',
        '도메인 탭 전환 시 필터는 All로 초기화',
      ],
    },
    {
      number: 5,
      label: 'Description',
      key: 'workspaceTable',
      title: 'Saved Datasets / Saved Models',
      description: '도메인 탭에 따라 다른 산출물 테이블 — Data Foundry는 데이터셋, Model Institute는 모델',
      bullets: [
        'Data Foundry: Saved Datasets — DF activity 산출 행만; Source 우측에 data 종류 컬럼(예: Dataset, Video, Episode, Trajectory 등)',
        'Model Institute: Saved Models — Trainer/Evaluator 산출 행만',
        'Publish 액션·페이지네이션·확인 모달 동일 패턴',
      ],
    },
    {
      number: 6,
      label: 'Description',
      key: 'workspaceJobsDrawer',
      title: 'Jobs on process Drawer',
      description: '타이틀 우측 버튼으로 열리는 작업 진행 목록 우측 드로워',
      bullets: ['Search + Source filter 제공', '작업 카드(작업명/설명/Source/작업자/진행률) 리스트 제공'],
    },
  ],
};
