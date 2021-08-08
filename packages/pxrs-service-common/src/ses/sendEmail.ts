import AWS, { Request, AWSError } from 'aws-sdk';
import { SendEmailRequest, GetTemplateResponse } from 'aws-sdk/clients/ses';
import { ISendEmail, EApiVersion } from 'pxrs-schemas';
import getEmailTemplate from './getTemplate';
import { SendEmailParams } from './helpers';

export default async (
  args: ISendEmail
): Promise<{ status: number; message: string }> => {
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

  const ses = new AWS.SES({ apiVersion: EApiVersion.V2010_12_01 });
  const response = {
    message: 'message was not sent',
    status: 400,
  };

  const AWSConfig = {
    accessKeyId,
    secretAccessKey,
    region,
  };

  AWS.config.update(AWSConfig);

  // 1. Get Template
  try {
    const emailHTML: any = await getEmailTemplate(EmailType, AWSConfig);
    console.log('emailHTML', emailHTML);

    const params: SendEmailRequest = SendEmailParams(
      ConfigurationSetName,
      Source,
      ToAddresses,
      emailHTML
    );

    // 2. Send Email
    try {
      const sendEmail = await ses.sendEmail(params);
      console.log('SendEmail', sendEmail);
      if (sendEmail) {
        response.message = 'email was successfully sent';
        response.status = 200;
      }
    } catch (err: any) {
      console.log('ERROR: ', err);
      throw new Error(`Message Error: ${err.message}`);
    }
    console.log('Response', response);
    return response;
  } catch (err: any) {
    throw new Error(`Message Error: ${err.message}`);
  }
};
