import React from 'react';
import { Loader } from 'semantic-ui-react';
import Loadable from 'react-loadable';

const Loading = () => <Loader active content="Loading" />;

export const AppContainer = Loadable({
  loader: async () => {
    const module = await import(
      /* webpackChunkName: "AppContainer" */ '../../containers/AppContainer'
    );
    return module.AppContainer;
  },
  loading: Loading,
  modules: ['AppContainer'],
});

export const PageLoginContainer = Loadable({
  loader: async () => {
    const module = await import(
      /* webpackChunkName: "PageLoginContainer" */ '../../containers/PageLoginContainer'
    );
    return module.PageLoginContainer;
  },
  loading: Loading,
  modules: ['PageLoginContainer'],
});

export const PageRegisterContainer = Loadable({
  loader: async () => {
    const module = await import(
      /* webpackChunkName: "PageRegisterContainer" */ '../../containers/PageRegisterContainer'
    );
    return module.PageRegisterContainer;
  },
  loading: Loading,
  modules: ['PageRegisterContainer'],
});

export const PageResetPasswordContainer = Loadable({
  loader: async () => {
    const module = await import(
      /* webpackChunkName: "PageRegisterContainer" */ '../../containers/PageResetPasswordContainer'
    );
    return module.PageResetPasswordContainer;
  },
  loading: Loading,
  modules: ['PageResetPasswordContainer'],
});

export const PageForgotPasswordContainer = Loadable({
  loader: async () => {
    const module = await import(
      /* webpackChunkName: "PageRegisterContainer" */ '../../containers/PageForgotPasswordContainer'
    );
    return module.PageForgotPasswordContainer;
  },
  loading: Loading,
  modules: ['PageForgotPasswordContainer'],
});
