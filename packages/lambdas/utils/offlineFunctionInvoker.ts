import { Lambda } from 'aws-sdk';

const lambda = new Lambda({
  apiVersion: '2031',
  // endpoint needs to be set only if it deviates from the default, e.g. in a dev environment
  // process.env.SOME_VARIABLE could be set in e.g. serverless.yml for provider.environment or function.environment
  endpoint: process.env.IS_OFFLINE
    ? 'http://localhost:3002'
    : 'https://lambda.ap-southeast-1.amazonaws.com',
});
