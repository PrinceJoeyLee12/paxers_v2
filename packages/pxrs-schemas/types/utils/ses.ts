import { IUserEmailInformation } from '../emails';
import { IAWSConfig } from './aws';
import { Charset, EmailTypes } from '../constants';

export interface ISesBaseEventArgs extends IAWSConfig {
  ToAddresses: string[];
  Source: string;
  ConfigurationSetName?: string;
}

export type EmailTypeDataArgs = IUserEmailInformation;
export type ISendEmailData =
  | IForgotPasswordEmailInformation
  | IUserEmailInformation;

export interface IForgotPasswordEmailInformation {
  firstName: string;
  lastName: string;
  link: string;
}

export interface ISendEmailArgs extends ISesBaseEventArgs {
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
