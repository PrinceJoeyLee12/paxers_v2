import { EmailTypes } from '../constants';

export interface IRegisterUserEmailInformation {
  firstName: string;
  lastName: string;
  recipientEmail: string[];
  redirectURL: string;
}

export interface IMessageToQueueRegisterUserArgs {
  recipientEmails: string[];
  validatedEmail: string;
  typeOfEmail: EmailTypes;
  emailInformation: IRegisterUserEmailInformation;
  QueueUrl: string;
}
