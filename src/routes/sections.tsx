import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import MainLayout from 'src/layouts/main/MainLayout';
import { DashboardLayout } from 'src/layouts/dashboard';
import PrivateRoute from '@/auth/PrivateRoute';

// ----------------------------------------------------------------------
// MAIN
export const HomePage = lazy(() => import('src/pages/home'));
// DASHBOARD
export const Analytics = lazy(() => import('src/pages/dashboard/analytics'));
export const TranscriptOrder = lazy(() => import('src/pages/dashboard/transcript-order'));
export const EducationVerification = lazy(
  () => import('src/pages/dashboard/education-verification')
);
export const IdentityVerification = lazy(() => import('src/pages/dashboard/identity-verification'));
export const CreditCheck = lazy(() => import('src/pages/dashboard/credit-check'));
export const History = lazy(() => import('src/pages/dashboard/history'));
export const ManageAdmin = lazy(() => import('src/pages/dashboard/manage-admin'));
export const ManageInstitute = lazy(() => import('src/pages/dashboard/manage-institute'));
export const ResetPassword = lazy(() => import('src/pages/dashboard/reset-password'));
// OTHERS
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        // { path: 'user', element: <UserPage /> },
      ],
    },
    {
      path: 'dashboard',
      element: (
        <PrivateRoute>
          <DashboardLayout>
            <Suspense fallback={renderFallback}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </PrivateRoute>
      ),
      children: [
        { element: <Analytics />, index: true },
        { path: 'history', element: <History /> },
        { path: 'requests/transcript-order', element: <TranscriptOrder /> },
        { path: 'requests/education-verification', element: <EducationVerification /> },
        { path: 'requests/identity-verification', element: <IdentityVerification /> },
        { path: 'requests/credit-check', element: <CreditCheck /> },
        { path: 'manage-admins', element: <ManageAdmin /> },
        { path: 'manage-institutes', element: <ManageInstitute /> },
        { path: 'reset-password', element: <ResetPassword /> },
      ],
    },
    {
      path: 'sign-up',
      element: (
        <AuthLayout>
          <SignUpPage />
        </AuthLayout>
      ),
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
