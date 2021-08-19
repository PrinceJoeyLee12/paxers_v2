import {
  EDynamoPrimaryKeys,
  EmailTypes,
  IMessageToQueueRegisterUserArgs,
  IJwtPayload,
  ERequest,
  ETokenExpiration,
  UserErrorMessage,
} from 'pxrs-schemas';
import { DynamoDB } from 'aws-sdk';
import { ApolloError } from 'apollo-server-lambda';
import { userTableNameDev, UserSqsUrl } from '../../../../constants/default';
import { sendMessageToQueue, jwt as JWT } from 'pxrs-service-common';

interface Response {
  message: string;
  status: number;
}

async function forgotPassword(
  _: any,
  args: { input: { email: string } }
): Promise<Response> {
  const {
    input: { email },
  } = args;

  let response: Response = {
    message: `Reset password link was successfully sent to your email, ${email}`,
    status: 200,
  };

  const dynamodb = new DynamoDB.DocumentClient();

  const params = {
    TableName: userTableNameDev,
    Key: { email },
    ProjectionExpression: `${EDynamoPrimaryKeys.EMAIL}`,
  };

  return new Promise((resolve, reject) => {
    // 1. Get User by Email
    dynamodb.get(params, async (err: any, data: any) => {
      if (!err && Object.keys(data).length > 0) {
        const payload: IJwtPayload = {
          user: {
            email: data.Item.email,
          },
        };
        console.log(payload);

        // 2. Generate token
        const token: string = await JWT.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: ETokenExpiration.TEN_MINUTES,
          },
          ERequest.APOLLO
        );

        // 3. Send Message to Queue for email processing
        const sqsArgs: IMessageToQueueRegisterUserArgs = {
          recipientEmails: [email],
          validatedEmail: process.env.VALIDATED_EMAIL,
          typeOfEmail: EmailTypes.FORGOT_PASSWORD_EMAIL,
          emailInformation: {
            firstName: data.Item.firstName,
            lastName: data.Item.lastName,
            recipientEmail: [email],
            redirectURL: `${process.env.HOSTNAME}/forgot-password/${token}`,
          },
          QueueUrl: UserSqsUrl,
        };
        const inQueue = await sendMessageToQueue(sqsArgs);
        if (inQueue) resolve(response);
        else reject(new ApolloError(UserErrorMessage.EMAIL_NOT_SENT));
      } else {
        console.error('Error Message is : ', err);
        reject(
          new ApolloError(
            UserErrorMessage.EMAIL_DONT_EXIST,
            'REQUEST_NOT_FOUND'
          )
        );
      }
    });
  });
}

export default forgotPassword;
