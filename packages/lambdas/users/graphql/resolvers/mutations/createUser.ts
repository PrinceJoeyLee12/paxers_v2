import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-lambda';
import { UserSqsUrl, userTableNameDev } from '../../../../constants/default';

import {
  IUserRegistrationMutationArgs,
  IBaseUseObject,
  IMessageToQueueRegisterUserArgs,
  EmailTypes,
  IJwtPayload,
  IDynamodbParams,
  EDynamodbConditionExpression,
  ERequest,
  EDynamoDBError,
  EApolloCustomErrors,
  UserErrorMessage,
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

  const params: IDynamodbParams = {
    TableName: userTableNameDev,
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
          QueueUrl: UserSqsUrl,
        };

        const inQueue = await sendMessageToQueue(sqsArgs);
        response.token = token;
        if (inQueue) {
          response.message = '';
        } else {
          response.message = '';
        }
        resolve(response);
      } else {
        console.log('ERROR IS: ', err);
        if (err.code === EDynamoDBError.CONDITIONAL_EXCEPTION) {
          reject(
            new ApolloError(
              UserErrorMessage.USER_ALREADY_EXISTED,
              EApolloCustomErrors.BAD_USER_REQUEST
            )
          );
        } else {
          reject(
            new ApolloError(
              UserErrorMessage.CREATE_USER_ERROR,
              EApolloCustomErrors.INTERNAL_SERVER_ERROR
            )
          );
        }
      }
    });
  });
}

export default createUser;
