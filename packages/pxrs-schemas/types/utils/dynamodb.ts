import { IUserRegistrationObject, IUserLoginObject } from '../user';
import { EDynamodbConditionExpression } from '../constants';

export interface IRegisterUserDynamodbParams {
  TableName: string;
  Item: IUserRegistrationObject;
  ConditionExpression: EDynamodbConditionExpression;
}

export interface ILoginUserDynamodbParams {
  TableName: string;
  Key: {
    email: string;
  };
}
