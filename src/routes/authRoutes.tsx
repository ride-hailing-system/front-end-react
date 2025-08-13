import React, { lazy, Suspense } from 'react';
import { Route, Routes as MainRoutes } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import SuspensePage from '../Pages/SuspensePage';

// auth Routes constants
export const AUTH_LOGIN = '/LOGIN';
export const AUTH_FORGOT_PASSWORD = '/forgot-password';
export const AUTH_LOGOUT = '/logout';

const Routes: React.FC = () => {
  const Login = lazy(() => import('../features/auth/components/LoginForm'));
  const PasswordReset = lazy(
    () => import('../features/auth/components/ForgetPasswordForm')
  );
  const Logout = lazy(() => import('../features/auth/components/LogoutPage'));

  return (
    <AuthLayout>
      <Suspense fallback={<SuspensePage />}>
        <MainRoutes>
          <Route path={AUTH_LOGIN} element={<Login />} />
          <Route path={AUTH_FORGOT_PASSWORD} element={<PasswordReset />} />
          <Route path={AUTH_LOGOUT} element={<Logout />} />
        </MainRoutes>
      </Suspense>
    </AuthLayout>
  );
};

export default Routes;
