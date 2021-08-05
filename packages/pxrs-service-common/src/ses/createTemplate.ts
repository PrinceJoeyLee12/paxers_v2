import AWS from 'aws-sdk';

// Create createTemplate params
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
  .createTemplate(params)
  .promise();

// Handle promise's fulfilled/rejected states
templatePromise
  .then(function (data: any) {
    console.log(data);
  })
  .catch(function (err: any) {
    console.error(err, err.stack);
  });
