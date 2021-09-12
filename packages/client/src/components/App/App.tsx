import React, { useEffect } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useSelector } from 'react-redux';
import { isAuthenticatedSelector } from '../../modules/user/selectors';
import './App.css';

//Actions
import setAuthToken from '../../utils/setAuthToken';
// routes
import { UserRouter } from './routes';
// components
import ScrollToTop from '../atoms/ScrollToTop/ScrollToTop';

export const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  //Check Token
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      //store.dispatch(loadUser());
    }

    //Logout user out from all tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        //store.dispatch({ type: LOGOUT });
      }
    });
  }, []);
  return (
    <div className="App">
      <ScrollToTop />
      {UserRouter(isAuthenticated)}
    </div>
  );
};

export default App;
