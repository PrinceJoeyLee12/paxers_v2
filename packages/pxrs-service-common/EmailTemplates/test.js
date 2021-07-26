const ejs  = require('ejs');
const path = require('path');
const SEND_ACCOUNT_ACTIVATION_EMAIL = "SEND_ACCOUNT_ACTIVATION_EMAIL";

const renderFile = (path) => {
    let renderedMaterial ='';

  ejs.renderFile(path, { firstName: "Prince Joey Lee" }, (err, htmlString) => {
    if (!err) {
        console.log('HTML String from Render: ', htmlString);
        renderedMaterial = htmlString.toString()
      } else {
        console.log(err);
        return "There's a problem rendering html string, Please contact administrator about this! ";
      }
    })
    return renderedMaterial
  };

const HtmlString = (emailType) => {
  console.log(
    path.join(__dirname, '/views/AccountActivationEmail.ejs').toString()
  );
  console.log(emailType === "SEND_ACCOUNT_ACTIVATION_EMAIL")
  if (emailType === "SEND_ACCOUNT_ACTIVATION_EMAIL") {
    return renderFile(
      path.join(__dirname, '/views/AccountActivationEmail.ejs')
    );
  }
  // switch (emailType) {
  //   case SEND_ACCOUNT_ACTIVATION_EMAIL: {
  //     console.log('EmailType: ', emailType);
  //     console.log(
  //       path.join(__dirname, '/view/AccountActivationEmail.ejs').toString()
  //     );
  //     return renderFile(
  //       path.join(__dirname, '/view/AccountActivationEmail.ejs'),
  //       data
  //     );
  //   }
  //   default:
  //     return 'Nothing to Render';
  // }
};

console.log(HtmlString('SEND_ACCOUNT_ACTIVATION_EMAIL'));

