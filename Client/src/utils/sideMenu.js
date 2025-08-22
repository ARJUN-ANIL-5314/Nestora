export const SideMenu = (user, menu) => {
  switch (user.role) {
    case 'admin':
      return menu.admin;
    case 'licensee':
      return user.licnseType === 'shared' ? menu.licenseeShared : menu.licenseeClosed;
    case 'vendor':
      return menu.vendor;
    case 'adminAcnt':
      return menu.adminRole;
    case 'adminMngr':
      return menu.adminRole;
    case 'adminOptr':
      return menu.adminRole;
    case 'vendorAcnt':
      return menu.vendorRole;
    case 'vendorMngr':
      return menu.vendorRole;
    case 'vendorOptr':
      return menu.vendorRole;
    case 'licnseAcnt':
      return menu.licenseeRole;
    case 'licnseMngr':
      return menu.licenseeRole;
    case 'licnseOptr':
      return menu.licenseeRole;

    default:
      break;
  }
};
