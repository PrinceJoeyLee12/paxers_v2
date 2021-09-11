import React from 'react';
import { AppContainer } from './lazy-imports';
// import { AdminAppContainer } from '../../containers/AdminAppContainer';

export const AppWrapper: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) =>
  // !isAdminPortal ? <AppContainer /> : <AdminAppContainer />; // TODO App Admin is to be created
  !isAdmin ? <AppContainer /> : <></>;
