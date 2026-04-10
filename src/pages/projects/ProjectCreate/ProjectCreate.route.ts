import type { AppRoute } from '../../../app/routes/routeMap';

export const projectCreateRoute: AppRoute = {
  key: 'projectCreate',
  path: '/projects/new',
  title: 'Create Project',
  description: 'Project creation flow',
  hidden: true,
};
