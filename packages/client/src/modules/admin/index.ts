import { handleActions } from 'redux-actions';
import { getAdminData } from './actions';
import { UserApolloResponseMessage } from 'pxrs-schemas';

const initialState: State.Admin = {
  adminAuthStatus: {
    isAdmin: false,
  },
  error: null,
  loading: false,
};

const ACTION_HANDLERS = {
  [getAdminData]: {
    next: (state: State.Admin, action: any): State.Admin => {
      return {
        ...state,
        error: null,
        loading: false,
      };
    },
    throw: (
      state: State.Admin,
      {
        payload: error,
      }: { payload: UserApolloResponseMessage.UserErrorMessage } // TODO Change Response
    ): State.Admin => {
      return {
        ...state,
        error,
        loading: false,
      };
    },
  },
};

export default handleActions(ACTION_HANDLERS, initialState);
