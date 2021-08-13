import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-lambda';
import { sqsBaseUrl } from '../../../../constants/default';

import {
  IUserRegistrationMutationArgs,
  IBaseUseObject,
  IMessageToQueueRegisterUserArgs,
  EmailTypes,
  IJwtPayload,
  IRegisterUserDynamodbParams,
  EDynamodbConditionExpression,
  ERequest,
} from 'pxrs-schemas';

import { sendMessageToQueue, jwt as JWT } from 'pxrs-service-common';

interface Response {
  message: string;
  token?: string;
  user?: IBaseUseObject;
}

async function createUser(
  _: any,
  args: IUserRegistrationMutationArgs
): Promise<Response> {
  const {
    input: { firstName, lastName, email, password },
  } = args;

  let response: Response = {
    message: '',
    token: '',
    user: null,
  };

  const dynamodb = new DynamoDB.DocumentClient();

  const params: IRegisterUserDynamodbParams = {
    TableName: `${process.env.SERVICE}-${process.env.DYNAMODB_USERTABLE}-${process.env.STAGE}`,
    Item: {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10),
      activated: false,
      createdAt: new Date(Date.now()).toISOString(),
    },
    ConditionExpression:
      EDynamodbConditionExpression.NOT_EXIST_EMAIL /* Check if email is already been used */,
  };
  response.user = {
    ...params.Item,
  };

  return new Promise((resolve, reject) => {
    // TODO Soon use salesforce organize customers and OTKA for signing in
    // 1. Put User to dynamoDB
    dynamodb.put(params, async (err) => {
      if (!err) {
        console.log('Successfully inserted');

        const payload: IJwtPayload = {
          user: {
            id: params.Item.id,
          },
        };
        response.user.password = 'hidden';

        // 2. generate a token for the new user
        const token: string = await JWT.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: process.env.TOKEN_FOR_AUTH_EXPIRATION,
          },
          ERequest.APOLLO
        );

        // 3. Send Message to SQS for account email activation processing
        const sqsArgs: IMessageToQueueRegisterUserArgs = {
          recipientEmails: [email],
          validatedEmail: process.env.VALIDATED_EMAIL,
          typeOfEmail: EmailTypes.ACCOUNT_ACTIVATION_EMAIL,
          emailInformation: {
            firstName,
            lastName,
            recipientEmail: [email],
            redirectURL: `${process.env.HOSTNAME}/account-activation/${token}`,
          },
          QueueUrl: `${sqsBaseUrl}/${process.env.SERVICE}-${process.env.SQS_EMAIL_SENDER}-${process.env.STAGE}`,
        };

        const inQueue = await sendMessageToQueue(sqsArgs);
        response.token = token;
        if (inQueue) {
          response.message = `User Successfully inserted and Email Activation was sent to ${email}`;
        } else {
          response.message =
            "User Successfully inserted but activation mail wasn't sent this is a SERVER-SIDE_ERROR";
        }
        resolve(response);
      } else {
        console.log('ERROR IS: ', err);
        // TODO error handling
        if (err.code === 'ConditionalCheckFailedException') {
          reject(
            new ApolloError(
              'Email already existed! Try Logging in',
              'BAD_USER_INPUT'
            )
          );
        } else {
          reject(
            new ApolloError(
              "There's problem logging user. Please try again later!",
              'INTERNAL_SERVER_ERROR'
            )
          );
        }
      }
    });
  });
}

export default createUser;
