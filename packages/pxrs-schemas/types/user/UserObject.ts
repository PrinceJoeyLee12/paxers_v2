export interface IUserRegistrationObject {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  activated: boolean;
  createdAt: string;
}
export interface IUserLoginObject {
  email: string;
  password: string;
}
