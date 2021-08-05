import AWS from 'aws-sdk';
import { EmailTypes } from 'pxrs-schemas';

// TODO change Promise<any> Response into more detailed type
export default async (templateName: EmailTypes): Promise<any> => {
  new AWS.SES({ apiVersion: '2010-12-01' })
    .getTemplate({ TemplateName: templateName })
    .promise()
    .then(function (data) {
      console.log(data.Template.SubjectPart);
      return data;
    })
    .catch(function (err) {
      console.error('ERROR: ', err, err.stack);
      return null;
    });
};
