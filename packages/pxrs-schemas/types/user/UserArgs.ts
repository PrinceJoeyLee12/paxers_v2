export interface IUserRegistrationMutationArgs {
  input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
}

export interface IUserLoginMutationArgs {
  input: {
    email: string;
    password: string;
  };
}
