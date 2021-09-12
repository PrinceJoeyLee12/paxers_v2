import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import { clearLocalStorage } from '../../utils/localStorage';

export const getUserData: any = createAction(
  'user/GET_USER',
  async () => async (dispatch: Dispatch, getState: () => State.Root) => {
    const state = getState();
    return;
    //dispatch({ firstName: "Prince", lastName: 'Lee'})
  }
);

export const invalidateSession: any = createAction('user/INVALIDATE_SESSION');

export const logout: any = createAction(
  'user/LOGOUT',
  () =>
    async (dispatch: Dispatch): Promise<void> => {
      // clearSessionStorage(); // TODO do have session storage soon
      clearLocalStorage();
      // Logging out users will force a re-direct app-reload do not anything beyond this point
    }
);
