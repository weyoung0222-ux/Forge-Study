import { catalogRoute } from '../../pages/catalog/Catalog/Catalog.route';
import { loginRoute } from '../../pages/auth/Login/Login.route';
import { flowRoute } from '../../pages/flow/Flow/Flow.route';
import { homeRoute } from '../../pages/home/Home/Home.route';
import { libraryRoute } from '../../pages/library/Library/Library.route';
import { projectCreateRoute } from '../../pages/projects/ProjectCreate/ProjectCreate.route';
import { projectDetailRoute } from '../../pages/projects/ProjectDetail/ProjectDetail.route';
import { projectListRoute } from '../../pages/projects/ProjectList/ProjectList.route';
import { projectSettingsRoute } from '../../pages/projects/ProjectSettings/ProjectSettings.route';
import { projectWorkPageRoute, projectWorkspaceRoute } from '../../pages/projects/ProjectWorkspace/ProjectWorkspace.route';
import { workspaceHomeRoute } from '../../pages/workspace/WorkspaceHome/WorkspaceHome.route';

export type AppRoute = {
  key: string;
  path: string;
  title: string;
  description?: string;
  hidden?: boolean;
};

export const appRoutes: AppRoute[] = [
  loginRoute,
  flowRoute,
  homeRoute,
  workspaceHomeRoute,
  {
    key: 'customersList',
    path: '/customers/list',
    title: 'Customer List',
    description: 'Customer search and list view',
  },
  catalogRoute,
  projectListRoute,
  libraryRoute,
  projectCreateRoute,
  {
    key: 'projectCreateDetails',
    path: '/projects/new/details',
    title: 'Create Project — Details',
    description: 'Project creation — details step (placeholder)',
    hidden: true,
  },
  projectDetailRoute,
  projectWorkspaceRoute,
  projectWorkPageRoute,
  projectSettingsRoute,
];
