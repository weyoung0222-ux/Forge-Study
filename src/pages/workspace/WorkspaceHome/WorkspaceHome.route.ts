import type { AppRoute } from '../../../app/routes/routeMap';

export const workspaceHomeRoute: AppRoute = {
  key: 'workspaceHome',
  path: '/workspace',
  title: 'Workspace Home',
  description: 'Post-login workspace navigation',
  hidden: true,
};
