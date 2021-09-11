import { createSelector } from 'reselect';

const rootSelector = createSelector(
  (state: State.Root) => state.admin,
  (admin: State.Admin): State.Admin => admin
);

export const adminStatusSelector = createSelector(
  rootSelector,
  (admin: State.Admin): State.AdminStatus => admin?.adminAuthStatus
);

export const isAdminSelector = createSelector(
  [adminStatusSelector],
  (adminAuthStatus: State.AdminStatus): boolean => adminAuthStatus?.isAdmin
);
