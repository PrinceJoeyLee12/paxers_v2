export interface IUserObject {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  activated?: boolean;
  createdAt?: string;
}
