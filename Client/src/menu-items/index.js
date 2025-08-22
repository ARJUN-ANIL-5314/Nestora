import adminMenu from './dashboard';
import licenseeMenu from './licensee';
import vendorMenu from './vendor';
import customerMenu from './customer';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  admin: [adminMenu.admin, adminMenu.settings],
  adminRole: [adminMenu.adminRole],
  licenseeClosed: [licenseeMenu.licenseeClosed, licenseeMenu.settings],
  licenseeShared: [licenseeMenu.licenseeShared, licenseeMenu.settings],
  licenseeRole: [licenseeMenu.licenseeRole],
  customer: [customerMenu.customer, customerMenu.other],
  vendor: [vendorMenu.vendor],
  vendorRole: [vendorMenu.vendorRole]
};

export default menuItems;
