import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

//components
import AuthenticationPages from '../pages/auth';

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/' component={AuthenticationPages} />
        <Route exact path='/login' component={AuthenticationPages} />
        <Route exact path='/register' component={AuthenticationPages} />
        <Route exact path='/forgot-password' component={AuthenticationPages} />
        <Route
          exact
          path='/reset-password/:token'
          component={AuthenticationPages}
        />
        {/* <Route exact path='/contact-us' component={ContactUs} />
        <PrivateRoute exact path='/' component={AuthLandingPage} />
        <Route component={NotFound} /> */}
      </Switch>
    </Fragment>
  );
};

export default Routes;
