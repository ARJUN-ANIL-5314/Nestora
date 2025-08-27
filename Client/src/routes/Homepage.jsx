import React from 'react';
import { lazy } from 'react';
import Loadable from '../ui-component/Loadable';

const HomePage = Loadable(lazy(() => import('../components/Homepage')));

const HomeRoute = {
  path: '/',
  element: <HomePage />
};

export default HomeRoute;
