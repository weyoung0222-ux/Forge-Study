export type LibraryAssetType = 'dataset' | 'model';

export type LibraryAssetItem = {
  id: string;
  type: LibraryAssetType;
  outputName: string;
  workDescription: string;
  sourceLabel: string;
  sourceType: 'all' | 'register' | 'collector' | 'generator' | 'curator' | 'trainer' | 'evaluator';
  fileSize: string;
  createdLabel: string;
};

export function getLibraryAssetById(id: string): LibraryAssetItem | undefined {
  return libraryAssetRows.find((row) => row.id === id);
}

/** 상세 화면용 확장 필드(프로토타입 더미) */
export type LibraryAssetDetailView = LibraryAssetItem & {
  detailVersion: string;
  detailProject: string;
  detailSummary: string;
};

const detailDefaults: Record<
  string,
  { detailVersion: string; detailProject: string; detailSummary: string }
> = {
  'asset-001': {
    detailVersion: 'v1.2.0',
    detailProject: 'PJT-002 · Warehouse manipulation',
    detailSummary: 'RGB warehouse pick-and-place episodes with synchronized joint states.',
  },
  'asset-002': {
    detailVersion: 'v0.9.1',
    detailProject: 'PJT-002 · Warehouse manipulation',
    detailSummary: 'Teleop driving clips merged from Collector pipeline run #4412.',
  },
  'asset-003': {
    detailVersion: 'v1.0.0',
    detailProject: 'PJT-003 · Simulation lab',
    detailSummary: 'Synthetic grasps augmented for gripper policy training.',
  },
  'asset-004': {
    detailVersion: 'v2.1.0',
    detailProject: 'PJT-002 · Warehouse manipulation',
    detailSummary: 'Merged scenario pack after curation conflict resolution.',
  },
  'asset-005': {
    detailVersion: 'checkpoint-240415',
    detailProject: 'PJT-002 · Warehouse manipulation',
    detailSummary: 'Dexmate Vega policy head; trained on curated warehouse RGB-D.',
  },
  'asset-006': {
    detailVersion: 'report-240410',
    detailProject: 'PJT-004 · Robustness lab',
    detailSummary: 'Evaluator bundle: robustness metrics vs. baseline model.',
  },
};

export function getLibraryAssetDetailView(id: string): LibraryAssetDetailView | undefined {
  const base = getLibraryAssetById(id);
  if (!base) return undefined;
  const extra = detailDefaults[id] ?? {
    detailVersion: 'v1.0.0',
    detailProject: '—',
    detailSummary: 'Prototype detail placeholder.',
  };
  return { ...base, ...extra };
}

export const libraryAssetRows: LibraryAssetItem[] = [
  {
    id: 'asset-001',
    type: 'dataset',
    outputName: 'Output Name',
    workDescription: 'Work Description',
    sourceLabel: 'Register',
    sourceType: 'register',
    fileSize: '1.2GB',
    createdLabel: 'Created 2 days ago',
  },
  {
    id: 'asset-002',
    type: 'dataset',
    outputName: 'Output Name',
    workDescription: 'Work Description',
    sourceLabel: 'Collector',
    sourceType: 'collector',
    fileSize: '1.2GB',
    createdLabel: 'Created 2 days ago',
  },
  {
    id: 'asset-003',
    type: 'dataset',
    outputName: 'Output Name',
    workDescription: 'Work Description',
    sourceLabel: 'Generator',
    sourceType: 'generator',
    fileSize: '1.2GB',
    createdLabel: 'Created 2 days ago',
  },
  {
    id: 'asset-004',
    type: 'dataset',
    outputName: 'Output Name',
    workDescription: 'Work Description',
    sourceLabel: 'Curator',
    sourceType: 'curator',
    fileSize: '1.2GB',
    createdLabel: 'Created 2 days ago',
  },
  {
    id: 'asset-005',
    type: 'model',
    outputName: 'Output Name',
    workDescription: 'Work Description',
    sourceLabel: 'Trainer',
    sourceType: 'trainer',
    fileSize: '860MB',
    createdLabel: 'Created 4 days ago',
  },
  {
    id: 'asset-006',
    type: 'model',
    outputName: 'Output Name',
    workDescription: 'Work Description',
    sourceLabel: 'Evaluator',
    sourceType: 'evaluator',
    fileSize: '920MB',
    createdLabel: 'Created 1 day ago',
  },
];
