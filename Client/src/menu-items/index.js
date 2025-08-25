import adminMenu from './dashboard.js';
import licenseeMenu from './licensee.js';
import vendorMenu from './vendor.js';
import customerMenu from './customer.js';

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
