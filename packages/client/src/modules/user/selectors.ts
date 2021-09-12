import { createSelector } from 'reselect';
import { store } from '../../store';

const rootSelector = createSelector(
  (state: State.Root) => state.user,
  (user: State.User): State.User => user
);

export const userDataSelector = createSelector(
  rootSelector,
  (user: State.User): State.UserData => user.data
);

export const firstNameSelector = createSelector(
  [userDataSelector],
  (userData: State.UserData): string => userData.firstName
);

export const tokenSelector = createSelector(
  [rootSelector],
  (user: State.User): string | null => user.token
);

export const isAuthenticatedSelector = createSelector(
  [rootSelector],
  (user: State.User): boolean => user.isAuthenticated
);
