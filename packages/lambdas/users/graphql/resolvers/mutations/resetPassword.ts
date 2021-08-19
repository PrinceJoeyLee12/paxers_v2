import {
  IJwtPayload,
  ERequest,
  UserErrorMessage,
  UserSuccessMessage,
} from 'pxrs-schemas';
import { jwt as JWT, dynamodb, errorHandler } from 'pxrs-service-common';
import { userTableNameDev } from '../../../../constants';
import bcrypt from 'bcryptjs';

interface Response {
  message: string;
  status: number;
}

async function resetPassword(
  _: any,
  args: { input: { token: string; newPassword: string } }
): Promise<Response> {
  const {
    input: { token, newPassword },
  } = args;

  let response: Response = {
    message: UserSuccessMessage.SUCCESSFUL_PASSWORD_RESET,
    status: 200,
  };

  try {
    // 1. Check token and return decoded data
    const decodedData: IJwtPayload = await JWT.verify(
      token,
      process.env.SECRET_KEY,
      ERequest.APOLLO
    );
    const email: string = decodedData.user.email;

    // 2. Encrypt New Password
    const password: string = await bcrypt.hashSync(newPassword, 10);

    // 3. Update user's password
    const params = {
      TableName: userTableNameDev,
      Key: { email },
      ExpressionAttributeValues: {
        ':password': password,
        ':email': email,
      },
      ConditionExpression: 'email = :email',
      UpdateExpression: 'SET password = :password',
    };
    await dynamodb.updateItem(
      params,
      ERequest.APOLLO,
      UserErrorMessage.EMAIL_DONT_EXIST
    );

    return response;
  } catch (error) {
    console.log('Error: ', error);
    throw errorHandler.defaultApolloError();
  }
}

export default resetPassword;
