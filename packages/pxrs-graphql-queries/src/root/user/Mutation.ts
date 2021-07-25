export default `
  type Mutation {
    createUserMutation(input: UserRegisterInput!): ResponseObject!
    validateUserMutation(input: UserLoginInput!): ResponseObject!
  }
`;
