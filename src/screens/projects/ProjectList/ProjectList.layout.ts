export type ProjectListLayout = {
  pageTitle: string;
  pageDescription: string;
  patternId: string;
  sections: Array<'header' | 'filter' | 'tabs' | 'cards'>;
};

export const projectListLayout: ProjectListLayout = {
  pageTitle: 'Project List',
  pageDescription: 'Manage and monitor your robot foundation projects.',
  patternId: 'list-base',
  sections: ['header', 'filter', 'tabs', 'cards'],
};
