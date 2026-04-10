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
