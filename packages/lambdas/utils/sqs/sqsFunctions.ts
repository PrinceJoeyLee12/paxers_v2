import AWS from 'aws-sdk';
import { IEmailSenderArgs } from '../../typings';

export const sendMessage = async (args: IEmailSenderArgs): Promise<Boolean> => {
  const { recipientEmail, validatedEmail, typeOfEmail, emailInformation } =
    args;
  const sqs = new AWS.SQS();

  emailInformation.recipientEmail = recipientEmail;
  const params = {
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
    QueueUrl: `https://sqs.${process.env.REGION}.amazonaws.com/${process.env.ACCOUNTID}/${process.env.SERVICE}-${process.env.SQS_EMAIL_SENDER}-${process.env.STAGE}`,
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

interface QueueArgs {
  queueURL: string;
  receiptHandler: string;
}

export const deleteMessageFromQueue = async (
  args: QueueArgs
): Promise<Boolean> => {
  const sqs = new AWS.SQS();
  const { queueURL, receiptHandler } = args;
  return new Promise((resolve, reject) => {
    const params = {
      QueueUrl: queueURL,
      ReceiptHandle: receiptHandler,
    };
    sqs.deleteMessage(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        reject(false);
      } // an error occurred
      else {
        console.log(data);
        resolve(true);
      } // successful response
    });
  });
};
