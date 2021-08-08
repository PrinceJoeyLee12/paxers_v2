import AWS, { AWSError, Request } from 'aws-sdk';
import { GetTemplateResponse } from 'aws-sdk/clients/ses';
import {
  ERegion,
  EApiVersion,
  EmailTypes,
  EmailTemplateNames,
  IAWSConfig,
} from 'pxrs-schemas';

export default async (
  EmailType: EmailTypes,
  AWSConfig: IAWSConfig
  // ): Promise<Request<GetTemplateResponse, AWSError>> => {
): Promise<any> => {
  AWS.config.update(AWSConfig);

  // console.log('TemplateName: ', EmailTemplateNames[EmailTypes[EmailType]]);

  // try {
  //   const templatePromise: Request<GetTemplateResponse, AWSError> =
  //     await new AWS.SES({
  //       apiVersion: EApiVersion.V2010_12_01,
  //     }).getTemplate({
  //       TemplateName: EmailTemplateNames[EmailTypes[EmailType]],
  //     });

  //   console.log('templatePromise', templatePromise);
  //   return templatePromise;
  // } catch (error: any) {
  //   console.log('Error', error);
  //   throw new Error(`ERROR Message: ${error.message} `);
  // }

  const templatePromise = new AWS.SES({ apiVersion: EApiVersion.V2010_12_01 })
    .getTemplate({
      TemplateName: EmailTemplateNames[EmailTypes[EmailType]],
    })
    .promise();

  // Handle promise's fulfilled/rejected states
  return new Promise(() => {
    templatePromise
      .then(function (data) {
        console.log('Success: ', data);
        return data;
      })
      .catch(function (err) {
        console.error(err, err.stack);
        return null;
      });
  });
};
