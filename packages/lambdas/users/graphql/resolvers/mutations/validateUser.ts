import {
  IUserLoginMutationArgs,
  IGetItemBaseDynamoParams,
  IJwtPayload,
  ERequest,
  IBaseUseObject,
} from 'pxrs-schemas';
import { DynamoDB } from 'aws-sdk';
import bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-lambda';
import { jwt as JWT } from 'pxrs-service-common';

interface Response {
  message: string;
  token?: string;
  user?: IBaseUseObject | null;
}

async function validateUser(
  _: any,
  args: IUserLoginMutationArgs
): Promise<Response> {
  const {
    input: { email, password },
  } = args;

  let response: Response = {
    message: '',
    token: '',
    user: null,
  };

  const dynamodb = new DynamoDB.DocumentClient();

  // IValidateUserDynamodbParams
  const params: IGetItemBaseDynamoParams = {
    TableName: `${process.env.SERVICE}-${process.env.DYNAMODB_USERTABLE}-${process.env.STAGE}`,
    Key: { email },
  };

  return new Promise((resolve, reject) => {
    dynamodb.get(params, async (err: any, data: any) => {
      if (!err && Object.keys(data).length !== 0) {
        // 1. Check if password matched
        const isMatch = await bcrypt.compare(password, data.Item.password);
        if (isMatch) {
          const payload: IJwtPayload = {
            user: {
              email: data.Item.email,
            },
          };

          // 2. generate a token for the new user
          const token: string = await JWT.sign(
            payload,
            process.env.SECRET_KEY,
            {
              expiresIn: process.env.TOKEN_FOR_AUTH_EXPIRATION,
            },
            ERequest.APOLLO
          );
          response.token = token;
          response.user = data.Item;
          response.user.password = 'hidden';
          console.log(response);
          resolve(response);
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

export default validateUser;
