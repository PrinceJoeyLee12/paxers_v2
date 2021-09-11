import React, { useEffect } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import './App.css';

//Redux
import { configureStore } from '../../store';
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
  const { store, history } = configureStore();

  //Check Token
  useEffect(() => {
    console.log('called');
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
      <UserRouter />
    </div>
  );
};

export default App;
