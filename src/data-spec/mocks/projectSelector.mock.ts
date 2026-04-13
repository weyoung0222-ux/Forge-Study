export type ProjectSelectorMockRole = 'project owner' | 'data engineer' | 'model engineer';

export type ProjectSelectorMockItem = {
  id: string;
  name: string;
  applicableModel: string;
  fineTuningModels: string;
  relatedDatasets: string;
  imageLabel?: string;
  nickname: string;
  roles: ProjectSelectorMockRole[];
};

export const projectSelectorRows: ProjectSelectorMockItem[] = [
  {
    id: 'PJT-001',
    name: 'Foundation Robot Upgrade',
    applicableModel: 'GROOT N1.5',
    fineTuningModels: '8 Models',
    relatedDatasets: '1,248 Datasets',
    imageLabel: 'robot',
    nickname: 'Alex',
    roles: ['project owner'],
  },
  {
    id: 'PJT-002',
    name: 'Welding Vision Model',
    applicableModel: 'GROOT N1.5',
    fineTuningModels: '8 Models',
    relatedDatasets: '1,248 Datasets',
    imageLabel: 'human',
    nickname: 'Mina',
    roles: ['data engineer'],
  },
  {
    id: 'PJT-003',
    name: 'Factory Data Pipeline',
    applicableModel: 'GROOT N1.5',
    fineTuningModels: '8 Models',
    relatedDatasets: '1,248 Datasets',
    imageLabel: 'robot',
    nickname: 'Jay',
    roles: ['model engineer'],
  },
  {
    id: 'PJT-004',
    name: 'Preventive Maintenance AI',
    applicableModel: 'GROOT N1.5',
    fineTuningModels: '8 Models',
    relatedDatasets: '1,248 Datasets',
    imageLabel: 'robot',
    nickname: 'Rina',
    roles: ['project owner', 'data engineer'],
  },
  {
    id: 'PJT-005',
    name: 'Manipulator Calibration',
    applicableModel: 'GROOT N1.5',
    fineTuningModels: '8 Models',
    relatedDatasets: '1,248 Datasets',
    imageLabel: 'robot',
    nickname: 'Leo',
    roles: ['data engineer', 'model engineer'],
  },
  {
    id: 'PJT-006',
    name: 'Realtime Alert Dashboard',
    applicableModel: 'GROOT N1.5',
    fineTuningModels: '8 Models',
    relatedDatasets: '1,248 Datasets',
    imageLabel: 'robot',
    nickname: 'Chris',
    roles: ['project owner', 'data engineer', 'model engineer'],
  },
];
