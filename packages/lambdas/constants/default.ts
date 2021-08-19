export const sqsBaseUrl = `https://sqs.${process.env.REGION}.amazonaws.com/${process.env.ACCOUNTID}`;

// Dynamo Table Names
export const userTableNameDev = `${process.env.SERVICE}-${process.env.DYNAMODB_USERTABLE}-${process.env.STAGE}`;

// Queue (SQS) Names
export const UserSqsUrl = `${sqsBaseUrl}/${process.env.SERVICE}-${process.env.SQS_EMAIL_SENDER}-${process.env.STAGE}`;
