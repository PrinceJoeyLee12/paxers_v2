import { ApolloError } from 'apollo-server-errors';
import { EApolloCustomErrors } from 'pxrs-schemas';

export const internalServerError = (message: string) => {
  return new ApolloError(
    `${message}`,
    EApolloCustomErrors.INTERNAL_SERVER_ERROR
  );
};
export const jwtExpired = () => {
  return new ApolloError(
    'Token has expired, cannot perform request',
    EApolloCustomErrors.EXPIRED_TOKEN
  );
};
export const badUserRequest = (message: string) => {
  return new ApolloError(`${message}`, EApolloCustomErrors.BAD_USER_REQUEST);
};

export const defaultApolloError = (message?: string) => {
  return new ApolloError(
    message ? message : 'Internal Error, this is on our side'
  );
};
