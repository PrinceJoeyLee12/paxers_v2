import { gql } from 'apollo-server-lambda';
import {
  UserInput,
  UserMutations,
  UserObject,
  UserQueries,
  UserResponseObject,
} from 'pxrs-graphql-queries';

const typeDefStrings = [
  UserInput,
  UserMutations,
  UserObject,
  UserQueries,
  UserResponseObject,
];

const typeDefs = typeDefStrings.map((typeDef) => gql(typeDef));

export default typeDefs;
