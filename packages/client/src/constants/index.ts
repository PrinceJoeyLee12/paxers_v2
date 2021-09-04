export const COMPANY_NAME = 'PAXERS';

type Noop = (i?: any) => string;

interface Route {
  path: string;
  title?: string | Noop;
  useAnalytics?: boolean;
}

export enum Routes {
  ROOT = 'ROOT',
  HOME = 'HOME',
  CAMPAIGNS = 'CAMPAIGNS',
  STATIC_LANDING_PAGES = 'STATIC_LANDING_PAGES',
  FEED = 'FEED',
  LOGIN = 'LOGIN',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  REGISTER = 'REGISTER',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

export enum Titles {}

export const fullRoutes: {
  [key: string]: Route;
} = {
  [Routes.ROOT]: {
    path: '/',
    title: `${COMPANY_NAME} | Home`,
    useAnalytics: false,
  },
  [Routes.HOME]: {
    path: '/home',
    title: `${COMPANY_NAME} | Home`,
  },
  [Routes.LOGIN]: {
    path: '/login',
    title: `${COMPANY_NAME} | Login`,
  },
  [Routes.REGISTER]: {
    path: '/register',
    title: `${COMPANY_NAME} | Register`,
  },
  [Routes.FORGOT_PASSWORD]: {
    path: '/forgot-password',
    title: `${COMPANY_NAME} | Forgot Password`,
  },
  [Routes.RESET_PASSWORD]: {
    path: '/reset-password',
    title: `${COMPANY_NAME} | Reset Password`,
  },
};

export enum SortByKeyNames {
  RELEVANCY = 'Relevancy',
  NEWEST_FIRST = 'NewestFirst',
  OLDEST_FIRST = 'OldestFirst',
  ALPHABETICAL = 'Alphabetical',
}

export const sortByOptions = {
  [SortByKeyNames.RELEVANCY]: {
    key: 1,
    text: 'Relevancy',
    value: 'relevancy',
  },
  [SortByKeyNames.NEWEST_FIRST]: {
    key: 2,
    text: 'Newest First',
    value: 'newest-first',
  },
  [SortByKeyNames.OLDEST_FIRST]: {
    key: 3,
    text: 'Oldest First',
    value: 'oldest-first',
  },
  [SortByKeyNames.ALPHABETICAL]: {
    key: 4,
    text: 'Alphabetical (A-Z)',
    value: 'alphabetical',
  },
};
