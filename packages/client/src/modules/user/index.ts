import { handleActions } from 'redux-actions';
import { getUserData } from './actions';
import { UserApolloResponseMessage } from 'pxrs-schemas';

const initialState: State.User = {
  data: {
    firstName: '',
    lastName: '',
  },
  isAuthenticated: true,
  token: '',
  error: null,
  loading: false,
};

const ACTION_HANDLERS = {
  [getUserData]: {
    next: (state: State.User, action: any): State.User => {
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      };
    },
    throw: (
      state: State.User,
      {
        payload: error,
      }: { payload: UserApolloResponseMessage.UserErrorMessage }
    ): State.User => {
      return {
        ...state,
        error,
        loading: false,
      };
    },
  },
};

export default handleActions(ACTION_HANDLERS, initialState);
