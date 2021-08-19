import React, { Suspense } from 'react';
import { RouteComponentProps } from 'react-router';

import FallBack from '../../../layouts/FallBack';

//components
const PageLogin = React.lazy(() => import('./PageLogin'));
const PageForgotPassword = React.lazy(() => import('./PageForgotPassword'));
const PageRegister = React.lazy(() => import('./PageRegister'));
const PageResetPassword = React.lazy(() => import('./PageResetPassword'));

const AuthenticationPages: React.FC<RouteComponentProps> = (props) => {
  return (
    <>
      <Suspense fallback={<FallBack />}>
        {props.match.url === '/login' ? (
          <PageLogin {...props} />
        ) : props.match.url === '/register' ? (
          <PageRegister {...props} />
        ) : props.match.url === '/forgot-password' ? (
          <PageForgotPassword {...props} />
        ) : (
          <PageResetPassword {...props} />
        )}
      </Suspense>
    </>
  );
};

export default AuthenticationPages;
