import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

// Auth Component
import Auth from 'utils/auth';

// dashboard routing
const AdminDashboardDefault = Loadable(lazy(() => import('views/admindashboard/dashboard/Default/index')));
const LicenseAdd = Loadable(lazy(() => import('module/admin/views/licenseeAdd/index')));
const MyTeams = Loadable(lazy(() => import('module/admin/views/Myteam/index')));
const Admin_AllTeam = Loadable(lazy(() => import('module/admin/views/All Team/index')));

// const Support = Loadable(lazy(() => import('module/admin/views/Support/index')));

const Support = Loadable(lazy(() => import('../views/Support/index')));

const InternalSupport = Loadable(lazy(() => import('../views/InternalSupport/index')));

const Country = Loadable(lazy(() => import('module/admin/views/country/index')));
const State = Loadable(lazy(() => import('module/admin/views/state/index')));
const Bank = Loadable(lazy(() => import('module/admin/views/Bank/index')));
// const SupportType = Loadable(lazy(() => import('module/admin/views/supportType/index')));
const Enqsource = Loadable(lazy(() => import('module/admin/views/engSource/index')));
const EnqMode = Loadable(lazy(() => import('module/admin/views/enqModel/index')));
const District = Loadable(lazy(() => import('module/admin/views/district/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <>
      <Auth>
        <MainLayout />
      </Auth>
    </>
  ),
  children: [
    {
      path: '',
      element: <Navigate to="/admin-dashboard" replace={true} />
    },
    {
      path: '/admin-dashboard',
      element: <AdminDashboardDefault />
    },

    {
      path: '/licensee',
      element: <LicenseAdd />
    },
    {
      path: '/admin_myTeam',
      element: <MyTeams />
    },
    {
      path: '/admin_AllTeam',
      element: <Admin_AllTeam />
    },

    {
      path: '/admin_support',
      element: <Support />
    },
    {
      path: '/admin_internalSupport',
      element: <InternalSupport />
    },
    {
      path: 'country',
      children: [
        {
          path: '',
          element: <Country />
        }
      ]
    },
    {
      path: 'bank',
      children: [
        {
          path: '',
          element: <Bank />
        }
      ]
    },
    // {
    //   path: 'supportType',
    //   children: [
    //     {
    //       path: '',
    //       element: <SupportType />
    //     }
    //   ]
    // },
    {
      path: 'state',
      children: [
        {
          path: '',
          element: <State />
        }
      ]
    },
    {
      path: 'district',
      children: [
        {
          path: '',
          element: <District /> // Add the District route
        }
      ]
    },
    {
      path: 'enqSource',
      children: [
        {
          path: '',
          element: <Enqsource />
        }
      ]
    },
    {
      path: 'enqMode',
      children: [
        {
          path: '',
          element: <EnqMode />
        }
      ]
    }
  ]
};

export default MainRoutes;
