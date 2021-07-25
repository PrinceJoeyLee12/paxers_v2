export const UserRegisterInput = `
  input UserRegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
`;

export const UserLoginInput = `
  input UserLoginInput {
    email: String!
    password: String!
  }
`;
