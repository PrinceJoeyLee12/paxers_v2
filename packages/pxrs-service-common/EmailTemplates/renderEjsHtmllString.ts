import ejs from 'ejs';
import { SEND_ACCOUNT_ACTIVATION_EMAIL } from './emailTypes';
import path from 'path';

const renderFile = (path: string, data: any): string => {
  let htmlStringHandler = '';

  ejs.renderFile(path, data, (err, htmlString) => {
    if (!err) {
      console.log('HTML String from Render: ', htmlString);
      htmlStringHandler = htmlString.toString();
    } else {
      console.log('ERROR: ', err);
      htmlStringHandler =
        "There's a problem rendering html string, Please contact administrator about this! ";
    }
  });

  return htmlStringHandler;
};

const HtmlString = async (data: any, emailType: string) => {
  console.log('emailType: ', emailType);
  console.log('data: ', data);
  if (emailType === SEND_ACCOUNT_ACTIVATION_EMAIL) {
    return renderFile(
      path.join(__dirname, '/views/AccountActivationEmail.ejs'),
      data
    );
  } else {
    return 'Nothing to Render';
  }
};

export default HtmlString;
