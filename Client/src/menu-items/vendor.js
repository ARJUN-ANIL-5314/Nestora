import {
  IconDashboard,
  IconFileInvoice,
  IconBrandSuperhuman,
  IconBow,
  IconSteam,
  IconUserPlus,
  IconTemplate,
  IconBrandPaypal,
  IconHelp,
  IconBuildingBank
} from '@tabler/icons';
// import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

// constant
const icons = {
  IconDashboard,
  IconFileInvoice,
  IconUserPlus,
  IconTemplate,
  IconBrandSuperhuman,
  IconBow,
  IconSteam,
  IconBrandPaypal,
  IconHelp,
  IconBuildingBank
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const vendor = {
  id: 'vendor-dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard6',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'customer',
      title: 'Customers',
      type: 'item',
      url: '/customers',
      icon: icons.IconSteam,
      breadcrumbs: false
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.IconTemplate,
      breadcrumbs: false
      // disabled: true,
    },
    {
      id: 'invoice',
      title: 'Invoice',
      type: 'item',
      url: '/invoice',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
      // disabled: true,
    },
    {
      id: 'Payments',
      title: 'Payment ',
      type: 'item',
      url: '/Payments',
      icon: icons.IconBrandPaypal,
      breadcrumbs: true
      // disabled: true,
    },
    {
      id: 'myteam',
      title: 'My Team',
      type: 'item',
      url: '/myteam',
      icon: icons.IconUserPlus,
      breadcrumbs: false
    },
    {
      id: 'vendor_support',
      title: 'Support',
      type: 'item',
      url: '/vendor_support',
      icon: icons.IconHelp,
      breadcrumbs: false
    },
    {
      id: 'vendor_internalSupport',
      title: 'Internal Support',
      type: 'item',
      url: '/vendor_internalSupport',
      icon: icons.IconHelp,
      breadcrumbs: false
    }
  ]
};

const vendorRole = {
  id: 'vendor-dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard6',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'customer',
      title: 'Customers',
      type: 'item',
      url: '/customers',
      icon: icons.IconSteam,
      breadcrumbs: false
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.IconTemplate,
      breadcrumbs: false
      // disabled: true,
    },
    {
      id: 'invoice',
      title: 'Invoice',
      type: 'item',
      url: '/invoice',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
      // disabled: true,
    },
    {
      id: 'Payments',
      title: 'Payment ',
      type: 'item',
      url: '/Payments',
      icon: icons.IconBrandPaypal,
      breadcrumbs: true
      // disabled: true,
    },
    {
      id: 'vendor_support',
      title: 'Support',
      type: 'item',
      url: '/vendor_support',
      icon: icons.IconHelp,
      breadcrumbs: false
    },
    {
      id: 'vendor_internalSupport',
      title: 'Internal Support',
      type: 'item',
      url: '/vendor_internalSupport',
      icon: icons.IconHelp,
      breadcrumbs: false
    }
  ]
};

const VendorMenu = {
  vendor,
  vendorRole
};

export default VendorMenu;
