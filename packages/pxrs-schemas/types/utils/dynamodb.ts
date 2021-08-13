import { IBaseUseObject, IUserLoginObject } from '../user';
import { EDynamodbConditionExpression, EDynamoPrimaryKeys } from '../constants';

export interface IRegisterUserDynamodbParams {
  TableName: string;
  Item: IBaseUseObject;
  ConditionExpression: EDynamodbConditionExpression;
}

export interface IGetItemBaseDynamoParams {
  TableName: string;
  Key: any;
  ProjectionExpression?: string;
}
