import { SEND_ACCOUNT_ACTIVATION_EMAIL } from './emailTypes';

import ejs from 'ejs';

export default (data: any): any => {
  switch (data.emailType) {
    case SEND_ACCOUNT_ACTIVATION_EMAIL:
      return;
  }
};
