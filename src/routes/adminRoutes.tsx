import React, { lazy, Suspense } from 'react';
import { Route, Routes as MainRoutes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Index from '../layouts/MainLayout/Index';
import SuspensePage from '../Pages/SuspensePage';

// admin Routes constants
export const ADMIN_DASHBOARD = '/dashboard';
export const ADMIN_USERS = '/users';
export const ADMIN_DRIVERS = '/drivers';
export const ADMIN_RIDERS = '/riders';
export const ADMIN_RIDES = '/rides';
export const ADMIN_RIDE_FORM = '/rides/registration-form';
export const ADMIN_VEHICLES = '/vehicles';
export const ADMIN_SETTING = '/setting';
export const ADMIN_NOTIFICATIONS = '/notifications';
export const ADMIN_CHANGE_PASSWORD = '/change-password';
export const ADMIN_DRIVER_DETAIL_PAGE = '/driver-detail/:userId';

const Routes: React.FC = () => {
  const Dashboard = lazy(
    () => import('../features/dashboard/components/Index')
  );
  const RegisterdUserList = lazy(
    () => import('../features/users/components/UserList')
  );
  const Rides = lazy(() => import('../features/rides/components/RideList'));
  const RideRegistrationForm = lazy(
    () => import('../features/rides/components/RideRegistrationForm')
  );
  const Vehicles = lazy(
    () => import('../features/vehicles/components/VehicleList')
  );
  const Setting = lazy(() => import('../features/settings/components'));
  const Notifications = lazy(
    () => import('../features/notifications/components/Index')
  );
  const ChangePassword = lazy(
    () => import('../features/auth/components/ChangePassword')
  );
  const PageNotFound = lazy(() => import('../Pages/PageNotFound'));
  const DriverDetailPage = lazy(
    () => import('../features/users/components/DriverDetail')
  );

  return (
    <Index>
      <Suspense fallback={<SuspensePage />}>
        <MainRoutes>
          <Route
            path={ADMIN_DASHBOARD}
            element={
              <ProtectedRoute
                extraProps={{ role: 'admin' }}
                element={Dashboard}
              />
            }
          />
          <Route
            path={ADMIN_USERS}
            element={
              <ProtectedRoute
                extraProps={{ role: 'admin' }}
                element={RegisterdUserList}
              />
            }
          />
          <Route
            path={ADMIN_DRIVER_DETAIL_PAGE}
            element={
              <ProtectedRoute
                extraProps={{ role: 'admin' }}
                element={DriverDetailPage}
              />
            }
          />
          <Route
            path={ADMIN_DRIVERS}
            element={
              <ProtectedRoute
                extraProps={{ role: 'admin' }}
                element={RegisterdUserList}
              />
            }
          />
          <Route
            path={ADMIN_RIDERS}
            element={
              <ProtectedRoute
                extraProps={{ role: 'admin' }}
                element={RegisterdUserList}
              />
            }
          />
          <Route
            path={ADMIN_RIDES}
            element={
              <ProtectedRoute extraProps={{ role: 'admin' }} element={Rides} />
            }
          />
          <Route
            path={ADMIN_RIDE_FORM}
            element={
              <ProtectedRoute
                extraProps={{ role: 'admin' }}
                element={RideRegistrationForm}
              />
            }
          />
          <Route
            path={ADMIN_VEHICLES}
            element={
              <ProtectedRoute
                extraProps={{ role: 'admin' }}
                element={Vehicles}
              />
            }
          />
          <Route
            path={ADMIN_SETTING}
            element={
              <ProtectedRoute
                extraProps={{ role: 'admin' }}
                element={Setting}
              />
            }
          />
          <Route
            path={ADMIN_NOTIFICATIONS}
            element={
              <ProtectedRoute
                extraProps={{ role: 'admin' }}
                element={Notifications}
              />
            }
          />
          <Route
            path={ADMIN_CHANGE_PASSWORD}
            element={
              <ProtectedRoute
                extraProps={{ role: 'admin' }}
                element={ChangePassword}
              />
            }
          />
          <Route
            path={'/*'}
            element={
              <ProtectedRoute
                extraProps={{ role: 'admin' }}
                element={PageNotFound}
              />
            }
          />
        </MainRoutes>
      </Suspense>
    </Index>
  );
};

export default Routes;
