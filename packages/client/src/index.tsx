import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { HelmetProvider } from 'react-helmet-async';
import { AppWrapperContainer as App } from './containers/AppWrapperContainer';
import reportWebVitals from './components/App/reportWebVitals';

import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

//Redux
import { Provider } from 'react-redux';
// theme
import ThemeConfig from './theme';
import { configureStore } from './store';

export const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const { store, history } = configureStore();

// Prepare for server side rendering (SSR)
window.onload = () => {
  Loadable.preloadReady()
    .then(() =>
      ReactDOM.hydrate(
        <Provider store={store}>
          <ApolloProvider client={client}>
            <ThemeConfig>
              <HelmetProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </HelmetProvider>
            </ThemeConfig>
          </ApolloProvider>
        </Provider>,
        document.getElementById('root')
      )
    )
    .catch(console.error);
};

reportWebVitals();
