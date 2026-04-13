export type PatternMeta = {
  id: string;
  version: string;
  description: string;
  blockIds: string[];
};

export const patternRegistry: PatternMeta[] = [
  {
    id: 'table-search-filter',
    version: '1.0.0',
    description: 'Standard list screen pattern with search, filters, and table',
    blockIds: ['rfm.filterBar', 'rfm.dataTable'],
  },
  {
    id: 'list-base',
    version: '1.0.0',
    description: 'Common list pattern with global nav, toolbar, tabs, state, and content area',
    blockIds: [
      'rfm.globalTopNav',
      'rfm.listHeader',
      'rfm.listToolbar',
      'rfm.listStatusTabs',
      'rfm.listState',
      'rfm.overlayDialog',
      'rfm.viewModeToggle',
      'rfm.projectCardGrid',
      'rfm.projectCard',
      'rfm.libraryAssetGrid',
      'rfm.libraryAssetCard',
    ],
  },
  {
    id: 'project-detail-dashboard',
    version: '1.0.0',
    description: 'Project detail dashboard with sidebar, jobs, activity, robot, output, and member sections',
    blockIds: [
      'rfm.globalTopNav',
      'rfm.projectWorkspaceSidebar',
      'rfm.projectMetaInfoStrip',
      'rfm.projectTaskList',
      'rfm.projectInfoListPanel',
      'rfm.projectRobotInfoPanel',
      'rfm.projectOutputSummaryPanel',
      'rfm.screenDescriptionPanel',
      'rfm.projectSelectorCard',
      'rfm.projectSelectorPanel',
    ],
  },
  {
    id: 'project-workspace-data-foundry',
    version: '1.0.0',
    description: 'Workspace pattern for data activities and dataset table operations',
    blockIds: [
      'rfm.globalTopNav',
      'rfm.projectWorkspaceSidebar',
      'rfm.listHeader',
      'rfm.sectionTitle',
      'rfm.listStatusTabs',
      'rfm.projectWorkspaceActivityCards',
      'rfm.listToolbar',
      'rfm.dataTable',
      'rfm.tablePagination',
      'rfm.projectJobsOnProcessDrawer',
      'rfm.workPageShell',
      'rfm.workPageTemplateCanvas',
      'rfm.screenDescriptionPanel',
      'rfm.projectSelectorCard',
      'rfm.projectSelectorPanel',
    ],
  },
];
