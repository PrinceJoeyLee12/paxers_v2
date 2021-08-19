import { EDynamodbConditionExpression, EDynamoPrimaryKeys } from '../constants';

export interface IDynamodbParams {
  TableName: string;
  Item: any;
  ConditionExpression?: string;
  ProjectionExpression?: string;
}
