import { combineReducers } from 'redux';
// import { connectRouter, getRouter } from 'connected-react-router';
import userReducer from './modules/user';
import adminReducer from './modules/admin';

export const createRootReducer = (history: any) => {
  return combineReducers({
    // router: connectRouter(history),
    user: userReducer,
    admin: adminReducer,
    //   user: userReducer,
  });
};
