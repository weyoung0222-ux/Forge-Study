import type { AppRoute } from '../../../app/routes/routeMap';

export const projectWorkspaceRoute: AppRoute = {
  key: 'projectWorkspace',
  path: '/projects/:projectId/workspace',
  title: 'Project Workspace',
  description: 'Project workspace view',
  hidden: true,
};
