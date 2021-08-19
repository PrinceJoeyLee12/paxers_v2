import { EDynamoDBError, ERequest } from 'pxrs-schemas';
import * as apolloError from './apolloErrors';

export default (errorType: string, requestType: ERequest, message?: string) => {
  console.log(errorType === EDynamoDBError.CONDITIONAL_EXCEPTION);
  switch (errorType) {
    case EDynamoDBError.ACCESS_DENIED:
      if (requestType === ERequest.APOLLO)
        return apolloError.internalServerError(
          'Error on inserting data to database.'
        );
      else return apolloError.defaultApolloError;
    case EDynamoDBError.CONDITIONAL_EXCEPTION:
      if (requestType === ERequest.APOLLO)
        return apolloError.badUserRequest(
          `${message ? message : 'Internal Server Error'}`
        );
      else return apolloError.defaultApolloError;
    default:
      if (requestType === ERequest.APOLLO)
        return apolloError.internalServerError(
          `${message ? message : 'Internal Server Error'}`
        );
      else return apolloError.defaultApolloError;
  }
};
