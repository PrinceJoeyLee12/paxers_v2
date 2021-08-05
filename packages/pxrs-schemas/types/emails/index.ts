export enum EmailTypes {
  FORGOT_PASSWORD_EMAIL = 'FORGOT_PASSWORD_EMAIL',
  REGISTRATION_CONFIRMATION_EMAIL = 'REGISTRATION_CONFIRMATION_EMAIL',
  ACCOUNT_ACTIVATION_EMAIL = 'ACCOUNT_ACTIVATION_EMAIL',
}

// TODO change any tyoe of data to more strict type
export interface ISendEmail {
  accessKeyId: string;
  secretAccessKey: string;
  region: ERegion;
  ToAddresses: string[];
  ConfigurationSetName: string;
  Source: string;
  EmailType: EmailTypes;
  data?: IForgotPasswordTypes | any;
}

interface IForgotPasswordTypes {
  firstName: string;
  lastName: string;
  link: string;
}

export enum ERegion {
  ap_southeast_1 = 'ap-southeast-1',
}
