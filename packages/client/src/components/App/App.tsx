import React, { Fragment, useEffect } from 'react';
import { Router as ReactRouter } from 'react-router-dom-v5';
import './App.css';

import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Routes from '../routing/Routes';

//Redux
import { Provider } from 'react-redux';
import { configureStore } from '../../store';

//Actions
import setAuthToken from '../../utils/setAuthToken';
import { loadUser } from '../../modules/actions/auth';
import { LOGOUT } from '../../modules/actions/types';

// routes
import Router from './routes';
// theme
import ThemeConfig from '../../theme';
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
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ThemeConfig>
            <ScrollToTop />
            <Router />
          </ThemeConfig>
        </ApolloProvider>
      </Provider>
    </div>
  );
};

export default App;

// return (
//   <div className="App">
//     <Provider store={store}>
//       <ApolloProvider client={client}>
//         <Router>
//           {/* <Navbar> */}
//           <Fragment>
//             <Switch>
//               <Route component={Routes} />
//             </Switch>
//           </Fragment>
//           {/* </Navbar> */}
//         </Router>
//       </ApolloProvider>
//     </Provider>
//   </div>
// );
