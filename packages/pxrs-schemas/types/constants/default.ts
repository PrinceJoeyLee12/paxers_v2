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
  REGISTRATION_CONFIRMATION_EMAIL = 'REGISTRATION_CONFIRMATION_EMAIL',
  ACCOUNT_ACTIVATION_EMAIL = 'ACCOUNT_ACTIVATION_EMAIL',
}

export const EmailTemplateNames: { [key: string]: string } = {
  [EmailTypes.ACCOUNT_ACTIVATION_EMAIL]: 'my-first-template',
  [EmailTypes.REGISTRATION_CONFIRMATION_EMAIL]: 'my-first-template',
  [EmailTypes.ACCOUNT_ACTIVATION_EMAIL]: 'my-first-template',
};

export enum EDynamodbConditionExpression {
  NOT_EXIST_EMAIL = 'attribute_not_exists(email)' /* Check if email is already been used */,
}

export enum ERequest {
  APOLLO = 'APOLLO',
}

export enum EApolloCustomErrors {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export enum EDynamoPrimaryKeys {
  EMAIL = 'email',
}
