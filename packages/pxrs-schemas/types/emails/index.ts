import {
  IMessageToQueueRegisterUserArgs,
  IRegisterUserEmailInformation,
} from './user';

export * from './user';
export interface ISendMessageToQueueEmailParams {
  MessageAttributes: {
    validatedEmail: {
      DataType: string;
      StringValue: string;
    };
    typeOfEmail: {
      DataType: string;
      StringValue: string;
    };
  };
  MessageBody: string;
  QueueUrl: string;
}

export type ISendEmailMessageToQueueArgs = IMessageToQueueRegisterUserArgs;

declare type IEmailMessageBody = IRegisterUserEmailInformation;
export declare type IMessageBody = IEmailMessageBody;
