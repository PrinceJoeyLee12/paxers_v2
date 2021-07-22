import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import Routes from '../components/routing/Routes';

//Redux
import { Provider } from 'react-redux';
import store from '../store';

//Actions
import setAuthToken from '../utils/setAuthToken';
import { loadUser } from '../actions/auth';
import { LOGOUT } from '../actions/types';

export const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  //Check Token
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }

    //Logout user out from all tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        store.dispatch({ type: LOGOUT });
      }
    });
  }, []);
  return (
    <div className='App'>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Router>
            {/* <Navbar> */}
            <Fragment>
              <Switch>
                <Route component={Routes} />
              </Switch>
            </Fragment>
            {/* </Navbar> */}
          </Router>
        </ApolloProvider>
      </Provider>
    </div>
  );
}

export default App;
