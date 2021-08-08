const { EApiVersion, EmailTemplateNames, ETemplateNames, EmailTypes, ERegion } = require('pxrs-schemas')
  // Load the AWS SDK for Node.js.
      const AWS = require('aws-sdk');
      // Set the AWS Region.
      AWS.config.update({region: ERegion.ap_southeast_1});
      
      const test = 'ACCOUNT_ACTIVATION_EMAIL';
      // Create the promise and Amazon Simple Email Service (Amazon SES) service object.
      console.log(`${EmailTemplateNames[EmailTypes[test]]}`)
      console.log(`${EmailTemplateNames[test]}`)
      console.log(`${EmailTemplateNames[test]}`)
      console.log(EApiVersion.V2010_12_01)
      const templatePromise = new AWS.SES({apiVersion: EApiVersion.V2010_12_01}).getTemplate({TemplateName: EmailTemplateNames[`${EmailTypes.ACCOUNT_ACTIVATION_EMAIL}`]}).promise();
      
      // Handle promise's fulfilled/rejected states
      templatePromise.then(
        function(data) {
          console.log('Success: ', data);
          return data
        }).catch(
          function(err) {
          console.error(err, err.stack);
          return null
        });


    