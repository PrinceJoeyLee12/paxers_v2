export default `
    type UserCreateResponseObject {
        token: String
        message: String!
        user: UserObject
        status: Int!
    }
    type UserValidateResponseObject {
        token: String
        message: String!
        user: UserObject
        status: Int!
    }
    type UserForgotPasswordResponseObject {
        message: String!
        status: Int!
    }
    type UserResetPasswordResponseObject {
        message: String!
        status: Int!
    }
`;
