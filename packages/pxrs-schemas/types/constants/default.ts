export enum Charset {
  UTF_8 = 'UTF-8',
}

export enum ERegion {
  ap_southeast_1 = 'ap-southeast-1',
}

export enum EApiVersion {
  V2010_12_01 = '2010-12-01',
}

export enum EmailTypes {
  FORGOT_PASSWORD_EMAIL = 'FORGOT_PASSWORD_EMAIL',
  RESET_PASSWORD = 'RESET_PASSWORD',
  ACCOUNT_ACTIVATION_EMAIL = 'ACCOUNT_ACTIVATION_EMAIL',
}

export const EmailTemplateNames: { [key: string]: string } = {
  [EmailTypes.ACCOUNT_ACTIVATION_EMAIL]: 'my-first-template',
  [EmailTypes.RESET_PASSWORD]: 'my-first-template',
  [EmailTypes.ACCOUNT_ACTIVATION_EMAIL]: 'my-first-template',
};

export enum EDynamodbConditionExpression {
  NOT_EXIST_EMAIL = 'attribute_not_exists(email)' /* Check if email is already been used */,
}

export enum ERequest {
  APOLLO = 'APOLLO',
}

export enum EDynamoPrimaryKeys {
  EMAIL = 'email',
}

export enum ETokenExpiration {
  ONE_DAY = '1d',
  FIVE_DAYS = '5 days',
  FIVE_MINUTES = '5m',
  TEN_MINUTES = '10m',
}

export enum ApolloErrorCode {
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  REQUEST_NOT_FOUND = 'REQUEST_NOT_FOUND',
}
