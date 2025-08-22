import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import VendorRoutes from './VendorRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import LicenseeRoutes from './LicenseeRoutes';
import ProfileRouter from './ProfileRouter';
import HomeRoute from './Homepage';
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([HomeRoute, AuthenticationRoutes, MainRoutes, VendorRoutes, LicenseeRoutes, ProfileRouter]);
}
