import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import { clearLocalStorage } from '../../utils/localStorage';

export const getAdminData: any = createAction(
  'user/GET_USER',
  async () => async (dispatch: Dispatch, getState: () => State.Root) => {
    const state = getState();
    return;
    //dispatch({ firstName: "Prince", lastName: 'Lee'})
  }
);

export const invalidateAdminSession: any = createAction(
  'admin/INVALIDATE_ADMIN_SESSION'
);

export const logoutAdmin: any = createAction(
  'admin/LOGOUT',
  () =>
    async (dispatch: Dispatch): Promise<void> => {
      // clearSessionStorage(); // TODO do have session storage soon
      clearLocalStorage();
      // Logging out users will force a re-direct app-reload do not anything beyond this point
    }
);
