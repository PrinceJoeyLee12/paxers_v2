/**
 * Get object without particular keys
 */
export const omitProps = (object: any, propNames: string[]): object => {
  return Object.keys(object).reduce((acc: any, key: string) => {
    if (propNames.includes(key)) return acc;
    acc[key] = object[key];
    return acc;
  }, {});
};

/**
 * Get object without all keys except particular list
 */
export const pickProps = (object: any, propNames: string[]): object => {
  return propNames.reduce((acc: any, key: string) => {
    acc[key] = object[key];
    return acc;
  }, {});
};
