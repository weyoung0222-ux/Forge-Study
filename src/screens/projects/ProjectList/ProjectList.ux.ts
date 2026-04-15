import type { TranslateFn } from '../../../context/LanguageContext';
import type { ScreenDescriptionItem } from '../../../blocks/organisms/ScreenDescriptionPanel.block';

export function buildProjectListUxDescription(t: TranslateFn): {
  title: string;
  summary: string;
  items: ScreenDescriptionItem[];
} {
  return {
    title: t('projectList.ux.title'),
    summary: t('projectList.ux.summary'),
    items: [
      {
        number: 1,
        label: t('common.description'),
        key: 'listHeader',
        title: t('projectList.ux.item1.title'),
        description: t('projectList.ux.item1.desc'),
      },
      {
        number: 2,
        label: t('common.description'),
        key: 'listToolbar',
        title: t('projectList.ux.item2.title'),
        description: t('projectList.ux.item2.desc'),
      },
      {
        number: 3,
        label: t('common.description'),
        key: 'listStatusTabs',
        title: t('projectList.ux.item3.title'),
        description: t('projectList.ux.item3.desc'),
      },
      {
        number: 4,
        label: t('common.description'),
        key: 'listContent',
        title: t('projectList.ux.item4.title'),
        description: t('projectList.ux.item4.desc'),
      },
    ],
  };
}
