import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import { generatePath } from 'react-router-dom';

export const getUserData: any = createAction(
  'user/GET_USER',
  async () => async (dispatch: Dispatch, getState: () => State.Root) => {
    const state = getState();

    //dispatch({ firstName: "Prince", lastName: 'Lee'})
  }
);
