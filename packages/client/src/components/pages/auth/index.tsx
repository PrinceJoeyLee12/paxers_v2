import React, { Suspense } from 'react';

import FallBack from '../../../layouts/FallBack';

//components
const PageLogin = React.lazy(() => import('./PageLogin'));
const PageForgotPassword = React.lazy(() => import('./PageForgotPassword'));
const PageRegister = React.lazy(() => import('./PageRegister'));
const PageResetPassword = React.lazy(() => import('./PageResetPassword'));

const AuthenticationPages: React.FC<any> = (props) => {
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
