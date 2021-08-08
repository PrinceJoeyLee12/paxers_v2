export enum Charset {
  UTF_8 = 'UTF-8',
}

export enum ERegion {
  ap_southeast_1 = 'ap-southeast-1',
}

export enum EApiVersion {
  V2010_12_01 = '2010-12-01',
}

//If Changes/additional OCCURS between EmailTypes, ETemplateNames or EmailTemplateNames the 3 must be edited/added
//ALWAYS FOLLOW THE FORMAT or NAMING FIX for each of them
// --------------------- Blocks For Bundle Change ---------------------
export enum EmailTypes {
  FORGOT_PASSWORD_EMAIL = 'FORGOT_PASSWORD_EMAIL',
  REGISTRATION_CONFIRMATION_EMAIL = 'REGISTRATION_CONFIRMATION_EMAIL',
  ACCOUNT_ACTIVATION_EMAIL = 'ACCOUNT_ACTIVATION_EMAIL',
}

export enum ETemplateNames {
  FORGOT_PASSWORD_EMAIL = 'my-first-template',
  REGISTRATION_CONFIRMATION_EMAIL = 'my-first-template', // TODO to change
  ACCOUNT_ACTIVATION_EMAIL = 'my-first-template', // TODO to change
}

export const EmailTemplateNames = {
  FORGOT_PASSWORD_EMAIL: ETemplateNames.FORGOT_PASSWORD_EMAIL,
  REGISTRATION_CONFIRMATION_EMAIL:
    ETemplateNames.REGISTRATION_CONFIRMATION_EMAIL,
  ACCOUNT_ACTIVATION_EMAIL: ETemplateNames.ACCOUNT_ACTIVATION_EMAIL,
};
// --------------------- End ---------------------

export enum EDynamodbConditionExpression {
  NOT_EXIST_EMAIL = 'attribute_not_exists(email)' /* Check if email is already been used */,
}

export enum ERequest {
  APOLLO = 'APOLLO',
}

export enum EApolloCustomErrors {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}
