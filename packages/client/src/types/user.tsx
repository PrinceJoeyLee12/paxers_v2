export interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface UserResetPassword {
  password: string;
  passwordConfirm: string;
  token: string;
}
