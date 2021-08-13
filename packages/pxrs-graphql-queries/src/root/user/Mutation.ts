export default `
  type Mutation {
    createUser(input: UserRegisterInput!): ResponseObject!
    validateUser(input: UserLoginInput!): ResponseObject!
    forgotPassword(input: UserForgotPasswordInput!): ResponseObject!
  }
`;
