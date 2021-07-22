import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-lambda';

import {
  IUserRegistrationMutationArgs,
  IUserRegistrationObject,
  IEmailSenderArgs,
} from 'pxrs-schemas';
import { sendMessage } from '../../../../utils/sqs/sqsFunctions';
import { SEND_ACCOUNT_ACTIVATION_EMAIL } from 'pxrs-service-common';

interface Response {
  message: string;
  token?: string;
  user?: IUserRegistrationObject;
}

async function createUserMutation(
  _: any,
  args: IUserRegistrationMutationArgs
): Promise<Response> {
  const {
    input: { firstName, lastName, email, password },
  } = args;

  let response = {
    message: '',
    token: '',
    user: null,
  };

  const dynamodb = new DynamoDB.DocumentClient();

  const params = {
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
      'attribute_not_exists(email)' /* Check if email is already been used */,
  };
  response.user = {
    ...params.Item,
  };

  const sqsArgs: IEmailSenderArgs = {
    recipientEmail: email,
    validatedEmail: process.env.VALIDATED_EMAIL,
    typeOfEmail: SEND_ACCOUNT_ACTIVATION_EMAIL,
  };

  return new Promise((resolve, reject) => {
    dynamodb.put(params, (err) => {
      if (!err) {
        console.log('Successfully inserted');
        const payload = {
          user: {
            id: params.Item.id,
          },
        };
        response.user.password = 'hidden';

        //generate a token for the new user
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: process.env.TOKEN_FOR_AUTH_EXPIRATION,
          },
          async (err, ResponseToken) => {
            if (!err) {
              //Send QUEUE for Email if token is Available

              sqsArgs.emailInformation = {
                firstName,
                lastName,
                recipientEmail: email,
                redirectURL: `${process.env.HOSTNAME}/account-activation/${ResponseToken}`,
              };
              const inQueue = await sendMessage(sqsArgs);
              response.token = ResponseToken;
              if (inQueue) {
                response.message = `User Successfully inserted and Email Activation was sent to ${email}`;
              } else {
                response.message = `User Successfully inserted but activation mail wasn't sent this is a SERVER-SIDE_ERROR`;
              }
              resolve(response);
            } else {
              console.log('Insert Failed with some other reason', err);
              reject(
                new ApolloError(
                  'Unable to generate token at this moment',
                  'INTERNAL_SERVER_ERROR'
                )
              );
            }
          }
        );
      } else {
        console.log('ERROR IS: ', err);
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

export default createUserMutation;
