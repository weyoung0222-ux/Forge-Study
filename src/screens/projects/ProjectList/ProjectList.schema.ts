import type { ListStatusTab } from '../../../blocks/molecules/ListStatusTabs.block';
import type { ListSortOption } from '../../../blocks/molecules/ListSortSelect.block';

export type ProjectRoleFilter = 'all' | 'Project Owner' | 'Data Developer' | 'Model Developer';
export type ProjectSort = 'recent' | 'title';

export const projectStatusTabs: ListStatusTab[] = [
  { label: 'All', value: 'all' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
];

export const projectSortOptions: ListSortOption[] = [
  { value: 'recent', label: 'Sort by: Recently Added' },
  { value: 'title', label: 'Sort by: Title' },
];

