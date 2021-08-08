import { IRegisterUserEmailInformation } from '../emails';
import { IAWSConfig } from './aws';
import { Charset, EmailTypes } from '../constants';

export interface ISesBaseEventArgs extends IAWSConfig {
  ConfigurationSetName?: string;
}

export interface ISesSendEmailArgs extends ISesBaseEventArgs {
  ToAddresses: string[];
  Source: string;
  EmailType: EmailTypes;
  data: EmailTypeDataArgs;
}

export type EmailTypeDataArgs = IRegisterUserEmailInformation;
export type ISendEmailData =
  | IForgotPasswordEmailInformation
  | IRegisterUserEmailInformation;

export interface IForgotPasswordEmailInformation {
  firstName: string;
  lastName: string;
  link: string;
}

export interface ISendEmail extends IAWSConfig {
  ToAddresses: string[];
  ConfigurationSetName: string;
  Source: string;
  EmailType: EmailTypes;
  data?: ISendEmailData;
}

export interface GetTemplateRequestParams {
  Destination: {
    ToAddresses: string[];
  };
  ConfigurationSetName: string;
  Message: {
    Body: {
      Html: {
        Charset: Charset;
        Data: any;
      };
      Text: {
        Charset: Charset;
        Data: any;
      };
    };
    Subject: {
      Charset: Charset;
      Data: any;
    };
  };
  Source: string;
}
