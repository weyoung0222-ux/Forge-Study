import type { AppRoute } from '../../../app/routes/routeMap';

export const projectDetailRoute: AppRoute = {
  key: 'projectDetail',
  path: '/projects/:projectId',
  title: 'Project Detail',
  description: 'Project detail view',
  hidden: true,
};
