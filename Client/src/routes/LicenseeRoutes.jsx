import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

// Auth Component
import Auth from 'utils/auth';

// dashboard routing
const LicenseeDashboardDefault = Loadable(lazy(() => import('views/licenseedashboard/dashboard/Default/index')));
const Vendor = Loadable(lazy(() => import('../module/licensee/views/vendors/index')));
const Licensee_myteam = Loadable(lazy(() => import('../module/licensee/views/MyTeam/index')));
const RateCard = Loadable(lazy(() => import('../module/licensee/views/RateCard/Index')));
const VendorMyTeam = Loadable(lazy(() => import('../module/licensee/views/VendorMyTeam/index')));

//const Support = Loadable(lazy(() => import('module/licensee/views/Support/index')));
// const Support = Loadable(lazy(() => import('module/licensee/views/Support/index')));
const Support = Loadable(lazy(() => import('../views/Support/index')));
const CustomerSection = Loadable(lazy(() => import('../module/licensee/views/CustomerSection/index')));
const Internalsupport = Loadable(lazy(() => import('../views/InternalSupport/index')));
//const Internalsupport = Loadable(lazy(() => import('module/licensee/views/internalSupport/index')));
const MainCategory = Loadable(lazy(() => import('../module/licensee/views/MainCategories/index')));
const Category = Loadable(lazy(() => import('../module/licensee/views/Categories/index')));
const SubCategory = Loadable(lazy(() => import('../module/licensee/views/SubCategories/index')));
const Specification = Loadable(lazy(() => import('../module/licensee/views/Specification/index')));
const SpecificationAdd = Loadable(lazy(() => import('module/licensee/views/Specification/specificationAdd')));
const SpecificationEditPage = Loadable(lazy(() => import('module/licensee/views/Specification/specificationEditPage')));
const RateSetupEditPage = Loadable(lazy(() => import('module/licensee/views/RateCardSetup/RateSetupEditPage')));
const RateCardAdd = Loadable(lazy(() => import('module/licensee/views/RateCard/AddRateCard')));
const RateCardSetup = Loadable(lazy(() => import('module/licensee/views/RateCardSetup/index')));
const RateCardSetupAdd = Loadable(lazy(() => import('module/licensee/views/RateCardSetup/AddRateSetup')));

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
      element: <Navigate to="/licensee-dashboard" replace={true} />
    },
    {
      path: '/licensee-dashboard',
      element: <LicenseeDashboardDefault />
    },
    {
      path: 'vendor',
      children: [
        {
          path: '',
          element: <Vendor />
        }
      ]
    },
    {
      path: 'licensee_myteam',
      children: [
        {
          path: '',
          element: <Licensee_myteam />
        }
      ]
    },
    {
      path: 'licensee_Customers',
      children: [
        {
          path: '',
          element: <CustomerSection />
        }
      ]
    },
    {
      path: 'vendor-myteam',
      children: [
        {
          path: '',
          element: <VendorMyTeam />
        }
      ]
    },

    {
      path: 'licensee_support',
      children: [
        {
          path: '',
          element: <Support />
        }
      ]
    },
    {
      path: 'licensee_internalSupport',
      children: [
        {
          path: '',
          element: <Internalsupport />
        }
      ]
    },
    // {
    //   path: 'internalsupport',
    //   children: [
    //     {
    //       path: '',
    //       element: <Internalsupport/>
    //     }
    //   ]
    // },

    {
      path: 'mainCategory',
      children: [
        {
          path: '',
          element: <MainCategory />
        }
      ]
    },
    {
      path: 'category',
      children: [
        {
          path: '',
          element: <Category />
        }
      ]
    },
    {
      path: 'subCategory',
      children: [
        {
          path: '',
          element: <SubCategory />
        }
      ]
    },
    {
      path: 'specification',
      children: [
        {
          path: '',
          element: <Specification />
        }
      ]
    },
    {
      path: 'specificationAddPage',
      children: [
        {
          path: '',
          element: <SpecificationAdd />
        }
      ]
    },
    {
      path: 'rate_card_setup',
      children: [
        {
          path: '',
          element: <RateCardSetup />
        }
      ]
    },
    {
      path: 'rate_card',
      children: [
        {
          path: '',
          element: <RateCard />
        }
      ]
    },
    {
      path: 'rate_card_add',
      children: [
        {
          path: '',
          element: <RateCardAdd />
        }
      ]
    },
    {
      path: 'rate_cardSetup_add',
      children: [
        {
          path: '',
          element: <RateCardSetupAdd />
        }
      ]
    },
    {
      path: 'specificationEditPage',
      children: [
        {
          path: '',
          element: <SpecificationEditPage />
        }
      ]
    },
    {
      path: 'rate_cardSetup_Edit',
      children: [
        {
          path: '',
          element: <RateSetupEditPage />
        }
      ]
    }
  ]
};

export default MainRoutes;
