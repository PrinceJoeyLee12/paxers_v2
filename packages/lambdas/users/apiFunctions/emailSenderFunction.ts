import { Handler } from 'aws-lambda';
import AWS from 'aws-sdk';
import {
  SEND_ACCOUNT_ACTIVATION_EMAIL,
  renderFileType,
} from 'pxrs-service-common';

const emailSenderFunction: Handler = (event) => {
  const ses = new AWS.SES({ apiVersion: '2010-12-01' });

  event.Records.forEach((record) => {
    const {
      body,
      messageAttributes: { validatedEmail, typeOfEmail },
    } = record;
    const parsedBody = JSON.parse(record.body);

    AWS.config.update({
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY,
      region: process.env.REGION,
    });

    console.log('Body', body);

    const params = {
      Destination: {
        ToAddresses: [parsedBody.recipientEmail], // Email address/addresses that you want to send your email
      },
      ConfigurationSetName: process.env.CONFIGURATIONSETNAME,
      Message: {
        Body: {
          Html: {
            // HTML Format of the email
            Charset: 'UTF-8',
            Data: `${renderFileType(typeOfEmail, parsedBody.firstName)}`,
          },
          Text: {
            Charset: 'UTF-8',
            Data: `Hello ${parsedBody.firstName}`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email',
        },
      },
      Source: validatedEmail.stringValue,
    };

    const sendEmail = ses.sendEmail(params).promise();

    sendEmail
      .then(async (data) => {
        console.log('email submitted to SES', data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return;
};
export default emailSenderFunction;
