import type { AppRoute } from '../../../app/routes/routeMap';

export const homeRoute: AppRoute = {
  key: 'home',
  path: '/home',
  title: 'Home',
  description: 'Dashboard-style landing after login',
  hidden: true,
};
