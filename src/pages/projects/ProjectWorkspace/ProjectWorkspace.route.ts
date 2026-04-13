import type { AppRoute } from '../../../app/routes/routeMap';

export const projectWorkspaceRoute: AppRoute = {
  key: 'projectWorkspace',
  path: '/projects/:projectId/workspace',
  title: 'Project Workspace',
  description: 'Project workspace view',
  hidden: true,
};

export const projectWorkPageRoute: AppRoute = {
  key: 'projectWorkPage',
  path: '/projects/:projectId/workspace/:workKey',
  title: 'Project Work Page',
  description: 'Project work page view',
  hidden: true,
};
