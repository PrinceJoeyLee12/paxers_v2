import AWS from 'aws-sdk';
import { ISendEmail } from 'pxrs-schemas';
import getEmailTemplate from './getTemplate';

export default async (
  args: ISendEmail
): Promise<{ status: number; message: string }> => {
  const ses = new AWS.SES({ apiVersion: '2010-12-01' });
  const response = {
    message: 'message was not sent',
    status: 400,
  };

  const {
    accessKeyId,
    secretAccessKey,
    region,
    ToAddresses,
    EmailType,
    Source,
    ConfigurationSetName,
    data,
  } = args;
  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region,
  });

  const params = {
    Destination: {
      ToAddresses: [...ToAddresses], // Email address/addresses that you want to send your email
    },
    ConfigurationSetName,
    Message: {
      Body: {
        Html: {
          // HTML Format of the email
          Charset: 'UTF-8',
          Data: `${async (): Promise<string> =>
            await getEmailTemplate(EmailType)}`,
        },
        Text: {
          Charset: 'UTF-8',
          Data: `Hello ${data.firstName}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Test email',
      },
    },
    Source,
  };

  const sendEmail = ses.sendEmail(params).promise();

  sendEmail
    .then(async (data) => {
      console.log('email submitted to SES', data);
      response.message = 'email was successfully sent';
      response.status = 200;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    ...response,
  };
};
