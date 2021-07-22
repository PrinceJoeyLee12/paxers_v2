import { Handler } from 'aws-lambda';
import AWS from 'aws-sdk';
import { deleteMessageFromQueue } from '../../utils/sqs/sqsFunctions';

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
            Data: `<html><body><h1>Hello  ${parsedBody.firstName}</h1><p style='color:red'>Sample description</p> <p>Time 1517831318946</p></body></html>`,
          },
          Text: {
            Charset: 'UTF-8',
            Data: `Hello ${parsedBody.firstName} Sample description time 1517831318946`,
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
