import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { AdminRoles } from '../../constants';
// layouts
import DashboardLayout from '../../layouts/dashboard';
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
//
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardApp from '../pages/DashboardApp';
import Products from '../pages/Products';
import Blog from '../pages/Blog';
import User from '../pages/User';
import NotFound from '../pages/Page404';

import {
  PageLoginContainer,
  PageResetPasswordContainer,
  PageForgotPasswordContainer,
  PageRegisterContainer,
} from './lazy-imports';

export const UserRouter: any = (isAuthenticated: boolean) => {
  return useRoutes([
    {
      path: '/dashboard',
      element: isAuthenticated ? (
        <DashboardLayout />
      ) : (
        <Navigate to="/login" replace />
      ),
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: !isAuthenticated ? (
        <LogoOnlyLayout />
      ) : (
        <Navigate to="/dashboard" />
      ),
      children: [
        { path: '/', element: <PageLoginContainer /> },
        { path: 'login', element: <PageLoginContainer /> },
        { path: 'register', element: <PageRegisterContainer /> },
        { path: 'reset-password', element: <PageResetPasswordContainer /> },
        { path: 'forgot-password', element: <PageForgotPasswordContainer /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
};

// TODO to be edited
export const AdminRouter: any = () => {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <PageLoginContainer /> },
        { path: 'register', element: <PageRegisterContainer /> },
        { path: 'reset-password', element: <PageResetPasswordContainer /> },
        { path: 'forgot-password', element: <PageForgotPasswordContainer /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
};
