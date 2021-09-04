import { createStore, applyMiddleware, AnyAction, Store, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { createRootReducer } from './rootReducer';
// import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducer from './modules/reducers';
import setAuthToken from './utils/setAuthToken';

const initialState: any = {};

const composeEnhancers =
  composeWithDevTools ||
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;

let store: Store<any, AnyAction>;
let history;

export const configureStore: () => {
  store: Store<any, AnyAction>;
  history: any;
} = () => {
  history = createBrowserHistory();

  store = createStore(
    createRootReducer(history), // root reducer with router state,
    initialState,
    composeEnhancers(
      applyMiddleware(
        // routerMiddleware(history), // for dispatching history actions
        thunk
      )
    )
  );

  // set up a store subscription listener
  // to store the users token in localStorage

  // initialize current state from redux store for subscription comparison
  // preventing undefined error
  let currentState = store.getState();

  store.subscribe(() => {
    // keep track of the previous and current state to compare changes
    let previousState: any = currentState;
    currentState = store.getState();
    // if the token changes set the value in localStorage and axios headers
    if (previousState.user.token !== currentState.user.token) {
      const token = currentState.auth.token;
      setAuthToken(token);
    }
  });

  return { store, history };
};

export { store, history };
