export {
  IUserRegistrationMutationArgs,
  IUserLoginMutationArgs,
} from './UserArgs';
export { IUserRegistrationObject, IUserLoginObject } from './UserObject';

export interface IJwtPayloadCreateUser {
  user: {
    id: string;
  };
}
export interface IJwtPayloadValidateUser {
  user: {
    email: string;
  };
}
