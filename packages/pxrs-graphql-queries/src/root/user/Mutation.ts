export default `
  type Mutation {
    createUserMutation(input: UserInput!): ResponseObject!
    validateUserMutation(input: UserInput!): ResponseObject!
  }
`;
