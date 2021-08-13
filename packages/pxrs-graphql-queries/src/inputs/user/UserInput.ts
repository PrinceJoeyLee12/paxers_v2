export default `
  input UserLoginInput {
    email: String!
    password: String!
  },
  input UserRegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserForgotPasswordInput {
    email: String!
  }
`;
