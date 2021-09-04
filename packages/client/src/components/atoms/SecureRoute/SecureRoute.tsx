import React from 'react';
import { RouteProps } from 'react-router';
import { NavLink, Route } from 'react-router-dom';
import { Routes } from '../../../constants/index';
import { getPath } from '../../../utils/routes';

interface Props extends RouteProps {
  isAuth: boolean | null;
  isPublic?: boolean;
  skipRedirect?: boolean;
}

export const SecureRoute: React.FC<Props> = ({
  element: Component,
  isAuth,
  isPublic = false,
  skipRedirect = true,
  ...routeProps
}) => {
  // 1. Render requested route when user authenticated
  if (isAuth || isPublic) {
    return <Route {...routeProps} element={Component} />;
  }

  // Redirect can be skipped optionally, or by SSR
  if (skipRedirect) return null;

  // 2. Redirect to internal login
  return <NavLink to={`${getPath(Routes.LOGIN)}`} />;
};
