/** Workspace activity keys — same as ProjectWorkspace WorkspaceActivityKey */
export type ActivityDraftActivityKey =
  | 'register'
  | 'collector'
  | 'generator'
  | 'curator'
  | 'trainer'
  | 'evaluator';

/**
 * 임시저장 세션 (저장 완료 전). 카드 선택 시 워크플로로 복원된다.
 */
export type ActivityDraftSession = {
  id: string;
  activity: ActivityDraftActivityKey;
  /**
   * Generate sub-flow (URL `generateMode`). Required to restore the same shell as Synthetic Video Creation vs default Data Generate.
   */
  generateMode?: string;
  /** Curate sub-flow (URL `curateMode`). */
  curateMode?: string;
  title: string;
  savedAtLabel: string;
  step: 1 | 2 | 3;
  maxUnlockedStep: 1 | 2 | 3;
  /** 스텝 1에서 입력했던 값 요약 (RFM/로봇 학습 플로우용 더미) */
  step1Parameters: Array<{ label: string; value: string }>;
  /** Pre-processor 단계 상단·요약에 쓰는 데이터셋 표시 이름 */
  preprocessorContextDatasetTitle: string;
  saveDatasetName: string;
  saveDatasetDescription: string;
};

const activityLabel = (a: ActivityDraftActivityKey): string =>
  ({ register: 'Register', collector: 'Collect', generator: 'Generate', curator: 'Curate', trainer: 'Trainer', evaluator: 'Evaluate' }[a]);

export const activityDraftSessionsMock: ActivityDraftSession[] = [
  {
    id: 'draft-reg-01',
    activity: 'register',
    title: 'Warehouse teleop — session Apr 12 (draft)',
    savedAtLabel: '2시간 전',
    step: 1,
    maxUnlockedStep: 2,
    step1Parameters: [
      { label: 'Robot preset', value: 'AGIBOT A2 · warehouse_nav_v3' },
      { label: 'Task tag', value: 'pick_clear_tote' },
      { label: 'Episode target', value: '120 clips' },
    ],
    preprocessorContextDatasetTitle: 'WH-Teleop-Register-batch-A',
    saveDatasetName: '',
    saveDatasetDescription: '',
  },
  {
    id: 'draft-gen-02',
    activity: 'generator',
    generateMode: 'synthetic-video',
    title: 'Synthetic grasp aug — GPU job paused',
    savedAtLabel: '어제',
    step: 2,
    maxUnlockedStep: 3,
    step1Parameters: [
      { label: 'Augmentation policy', value: 'DR-clutter-heavy' },
      { label: 'Physics seed', value: '0x9f2c1a' },
      { label: 'Output resolution', value: '640×480 @30' },
    ],
    preprocessorContextDatasetTitle: 'Synth-Grasp-DR-7k-preview',
    saveDatasetName: 'RFM-SynthGrasp-Augmented-7k-20260414',
    saveDatasetDescription: 'Synthetic grasp episodes; domain-randomized clutter (draft).',
  },
  {
    id: 'draft-gen-mimic-01',
    activity: 'generator',
    generateMode: 'mimic-augmentation',
    title: 'Mimic policy warm-start — draft',
    savedAtLabel: '4시간 전',
    step: 1,
    maxUnlockedStep: 2,
    step1Parameters: [
      { label: 'Demo buffer', value: '48 trajectories' },
      { label: 'BC lr', value: '3e-4' },
    ],
    preprocessorContextDatasetTitle: 'Mimic-Demo-48tr',
    saveDatasetName: '',
    saveDatasetDescription: '',
  },
  {
    id: 'draft-gen-idm-01',
    activity: 'generator',
    generateMode: 'idm',
    title: 'IDM labels — partial run',
    savedAtLabel: '2026-04-11',
    step: 1,
    maxUnlockedStep: 1,
    step1Parameters: [
      { label: 'IDM model', value: 'IDM · AGIBOT warehouse v1 (RFM)' },
      { label: 'Video source', value: 'Dataset clip (Saved Datasets)' },
    ],
    preprocessorContextDatasetTitle: 'IDM-Scratch-A',
    saveDatasetName: '',
    saveDatasetDescription: '',
  },
  {
    id: 'draft-col-03',
    activity: 'collector',
    title: 'Narrow aisle live collect — operator break',
    savedAtLabel: '3일 전',
    step: 3,
    maxUnlockedStep: 3,
    step1Parameters: [
      { label: 'Scene mesh', value: 'warehouse_lane_B_v12.obj' },
      { label: 'Teleop device', value: '3D mouse + foot pedal' },
    ],
    preprocessorContextDatasetTitle: 'LiveCollect-PickRoute-v3',
    saveDatasetName: 'RFM-LiveCollect-PickRoute-v3-DRAFT',
    saveDatasetDescription:
      'Operator-collected trajectories; base odometry + wrist RGB-D. Pending final manifest before library save.',
  },
  {
    id: 'draft-cur-04',
    activity: 'curator',
    curateMode: 'merge-datasets',
    title: 'Merge runs A+B — label conflicts unresolved',
    savedAtLabel: '2026-04-10 18:40',
    step: 1,
    maxUnlockedStep: 1,
    step1Parameters: [
      { label: 'Merge rule set', value: 'curator_rules_v1.8' },
      { label: 'Source runs', value: 'Run #108 + Run #109' },
    ],
    preprocessorContextDatasetTitle: '{Created Data Set Name}',
    saveDatasetName: '',
    saveDatasetDescription: '',
  },
  {
    id: 'draft-trn-05',
    activity: 'trainer',
    title: 'LoRA adapter pack — export not finished',
    savedAtLabel: '지난 주',
    step: 3,
    maxUnlockedStep: 3,
    step1Parameters: [
      { label: 'Base checkpoint', value: 'GROOT-N1.5-base' },
      { label: 'Train/val split', value: 'scene_hash stratified' },
    ],
    preprocessorContextDatasetTitle: 'Train-Pack-960eps',
    saveDatasetName: 'RFM-Train-Export-LoRA-Adapter-Pack-DRAFT',
    saveDatasetDescription: 'Normalization stats JSON sidecar; adapter manifest stub.',
  },
];

export function formatDraftSubtitle(draft: ActivityDraftSession): string {
  return `${activityLabel(draft.activity)} · Step ${draft.step} of 3 · ${draft.savedAtLabel}`;
}

/** 현재 워크 세션 스냅샷으로 draft 카드 한 건 생성 (Load draft 드로어에 prepend) */
export function createActivityDraftSnapshot(params: {
  activity: ActivityDraftActivityKey;
  generateMode?: string;
  curateMode?: string;
  title: string;
  savedAtLabel: string;
  step: 1 | 2 | 3;
  maxUnlockedStep: 1 | 2 | 3;
  step1Parameters: ActivityDraftSession['step1Parameters'];
  preprocessorContextDatasetTitle: string;
  saveDatasetName: string;
  saveDatasetDescription: string;
}): ActivityDraftSession {
  return {
    id: `draft-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    ...params,
  };
}
