import { COMPANY_NAME, Routes, fullRoutes } from '../constants/index';
import { Location } from 'history';
import { matchPath } from 'react-router-dom';

const getMatchingPath = (path: string) =>
  Object.keys(fullRoutes).find((key) => fullRoutes[key].path === path);

export const getPath = (
  route: Routes,
  { withoutParams = false }: any = {}
): string => {
  const path: string = fullRoutes[route]?.path || fullRoutes[Routes.HOME].path;
  return withoutParams ? path.slice(0, path.indexOf('/:')) : path;
};

export const getCurrentLocation = (location?: Location): string => {
  return location ? `${location.pathname}${location.search || ''}` : '';
};

export const getPageTitle = (path: string) => {
  const matchingPath = fullRoutes[getMatchingPath(path) as string];
  if (matchingPath && typeof matchingPath.title === 'string') {
    return matchingPath.title as string;
  }
  return `${COMPANY_NAME}`;
};
