export type LibraryLayout = {
  pageTitle: string;
  pageDescription: string;
  patternId: string;
  sections: Array<'header' | 'toolbar' | 'tabs' | 'content'>;
};

export const libraryLayout: LibraryLayout = {
  pageTitle: 'Library',
  pageDescription: 'Browse and manage all generated assets in one place.',
  patternId: 'list-base',
  sections: ['header', 'toolbar', 'tabs', 'content'],
};
