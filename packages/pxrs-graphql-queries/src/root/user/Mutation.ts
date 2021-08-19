export default `
  type Mutation {
    createUser(input: UserRegisterInput!): UserCreateResponseObject!
    validateUser(input: UserLoginInput!): UserValidateResponseObject!
    forgotPassword(input: UserForgotPasswordInput!): UserForgotPasswordResponseObject!
    resetPassword(input: UserResetPasswordInput!): UserResetPasswordResponseObject
  }
`;
