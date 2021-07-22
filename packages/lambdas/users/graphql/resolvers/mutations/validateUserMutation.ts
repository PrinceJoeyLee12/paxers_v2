import { IUserMutationArgs } from '../../../../../typings';

import { DynamoDB } from 'aws-sdk';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-lambda';

interface Response {
  message: string;
  token?: string;
  user?: any;
}

async function validateUserMutation(
  _: any,
  args: IUserMutationArgs
): Promise<Response> {
  const {
    input: { email, password },
  } = args;

  let response = {
    message: '',
    token: '',
    user: null,
  };

  const dynamodb = new DynamoDB.DocumentClient();

  const params = {
    TableName: `${process.env.SERVICE}-${process.env.DYNAMODB_USERTABLE}-${process.env.STAGE}`,
    Key: {
      email,
    },
  };

  return new Promise((resolve, reject) => {
    dynamodb.get(params, async (err: any, data: any) => {
      if (!err && Object.keys(data).length !== 0) {
        const isMatch = await bcrypt.compare(password, data.Item.password);
        if (isMatch) {
          const payload = {
            user: {
              email: data.email,
            },
          };
          jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
              expiresIn: process.env.TOKEN_FOR_AUTH_EXPIRATION,
            },
            (err, Responsetoken) => {
              if (!err) {
                response.token = Responsetoken;
                response.message = 'User Successfully authenticated';
                response.user = data.Item;
                response.user.password = 'hidden'; /*hide password to client*/
                console.log('Token: ', response);
                resolve(response);
              } else {
                console.log('Validation Failed with some other reason', err);
                response.message = "There's an error logging user";
                reject(
                  new ApolloError(
                    'Unable to generate token at this moment',
                    'INTERNAL_SERVER_ERROR'
                  )
                );
              }
            }
          );
        } else
          reject(
            new ApolloError('Email or Password is incorrect!', 'BAD_USER_INPUT')
          );
      } else {
        console.error('Error Message is : ', err);
        reject(
          new ApolloError("User Doesn't Exist Yet!!", 'REQUEST_NOT_FOUND')
        );
      }
    });
  });
}

export default validateUserMutation;
