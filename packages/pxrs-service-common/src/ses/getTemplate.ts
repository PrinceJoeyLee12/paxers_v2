import AWS from 'aws-sdk';
import {
  EApiVersion,
  EmailTypes,
  EmailTemplateNames,
  IAWSConfig,
} from 'pxrs-schemas';

export default async (
  EmailType: EmailTypes,
  AWSConfig: IAWSConfig
): Promise<any> => {
  AWS.config.update(AWSConfig);
  console.log(EmailType);
  console.log(EmailTemplateNames[EmailType]);

  try {
    const templatePromise = await new AWS.SES({
      apiVersion: EApiVersion.V2010_12_01,
    }).getTemplate({
      TemplateName: EmailTemplateNames[EmailType],
    });

    console.log(templatePromise);
    return templatePromise;
  } catch (error) {
    console.log('ERROR: ', error);
  }
};
