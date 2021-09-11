import { omitProps, pickProps } from './index';
import { emptyObject } from './emptyItems';

export enum LOCAL_STORAGE {
  PAXERS_DATA = 'PAXERS_DATA',
}

/**
 * Get a set of props from localStorage
 */
export const getLocalStorageItem = (
  name: string | string[],
  storeKey: string = LOCAL_STORAGE.PAXERS_DATA
): string | boolean | object | null => {
  if (!window.localStorage) return null;
  const localConfigStr: string | null = window.localStorage.getItem(storeKey);
  if (!localConfigStr) return null;
  const localConfig = JSON.parse(localConfigStr);
  if (Array.isArray(name)) return pickProps(localConfig, name);
  return localConfig[name] || null;
};

/**
 * Save a set of props to localStorage
 */
export const setLocalStorageItem = (
  valueMap: object,
  storeKey: string = LOCAL_STORAGE.PAXERS_DATA
): void => {
  if (!window.localStorage) return;
  const localConfigStr: string | null = window.localStorage.getItem(storeKey);
  const localConfig = localConfigStr ? JSON.parse(localConfigStr) : emptyObject;
  const nextLocalConfig = {
    ...localConfig,
    ...valueMap,
  };
  window.localStorage.setItem(storeKey, JSON.stringify(nextLocalConfig));
};

/**
 * Remove a set of props from localStorage
 */
export const removeLocalStorageItem = (
  name: string | string[],
  storeKey: string = LOCAL_STORAGE.PAXERS_DATA
): void => {
  if (!window.localStorage) return;
  const names: string[] = Array.isArray(name) ? name : [name];
  const localConfigStr: string | null = window.localStorage.getItem(storeKey);
  if (!localConfigStr) return;
  const localConfig = JSON.parse(localConfigStr);
  const nextConfig = omitProps(localConfig, names);
  if (Object.keys(nextConfig).length) {
    const nextLocalConfigStr: string = JSON.stringify(nextConfig);
    window.localStorage.setItem(storeKey, nextLocalConfigStr);
  } else {
    window.localStorage.removeItem(storeKey);
  }
};

/**
 * Clear localStorage
 */
export const clearLocalStorage = (
  storeKey: string = LOCAL_STORAGE.PAXERS_DATA
): void => {
  if (!window.localStorage) return;
  window.localStorage.removeItem(storeKey);
};
