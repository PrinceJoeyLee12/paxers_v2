import { GetTemplateResponse, GetTemplateRequest } from 'aws-sdk/clients/ses';
import { Charset, GetTemplateRequestParams } from 'pxrs-schemas';

export const SendEmailParams = (
  ConfigurationSetName: string,
  Source: string,
  ToAddresses: string[],
  emailHTML: GetTemplateResponse
): GetTemplateRequestParams => {
  return {
    Destination: {
      ToAddresses: [...ToAddresses],
    },
    ConfigurationSetName,
    Message: {
      Body: {
        Html: {
          Charset: Charset.UTF_8,
          Data: emailHTML.Template.HtmlPart,
        },
        Text: {
          Charset: Charset.UTF_8,
          Data: emailHTML.Template.TextPart,
        },
      },
      Subject: {
        Charset: Charset.UTF_8,
        Data: emailHTML.Template.SubjectPart,
      },
    },
    Source,
  };
};
