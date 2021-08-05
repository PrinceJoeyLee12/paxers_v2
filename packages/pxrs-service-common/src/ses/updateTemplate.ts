import AWS from 'aws-sdk';

export const updateTemplate = () => {
  // Create updateTemplate parameters
  const params = {
    Template: {
      TemplateName: 'TEMPLATE_NAME' /* required */,
      HtmlPart: 'HTML_CONTENT',
      SubjectPart: 'SUBJECT_LINE',
      TextPart: 'TEXT_CONTENT',
    },
  };

  // Create the promise and SES service object
  const templatePromise = new AWS.SES({ apiVersion: '2010-12-01' })
    .updateTemplate(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  templatePromise
    .then(function (data: any) {
      console.log('Template Updated');
    })
    .catch(function (err: any) {
      console.error(err, err.stack);
    });
};
