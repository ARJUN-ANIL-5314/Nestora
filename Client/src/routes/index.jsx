import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes.jsx';
import VendorRoutes from './VendorRoutes.jsx';
import AuthenticationRoutes from './AuthenticationRoutes.jsx';
import LicenseeRoutes from './LicenseeRoutes.jsx';
import ProfileRouter from './ProfileRouter.jsx';
import HomeRoute from './Homepage.jsx';
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([HomeRoute, AuthenticationRoutes, MainRoutes, VendorRoutes, LicenseeRoutes, ProfileRouter]);
}
