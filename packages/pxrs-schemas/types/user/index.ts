export {
  IUserRegistrationMutationArgs,
  IUserLoginMutationArgs,
} from './UserArgs';
export { IBaseUseObject, IUserLoginObject } from './UserObject';

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
