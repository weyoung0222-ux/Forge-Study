import type { ListSortOption } from '../../../blocks/molecules/ListSortSelect.block';
import type { ListStatusTab } from '../../../blocks/molecules/ListStatusTabs.block';

export type LibraryAssetTab = 'dataset' | 'model';
export type LibrarySort = 'recent' | 'name';
export type LibrarySource = 'all' | 'register' | 'collector' | 'generator' | 'curator' | 'trainer' | 'evaluator';

export const libraryAssetTabs: ListStatusTab[] = [
  { label: 'Dataset', value: 'dataset' },
  { label: 'Model', value: 'model' },
];

export const librarySortOptions: ListSortOption[] = [
  { value: 'recent', label: 'Sort by : Recently Added' },
  { value: 'name', label: 'Sort by : Name' },
];

export const librarySourceOptions: ListSortOption[] = [
  { value: 'all', label: 'Source : All' },
  { value: 'register', label: 'Source : Register' },
  { value: 'collector', label: 'Source : Collector' },
  { value: 'generator', label: 'Source : Generator' },
  { value: 'curator', label: 'Source : Curator' },
  { value: 'trainer', label: 'Source : Trainer' },
  { value: 'evaluator', label: 'Source : Evaluator' },
];
