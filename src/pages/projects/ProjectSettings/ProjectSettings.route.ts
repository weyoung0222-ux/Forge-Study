import type { AppRoute } from '../../../app/routes/routeMap';

export const projectSettingsRoute: AppRoute = {
  key: 'projectSettings',
  path: '/projects/:projectId/workspace/settings',
  title: 'Project Workspace Settings',
  description: 'Project workspace settings view',
  hidden: true,
};
