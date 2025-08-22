// import { IconBuildingBank, IconDashboard, IconSettings, IconWorld ,IconHelp,IconUserPlus , IconMap, IconMap2,IconDirections,IconListSearch,IconTemplate,IconSteam } from '@tabler/icons';

// // constant
// const icons = { IconDashboard, IconSettings,IconBuildingBank,IconWorld,IconHelp,IconUserPlus, IconMap, IconMap2,IconDirections,IconListSearch,IconTemplate ,IconSteam  };

// // ==============================|| DASHBOARD MENU ITEMS ||============================== //

// const admin = {
//   id: 'admin-dashboard',
//   type: 'group',
//   children: [
//     {
//       id: 'admin-dashboard',
//       title: 'Dashboard',
//       type: 'item',
//       url: '/admin-dashboard',
//       icon: icons.IconDashboard,
//       breadcrumbs: false
//     },
//     {

//       id: 'licensee',
//       title: 'Licensee',
//       type: 'item',
//       url: '/licensee',
//       icon: icons.IconUserPlus ,
//       breadcrumbs: false
//     },
//     {

//       id: 'admin_myTeam',
//       title: 'My Team',
//       type: 'item',
//       url: '/admin_myTeam',
//       icon: icons.IconSteam ,
//       breadcrumbs: false
//     },
//     {

//       id: 'admin_AllTeam',
//       title: 'Teams',
//       type: 'item',
//       url: '/admin_AllTeam',
//       icon: icons.IconSteam ,
//       breadcrumbs: false
//     },

//     {
//       id: 'admin_support',
//       title: 'Support',
//       type: 'item',
//       url: '/admin_support',
//       icon: icons.IconHelp ,
//       breadcrumbs: false
//     },
//     {
//       id: 'admin_internalSupport',
//       title: 'Internal Support',
//       type: 'item',
//       url: '/admin_internalSupport',
//       icon: icons.IconHelp ,
//       breadcrumbs: false
//     },
//   ]
// };

// const settings = {
//   id: 'settings',
//   type: 'group',
//   children: [
//     {
//       id: 'icons',
//       title: 'Settings',
//       type: 'collapse',
//       icon: icons.IconSettings,
//       children: [
//         {
//           id: 'bank',
//           title: 'Bank',
//           type: 'item',
//           url: '/Bank',
//           icon: icons.IconBuildingBank,
//           breadcrumbs: false
//         },
//         // {
//         //   id: 'supportType',
//         //   title: 'Support Type',
//         //   type: 'item',
//         //   url: '/supportType',
//         //   icon: icons.IconHelp,
//         //   breadcrumbs: false
//         // },
//         {
//           id: 'country2',
//           title: 'Country',
//           type: 'item',
//           url: '/country',
//           icon: icons.IconMap ,
//           breadcrumbs: false
//         },
//         {
//           id: 'state',
//           title: 'State',
//           type: 'item',
//           url: '/state',
//           icon: icons.IconMap2,
//           breadcrumbs: false
//         },

//         {
//           id: 'district',
//           title: 'District',
//           type: 'item',
//           url: '/district',
//           icon: icons.IconDirections,
//           breadcrumbs: false
//         },
//         {
//           id: 'enqSource',
//           title: 'Enquiry Source',
//           type: 'item',
//           url: '/enqSource',
//           icon: icons.IconListSearch,
//           breadcrumbs: false
//         },
//         {
//           id: 'enqMode',
//           title: 'Enquiry Mode',
//           type: 'item',
//           url: '/enqMode',
//           icon: icons.IconTemplate,
//           breadcrumbs: false
//         },
//       ]
//     }
//   ]
// };

// const adminMenu = {
//   admin,
//   settings,

// };

// export default adminMenu;

import {
  IconBuildingBank,
  IconDashboard,
  IconSettings,
  IconWorld,
  IconHelp,
  IconUserPlus,
  IconMap,
  IconMap2,
  IconDirections,
  IconListSearch,
  IconTemplate,
  IconSteam
} from '@tabler/icons';

// constant
const icons = {
  IconDashboard,
  IconSettings,
  IconBuildingBank,
  IconWorld,
  IconHelp,
  IconUserPlus,
  IconMap,
  IconMap2,
  IconDirections,
  IconListSearch,
  IconTemplate,
  IconSteam
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const admin = {
  id: 'admin-dashboard',
  type: 'group',
  children: [
    {
      id: 'admin-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/admin-dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'licensee',
      title: 'Licensee',
      type: 'item',
      url: '/licensee',
      icon: icons.IconUserPlus,
      breadcrumbs: false
    },
    {
      id: 'admin_myTeam',
      title: 'My Team',
      type: 'item',
      url: '/admin_myTeam',
      icon: icons.IconSteam,
      breadcrumbs: false
    },
    {
      id: 'admin_AllTeam',
      title: 'Teams',
      type: 'item',
      url: '/admin_AllTeam',
      icon: icons.IconSteam,
      breadcrumbs: false
    },

    {
      id: 'admin_support',
      title: 'Support',
      type: 'item',
      url: '/admin_support',
      icon: icons.IconHelp,
      breadcrumbs: false
    },
    {
      id: 'admin_internalSupport',
      title: 'Internal Support',
      type: 'item',
      url: '/admin_internalSupport',
      icon: icons.IconHelp,
      breadcrumbs: false
    }
  ]
};

const adminRole = {
  id: 'admin-dashboard',
  type: 'group',
  children: [
    {
      id: 'admin-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/admin-dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'admin_AllTeam',
      title: 'Teams',
      type: 'item',
      url: '/admin_AllTeam',
      icon: icons.IconSteam,
      breadcrumbs: false
    },

    {
      id: 'admin_support',
      title: 'Support',
      type: 'item',
      url: '/admin_support',
      icon: icons.IconHelp,
      breadcrumbs: false
    },
    {
      id: 'admin_internalSupport',
      title: 'Internal Support',
      type: 'item',
      url: '/admin_internalSupport',
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
          id: 'bank',
          title: 'Bank',
          type: 'item',
          url: '/Bank',
          icon: icons.IconBuildingBank,
          breadcrumbs: false
        },
        // {
        //   id: 'supportType',
        //   title: 'Support Type',
        //   type: 'item',
        //   url: '/supportType',
        //   icon: icons.IconHelp,
        //   breadcrumbs: false
        // },
        {
          id: 'country2',
          title: 'Country',
          type: 'item',
          url: '/country',
          icon: icons.IconMap,
          breadcrumbs: false
        },
        {
          id: 'state',
          title: 'State',
          type: 'item',
          url: '/state',
          icon: icons.IconMap2,
          breadcrumbs: false
        },

        {
          id: 'district',
          title: 'District',
          type: 'item',
          url: '/district',
          icon: icons.IconDirections,
          breadcrumbs: false
        },
        {
          id: 'enqSource',
          title: 'Enquiry Source',
          type: 'item',
          url: '/enqSource',
          icon: icons.IconListSearch,
          breadcrumbs: false
        },
        {
          id: 'enqMode',
          title: 'Enquiry Mode',
          type: 'item',
          url: '/enqMode',
          icon: icons.IconTemplate,
          breadcrumbs: false
        }
      ]
    }
  ]
};

const adminMenu = {
  admin,
  settings,
  adminRole
};

export default adminMenu;
