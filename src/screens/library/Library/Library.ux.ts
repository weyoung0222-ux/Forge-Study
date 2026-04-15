import type { TranslateFn } from '../../../context/LanguageContext';
import type { ScreenDescriptionItem } from '../../../blocks/organisms/ScreenDescriptionPanel.block';

export type LibraryUxDescription = {
  title: string;
  summary: string;
  items: ScreenDescriptionItem[];
};

export function buildLibraryUxDescription(t: TranslateFn): LibraryUxDescription {
  return {
    title: t('library.ux.title'),
    summary: t('library.ux.summary'),
    items: [
      {
        number: 1,
        label: t('common.description'),
        key: 'librarySourceFilter',
        title: t('library.ux.item1.title'),
        description: t('library.ux.item1.desc'),
        bullets: [t('library.ux.b1'), t('library.ux.b1b')],
      },
      {
        number: 2,
        label: t('common.description'),
        key: 'viewModeToggle',
        title: t('library.ux.item2.title'),
        description: t('library.ux.item2.desc'),
        bullets: [t('library.ux.b2'), t('library.ux.b2b')],
      },
      {
        number: 3,
        label: t('common.description'),
        key: 'listStatusTabs',
        title: t('library.ux.item3.title'),
        description: t('library.ux.item3.desc'),
        bullets: [t('library.ux.b3'), t('library.ux.b3b')],
      },
      {
        number: 4,
        label: t('common.description'),
        key: 'libraryAssetCard',
        title: t('library.ux.item4.title'),
        description: t('library.ux.item4.desc'),
      },
      {
        number: 5,
        label: t('common.description'),
        key: 'libraryAssetCardTitle',
        title: t('library.ux.item5.title'),
        description: t('library.ux.item5.desc'),
        bullets: [t('library.ux.b5'), t('library.ux.b5b')],
      },
      {
        number: 6,
        label: t('common.description'),
        key: 'libraryAssetCardSource',
        title: t('library.ux.item6.title'),
        description: t('library.ux.item6.desc'),
        bullets: [t('library.ux.b6'), t('library.ux.b6b')],
      },
      {
        number: 7,
        label: t('common.description'),
        key: 'libraryAssetCardMeta',
        title: t('library.ux.item7.title'),
        description: t('library.ux.item7.desc'),
        bullets: [t('library.ux.b7'), t('library.ux.b7b')],
      },
      {
        number: 8,
        label: t('common.description'),
        key: 'libraryAssetGrid',
        title: t('library.ux.item8.title'),
        description: t('library.ux.item8.desc'),
        bullets: [t('library.ux.b8'), t('library.ux.b8b')],
      },
    ],
  };
}
