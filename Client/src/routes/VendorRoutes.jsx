import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

// Auth Component
import Auth from 'utils/auth';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/dashboard/Default/index')));
const Customers = Loadable(lazy(() => import('module/vendor/views/Customers/index')));
const Orders = Loadable(lazy(() => import('module/vendor/views/Orders/index')));
const OrderAddPage = Loadable(lazy(() => import('module/vendor/views/Orders/addOrder/orderAddPage')));
const PaymentAddPage = Loadable(lazy(() => import('module/vendor/views/Payments/addPayment/addPayment')));

const MyTeam = Loadable(lazy(() => import('module/vendor/views/MyTeam/index')));
const Support = Loadable(lazy(() => import('../views/Support/index')));
const Internalsupport = Loadable(lazy(() => import('../views/InternalSupport/index')));

const Invoice = Loadable(lazy(() => import('module/vendor/views/Invoice/index')));
const Payments = Loadable(lazy(() => import('module/vendor/views/Payments/index')));
// ==============================|| MAIN ROUTING ||============================== //

const VendorRoutes = {
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
      element: <Navigate to="/dashboard" replace={true} />
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },

    {
      path: 'customers',
      children: [
        {
          path: '',
          element: <Customers />
        }
      ]
    },
    {
      path: 'orders',
      children: [
        {
          path: '',
          element: <Orders />
        }
      ]
    },
    {
      path: 'orderAddPage',
      children: [
        {
          path: '',
          element: <OrderAddPage />
        }
      ]
    },
    {
      path: 'myTeam',
      children: [
        {
          path: '',
          element: <MyTeam />
        }
      ]
    },

    {
      path: 'vendor_support',
      children: [
        {
          path: '',
          element: <Support />
        }
      ]
    },
    {
      path: 'vendor_internalSupport',
      children: [
        {
          path: '',
          element: <Internalsupport />
        }
      ]
    },
    {
      path: 'Invoice',
      children: [
        {
          path: '',
          element: <Invoice />
        }
      ]
    },
    {
      path: 'Payments',
      children: [
        {
          path: '',
          element: <Payments />
        }
      ]
    },
    {
      path: 'PaymentAddPage',
      children: [
        {
          path: '',
          element: <PaymentAddPage />
        }
      ]
    }
  ]
};

export default VendorRoutes;
