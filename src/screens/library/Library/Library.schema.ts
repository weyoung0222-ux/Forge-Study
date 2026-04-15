import type { TranslateFn } from '../../../context/LanguageContext';
import type { ListSortOption } from '../../../blocks/molecules/ListSortSelect.block';
import type { ListStatusTab } from '../../../blocks/molecules/ListStatusTabs.block';

export type LibraryAssetTab = 'dataset' | 'model';
export type LibrarySort = 'recent' | 'name';
export type LibrarySource = 'all' | 'register' | 'collector' | 'generator' | 'curator' | 'trainer' | 'evaluator';

export function getLibraryAssetTabs(t: TranslateFn): ListStatusTab[] {
  return [
    { label: t('library.tab.dataset'), value: 'dataset' },
    { label: t('library.tab.model'), value: 'model' },
  ];
}

export function getLibrarySortOptions(t: TranslateFn): ListSortOption[] {
  return [
    { value: 'recent', label: t('library.sort.recent') },
    { value: 'name', label: t('library.sort.name') },
  ];
}

export function getLibrarySourceOptions(t: TranslateFn): ListSortOption[] {
  return [
    { value: 'all', label: t('library.source.all') },
    { value: 'register', label: t('library.source.register') },
    { value: 'collector', label: t('library.source.collector') },
    { value: 'generator', label: t('library.source.generator') },
    { value: 'curator', label: t('library.source.curator') },
    { value: 'trainer', label: t('library.source.trainer') },
    { value: 'evaluator', label: t('library.source.evaluator') },
  ];
}
