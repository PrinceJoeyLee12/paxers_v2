import { EmailTypes } from '../constants';

interface IBaseEmailInformation {
  recipientEmail: string[];
  redirectURL: string;
}
export interface IUserEmailInformation extends IBaseEmailInformation {
  firstName: string;
  lastName: string;
}

export interface IMessageToQueueRegisterUserArgs {
  recipientEmails: string[];
  validatedEmail: string;
  typeOfEmail: EmailTypes;
  emailInformation: IUserEmailInformation;
  QueueUrl: string;
}
