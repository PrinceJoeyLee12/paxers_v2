import { combineReducers } from 'redux';
// import { connectRouter, getRouter } from 'connected-react-router';
import userReducer from './modules/user';

export const createRootReducer = (history: any) => {
  return combineReducers({
    // router: connectRouter(history),
    user: userReducer,
    //   user: userReducer,
  });
};
