import ejs from 'ejs';
import { SEND_ACCOUNT_ACTIVATION_EMAIL } from './emailTypes';
import path from 'path';

const renderFile = async (path: string, data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(path, data, (err, htmlString) => {
      if (!err) {
        console.log(htmlString);
        resolve(htmlString);
      } else {
        console.log(err);
        reject(
          "There's a problem rendering html string, Please contact administrator about this! "
        );
      }
    });
  });
};

const HtmlString = async (data: any, emailType: string) => {
  switch (emailType) {
    case SEND_ACCOUNT_ACTIVATION_EMAIL: {
      return renderFile(
        path.join(__dirname, '/view/AccountActivationEmail.ejs'),
        data
      );
    }
    default:
      return 'Nothing to Render';
  }
};

export default HtmlString;
