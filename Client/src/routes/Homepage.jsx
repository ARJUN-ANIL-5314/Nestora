import React from 'react';
import { lazy } from 'react';
import Loadable from '../ui-component/Loadable';

const HomePage = Loadable(lazy(() => import('../components/Homepage')));

const HomeRoute = {
  path: '/',
  element: <HomePage />
};

export default HomeRoute;
// import React from 'react';

// const Homepage = () => {
//   return <h1>Hello from Homepage!</h1>;
// };

// export default Homepage;

