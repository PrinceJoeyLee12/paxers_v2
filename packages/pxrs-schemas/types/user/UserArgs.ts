export interface IDummyObject {
  firstItem: string;
  secondItem: string;
}

export interface IDummyQueryArgs {
  itemId: string;
}

export interface IUserMutationArgs {
  input: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
  };
}
