import {
  IconBuildingBank,
  IconDashboard,
  IconSteam,
  IconSettings,
  IconWorld,
  IconHelp,
  IconUserPlus,
  IconCategory,
  IconAspectRatio,
  IconReceipt2
} from '@tabler/icons';

// constant
const icons = {
  IconDashboard,
  IconSteam,
  IconSettings,
  IconBuildingBank,
  IconWorld,
  IconHelp,
  IconCategory,
  IconUserPlus,
  IconAspectRatio,
  IconReceipt2
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const licenseeShared = {
  id: 'licensee-dashboard',
  type: 'group',
  children: [
    {
      id: 'licensee-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/licensee-dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'vendor',
      title: 'Vendor',
      type: 'item',
      url: '/vendor',
      icon: icons.IconUserPlus,
      breadcrumbs: false
    },
    {
      id: 'licensee_myteam',
      title: 'My Team',
      type: 'item',
      url: '/licensee_myteam',
      icon: icons.IconSteam,
      breadcrumbs: false
    },

    {
      id: 'licensee_Customers',
      title: 'Customers',
      type: 'item',
      url: '/licensee_Customers',
      icon: icons.IconSteam,
      breadcrumbs: false
    },
    {
      id: 'vendor-myteam',
      title: 'Vendor Team',
      type: 'item',
      url: '/vendor-myteam',
      icon: icons.IconUserPlus,
      breadcrumbs: false
    },

    {
      id: 'licensee_support',
      title: 'Support',
      type: 'item',
      url: '/licensee_support',
      icon: icons.IconHelp,
      breadcrumbs: false
    },
    {
      id: 'licensee_internalSupport',
      title: 'Internal Support',
      type: 'item',
      url: '/licensee_internalSupport',
      icon: icons.IconHelp,
      breadcrumbs: false
    }
  ]
};

const licenseeClosed = {
  id: 'licensee-dashboard',
  type: 'group',
  children: [
    {
      id: 'licensee-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/licensee-dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'vendor',
      title: 'Vendor',
      type: 'item',
      url: '/vendor',
      icon: icons.IconUserPlus,
      breadcrumbs: false
    },
    {
      id: 'licensee_myteam',
      title: 'My Team',
      type: 'item',
      url: '/licensee_myteam',
      icon: icons.IconSteam,
      breadcrumbs: false
    },
    {
      id: 'licensee_support',
      title: 'Support',
      type: 'item',
      url: '/licensee_support',
      icon: icons.IconHelp,
      breadcrumbs: false
    },
    {
      id: 'licensee_internalSupport',
      title: 'Internal Support',
      type: 'item',
      url: '/licensee_internalSupport',
      icon: icons.IconHelp,
      breadcrumbs: false
    }
  ]
};

const settings = {
  id: 'settings',
  type: 'group',
  children: [
    {
      id: 'icons',
      title: 'Settings',
      type: 'collapse',
      icon: icons.IconSettings,
      children: [
        {
          id: 'mainCategory',
          title: 'Main Categories',
          type: 'item',
          url: '/MainCategory',
          icon: icons.IconCategory,
          breadcrumbs: false
        },
        {
          id: 'category',
          title: 'Categories',
          type: 'item',
          url: '/Category',
          icon: icons.IconCategory,
          breadcrumbs: false
        },
        {
          id: 'subCategory',
          title: 'Sub Categories',
          type: 'item',
          url: '/SubCategory',
          icon: icons.IconCategory,
          breadcrumbs: false
        },
        {
          id: 'specification',
          title: 'Specification',
          type: 'item',
          url: '/specification',
          icon: icons.IconAspectRatio,
          breadcrumbs: false
        },
        {
          id: '',
          title: 'Rate Card Setup',
          type: 'item',
          url: '/rate_card_setup',
          icon: icons.IconSettings,
          breadcrumbs: false
        },
        {
          id: 'rateCard',
          title: 'Rate Card',
          type: 'item',
          url: '/rate_card',
          icon: icons.IconReceipt2,
          breadcrumbs: false
        }
      ]
    }
  ]
};

const licenseeRole = {
  id: 'licensee-dashboard',
  type: 'group',
  children: [
    {
      id: 'licensee-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/licensee-dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },

    {
      id: 'licensee_Customers',
      title: 'Customers',
      type: 'item',
      url: '/licensee_Customers',
      icon: icons.IconSteam,
      breadcrumbs: false
    },
    {
      id: 'vendor-myteam',
      title: 'Vendor Team',
      type: 'item',
      url: '/vendor-myteam',
      icon: icons.IconUserPlus,
      breadcrumbs: false
    },

    {
      id: 'licensee_support',
      title: 'Support',
      type: 'item',
      url: '/licensee_support',
      icon: icons.IconHelp,
      breadcrumbs: false
    },
    {
      id: 'licensee_internalSupport',
      title: 'Internal Support',
      type: 'item',
      url: '/licensee_internalSupport',
      icon: icons.IconHelp,
      breadcrumbs: false
    }
  ]
};

const licenseeMenu = {
  licenseeClosed,
  licenseeShared,
  settings,
  licenseeRole
};

export default licenseeMenu;
