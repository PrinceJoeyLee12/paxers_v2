import { SQSHandler, SQSEvent } from 'aws-lambda';
import { sendEmail } from 'pxrs-service-common';
import {
  ISqsEventRecord,
  ISqsSendEmailEventBody,
  ISendEmailArgs,
  ERegion,
} from 'pxrs-schemas';

const emailSenderFunction: SQSHandler = async (event: SQSEvent) => {
  const records: any[] = event.Records;

  records.forEach(async (record: ISqsEventRecord) => {
    const {
      body,
      messageAttributes: { validatedEmail, typeOfEmail },
    } = record;
    const parsedBody: ISqsSendEmailEventBody = JSON.parse(body.toString());

    const args: ISendEmailArgs = {
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY,
      region: ERegion.ap_southeast_1,
      ToAddresses: [...parsedBody.recipientEmail],
      ConfigurationSetName: process.env.CONFIGURATIONSETNAME,
      Source: validatedEmail.stringValue,
      EmailType: typeOfEmail.stringValue,
      data: parsedBody,
    };

    const res = await sendEmail(args);
    console.log('Status', res.status);
    console.log('Message', res.message);
  });

  // tslint:disable-next-line: max-line-length
  // TODO return nothing for now but for but maybe imbed AWSXray soon or create Fullback when function fails
  return;
};
export default emailSenderFunction;
