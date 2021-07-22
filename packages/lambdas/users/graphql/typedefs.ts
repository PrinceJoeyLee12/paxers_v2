import { gql } from 'apollo-server-lambda';
import {
  UserLoginInput,
  UserRegisterInput,
  UserMutations,
  UserObject,
  UserQueries,
  UserResponseObject,
} from 'pxrs-graphql-queries';

const typeDefStrings = [
  UserLoginInput,
  UserRegisterInput,
  UserMutations,
  UserObject,
  UserQueries,
  UserResponseObject,
];

const typeDefs = typeDefStrings.map((typeDef) => gql(typeDef));

export default typeDefs;
