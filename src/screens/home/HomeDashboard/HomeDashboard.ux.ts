import type { TranslateFn } from '../../../context/LanguageContext';
import type { ScreenDescriptionItem } from '../../../blocks/organisms/ScreenDescriptionPanel.block';

export function buildHomeDashboardUxDescription(t: TranslateFn): {
  title: string;
  summary: string;
  items: ScreenDescriptionItem[];
} {
  return {
    title: t('home.ux.title'),
    summary: t('home.ux.summary'),
    items: [
      {
        number: 1,
        label: t('home.ux.label'),
        key: 'overviewCards',
        title: t('home.ux.item1.title'),
        description: t('home.ux.item1.desc'),
      },
      {
        number: 2,
        label: t('home.ux.label'),
        key: 'bookmarkedProjects',
        title: t('home.ux.item2.title'),
        description: t('home.ux.item2.desc'),
      },
      {
        number: 3,
        label: t('home.ux.label'),
        key: 'myLibrary',
        title: t('home.ux.item3.title'),
        description: t('home.ux.item3.desc'),
      },
      {
        number: 4,
        label: t('home.ux.label'),
        key: 'assignedJobs',
        title: t('home.ux.item4.title'),
        description: t('home.ux.item4.desc'),
      },
      {
        number: 5,
        label: t('home.ux.label'),
        key: 'recentActivity',
        title: t('home.ux.item5.title'),
        description: t('home.ux.item5.desc'),
      },
      {
        number: 6,
        label: t('home.ux.label'),
        key: 'libraryFeed',
        title: t('home.ux.item6.title'),
        description: t('home.ux.item6.desc'),
      },
    ],
  };
}
