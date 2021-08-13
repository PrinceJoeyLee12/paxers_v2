import { IUserEmailInformation, ISendEmailMessageToQueueArgs } from '../emails';
import { EmailTypes } from '../constants';

export type ISqsSendEmailEventBody = IUserEmailInformation;
type ISqsEventBody = ISqsSendEmailEventBody;

type ISqsMessageAttributes = ISqsSendEmailMessageAttributes;

export interface ISqsEventRecord {
  body: ISqsEventBody;
  messageAttributes: ISqsMessageAttributes;
}

export interface ISqsSendEmailMessageAttributes {
  validatedEmail: {
    stringValue: string;
  };
  typeOfEmail: {
    stringValue: EmailTypes;
  };
}

export interface ISendMessageToQueueBaseArgs {}

// export type ISendMessageToQueueArgs = ISendEmailMessageToQueueArgs extends ISendMessageToQueueBaseArgs
export type ISendMessageToQueueArgs = ISendEmailMessageToQueueArgs;
