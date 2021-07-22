import AWS from 'aws-sdk';
import { ICreateEmailTemplatesArgs } from '../../typings';

export default async (args: ICreateEmailTemplatesArgs) => {
  const params = {
    Template: {
      TemplateName: 'TEMPLATE_NAME' /* required */,
      HtmlPart: 'HTML_CONTENT',
      SubjectPart: 'SUBJECT_LINE',
      TextPart: 'TEXT_CONTENT',
    },
  };

  const templatePromise = new AWS.SES({ apiVersion: '2010-12-01' })
    .createTemplate(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  templatePromise
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
};
