import { DynamoDB } from 'aws-sdk';
import { default as dynamoError } from '../errorHandling/dynamoDbErrors';
import { IDynamodbParams, ERequest } from 'pxrs-schemas';

export const getItem = async (
  params: any,
  requestType: ERequest,
  messageOnError?: string
): Promise<any> => {
  const dynamodb = new DynamoDB.DocumentClient();
  await dynamodb.get(params, (err: any, data: any) => {
    if (!err) return data;
    else {
      console.log('Error: ', err);
      throw dynamoError(
        err.code,
        requestType,
        messageOnError ? messageOnError : 'Cannot get Item from database'
      );
    }
  });
};

export const putItem = async (
  params: any,
  requestType: ERequest,
  messageOnError?: string
): Promise<any> => {
  const dynamodb = new DynamoDB.DocumentClient();
  console.log('Params', params);
  await dynamodb.put(params, (err: any, data: any) => {
    console.log('ERR || DATA', err || data);
    if (!err) return data;
    else {
      console.log('Error ni: ', err);
      throw dynamoError(
        err.code,
        requestType,
        messageOnError ? messageOnError : 'Cannot get Item from database'
      );
    }
  });
};

export const updateItem = async (
  params: any,
  requestType: ERequest,
  messageOnError?: string
): Promise<any> => {
  const dynamodb = new DynamoDB.DocumentClient();
  await dynamodb.update(params, (err: any, data: any) => {
    if (!err) return data;
    else {
      console.log('Error: ', err);
      throw dynamoError(
        err.code,
        requestType,
        messageOnError ? messageOnError : 'Cannot get Item from database'
      );
    }
  });
};
