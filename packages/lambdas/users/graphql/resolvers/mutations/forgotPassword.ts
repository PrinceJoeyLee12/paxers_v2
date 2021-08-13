import {
  IGetItemBaseDynamoParams,
  IBaseUseObject,
  EDynamoPrimaryKeys,
  EmailTypes,
  IMessageToQueueRegisterUserArgs,
  IJwtPayload,
  ERequest,
} from 'pxrs-schemas';
import { DynamoDB } from 'aws-sdk';
import { ApolloError } from 'apollo-server-lambda';
import { sqsBaseUrl } from '../../../../constants/default';
import { sendMessageToQueue, jwt as JWT } from 'pxrs-service-common';

interface Response {
  message: string;
}

async function validateUser(
  _: any,
  args: { input: { email: string } }
): Promise<Response> {
  const {
    input: { email },
  } = args;

  let response: Response = {
    message: '',
  };

  const dynamodb = new DynamoDB.DocumentClient();

  const params: IGetItemBaseDynamoParams = {
    TableName: `${process.env.SERVICE}-${process.env.DYNAMODB_USERTABLE}-${process.env.STAGE}`,
    Key: { email },
    ProjectionExpression: `${EDynamoPrimaryKeys.EMAIL}`,
  };

  return new Promise((resolve, reject) => {
    // 1. Check email if it exist
    dynamodb.get(params, async (err: any, data: any) => {
      if (!err && Object.keys(data).length !== 0) {
        // 2. generate a token for the new user
        const payload: IJwtPayload = {
          user: {
            id: data.Item.email,
          },
        };
        const token: string = await JWT.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: process.env.TOKEN_FOR_AUTH_EXPIRATION,
          },
          ERequest.APOLLO
        );
        const sqsArgs: IMessageToQueueRegisterUserArgs = {
          recipientEmails: [email],
          validatedEmail: process.env.VALIDATED_EMAIL,
          typeOfEmail: EmailTypes.ACCOUNT_ACTIVATION_EMAIL,
          emailInformation: {
            firstName: data.Item.firstName,
            lastName: data.Item.lastName,
            recipientEmail: [email],
            redirectURL: `${process.env.HOSTNAME}/forgot-password/${token}`,
          },
          QueueUrl: `${sqsBaseUrl}/${process.env.SERVICE}-${process.env.SQS_EMAIL_SENDER}-${process.env.STAGE}`,
        };
        const inQueue = await sendMessageToQueue(sqsArgs);
        if (inQueue) {
          response.message = `Reset password link was successfully sent to your email, ${email}`;
          resolve(response);
        } else {
          reject(
            new ApolloError(
              "Email wasn't successfully send to you! Please try again later"
            )
          );
        }
      } else {
        console.error('Error Message is : ', err);
        reject(
          new ApolloError("This email doesn't exist!", 'REQUEST_NOT_FOUND')
        );
      }
    });
  });
}

export default validateUser;
