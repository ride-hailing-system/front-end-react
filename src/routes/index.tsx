import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import AdminRoutes from './adminRoutes';
import AuthRoutes from './authRoutes';
import SuspensePage from '../Pages/SuspensePage';

const AppRoutes: React.FC = () => {
  const PageNotFound = lazy(() => import('../Pages/PageNotFound'));

  return (
    <Router>
      <Suspense fallback={<SuspensePage />}>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
