import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import Auth from 'utils/auth';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/dashboard/Default/index')));
const Profile = Loadable(lazy(() => import('Profile/views/userProf/index')));
const OrgProfile = Loadable(lazy(() => import('Profile/views/orgProf/OrgProf')));

const ProfileRouter = {
  path: '/',
  element: (
    <Auth>
      <MainLayout />
    </Auth>
  ),
  children: [
    { path: '', element: <Navigate to="/dashboard" replace /> },
    { path: 'dashboard', element: <DashboardDefault /> },
    { path: 'profile', element: <Profile /> },
    { path: 'orgprofile', element: <OrgProfile /> }
  ]
};

export default ProfileRouter;
