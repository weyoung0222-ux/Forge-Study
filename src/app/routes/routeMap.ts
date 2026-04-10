import { catalogRoute } from '../../pages/catalog/Catalog/Catalog.route';
import { loginRoute } from '../../pages/auth/Login/Login.route';
import { homeRoute } from '../../pages/home/Home/Home.route';
import { libraryRoute } from '../../pages/library/Library/Library.route';
import { projectCreateRoute } from '../../pages/projects/ProjectCreate/ProjectCreate.route';
import { projectDetailRoute } from '../../pages/projects/ProjectDetail/ProjectDetail.route';
import { projectListRoute } from '../../pages/projects/ProjectList/ProjectList.route';
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
  projectDetailRoute,
];
