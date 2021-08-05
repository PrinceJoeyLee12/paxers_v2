import { Handler } from 'aws-lambda';
import { getEmailTemplate } from 'pxrs-service-common';
import { EmailTypes } from 'pxrs-schemas';
import { sendEmail } from 'pxrs-service-common';

const emailSenderFunction: Handler = async (event) => {
  event.Records.forEach(async (record) => {
    const {
      body,
      messageAttributes: { validatedEmail, typeOfEmail },
    } = record;
    const parsedBody = JSON.parse(body);

    const args = {
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY,
      region: process.env.REGION,
      ToAddresses: [...parsedBody.email],
      ConfigurationSetName: process.env.CONFIGURATIONSETNAME,
      Source: validatedEmail,
      EmailType: typeOfEmail,
      data: parsedBody,
    };

    await sendEmail(args);
  });

  return;
};
export default emailSenderFunction;
