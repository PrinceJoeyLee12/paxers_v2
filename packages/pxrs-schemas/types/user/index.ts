export {
  IUserRegistrationMutationArgs,
  IUserLoginMutationArgs,
} from './UserArgs';
export { IBaseUseObject, IUserLoginObject } from './UserObject';

export interface IJwtUserPayload {
  user: {
    id?: string;
    email?: string;
  };
}
