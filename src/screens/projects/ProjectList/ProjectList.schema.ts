import type { TranslateFn } from '../../../context/LanguageContext';
import type { ListStatusTab } from '../../../blocks/molecules/ListStatusTabs.block';
import type { ListSortOption } from '../../../blocks/molecules/ListSortSelect.block';

export type ProjectRoleFilter = 'all' | 'Project Owner' | 'Data Developer' | 'Model Developer';
export type ProjectSort = 'recent' | 'title';

export function getProjectStatusTabs(t: TranslateFn): ListStatusTab[] {
  return [
    { label: t('projectList.tab.all'), value: 'all' },
    { label: t('projectList.tab.inProgress'), value: 'in-progress' },
    { label: t('projectList.tab.completed'), value: 'completed' },
  ];
}

export function getProjectSortOptions(t: TranslateFn): ListSortOption[] {
  return [
    { value: 'recent', label: t('projectList.sort.recent') },
    { value: 'title', label: t('projectList.sort.title') },
  ];
}

