export type RobotPickerOption = {
  id: string;
  name: string;
  /** 미리보기 영역 배경 (Tailwind 클래스) */
  previewTone: string;
  rfmModels: string;
  fineTuningModelCount: number;
  relatedDatasetCount: number;
};

export const projectCreateRobotOptions: RobotPickerOption[] = [
  {
    id: 'robotis-ai-worker',
    name: 'Robotis AI Worker',
    previewTone: 'from-slate-200 to-slate-300',
    rfmModels: 'GROOT N1.5',
    fineTuningModelCount: 6,
    relatedDatasetCount: 890,
  },
  {
    id: 'unitree-g1',
    name: 'Unitree G1',
    previewTone: 'from-zinc-200 to-zinc-400',
    rfmModels: 'GROOT N1.5',
    fineTuningModelCount: 12,
    relatedDatasetCount: 2100,
  },
  {
    id: 'agibot-a2',
    name: 'AGIBOT A2',
    previewTone: 'from-neutral-200 to-neutral-400',
    rfmModels: 'GROOT N1.5',
    fineTuningModelCount: 8,
    relatedDatasetCount: 1248,
  },
  {
    id: 'unitree-go2',
    name: 'Unitree Go2',
    previewTone: 'from-stone-200 to-stone-400',
    rfmModels: 'GROOT N1.5',
    fineTuningModelCount: 4,
    relatedDatasetCount: 512,
  },
];

export function getRobotOptionById(id: string): RobotPickerOption | undefined {
  return projectCreateRobotOptions.find((r) => r.id === id);
}
