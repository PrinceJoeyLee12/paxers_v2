import AWS from 'aws-sdk';
import {
  ISendEmailMessageToQueueArgs,
  ISendMessageToQueueEmailParams,
} from 'pxrs-schemas';

export default async (args: ISendEmailMessageToQueueArgs): Promise<Boolean> => {
  const {
    recipientEmails,
    validatedEmail,
    typeOfEmail,
    emailInformation,
    QueueUrl,
  } = args;
  const sqs = new AWS.SQS();

  emailInformation.recipientEmail = recipientEmails;

  const params: ISendMessageToQueueEmailParams = {
    MessageAttributes: {
      validatedEmail: {
        DataType: 'String',
        StringValue: validatedEmail,
      },
      typeOfEmail: {
        DataType: 'String',
        StringValue: typeOfEmail,
      },
    },
    MessageBody: JSON.stringify(emailInformation),
    QueueUrl,
  };

  return new Promise((resolve, reject) => {
    sqs.sendMessage(params, (err: any, data: any) => {
      if (err) {
        console.log('Error', err);
        reject(false);
      } else {
        console.log('Success', data.MessageId);
        console.log('Inside', data);
        resolve(true);
      }
    });
  });
};
