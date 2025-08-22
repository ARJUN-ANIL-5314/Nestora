import React from 'react';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const ForgotPassword = Loadable(lazy(() => import('views/pages/authentication/Forgotpassword/ForgotPass/forgot-password')));
const EnterOTP = Loadable(lazy(() => import('views/pages/authentication/Forgotpassword/OtpEnter/EnterOTP')));
const EnterPass = Loadable(lazy(() => import('views/pages/authentication/Forgotpassword/NewPass/EnterNew')));
// ^ Remove this duplicate declaration

const AuthenticationRoutes = {
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin3 />
    },
    {
      path: '/register',
      element: <AuthRegister3 />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: '/EnterOTP',
      element: <EnterOTP />
    },
    {
      path: '/NewPassword',
      element: <EnterPass />
    }
  ]
};

export default AuthenticationRoutes;
