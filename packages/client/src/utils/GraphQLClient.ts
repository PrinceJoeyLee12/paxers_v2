import { GraphQLClient as GraphQLClientRequest } from 'graphql-request';
import { store } from '../store';
import { getLocalStorageItem } from './localStorage';
import { logout, invalidateSession } from '../modules/user/actions';
import { tokenSelector } from '../modules/user/selectors';

class GraphQLClient {
  private static token: string | null;
  private static client: any = null;

  private static RESPONSE_STATUSES = {
    NOT_AUTHORIZED: 403,
  };

  private static getToken(): string | boolean | object | null {
    const token =
      tokenSelector(store.getState()) || getLocalStorageItem('token');
    return token;
  }

  private static getClient() {
    const token: string | boolean | object | null = GraphQLClient.getToken();
    if (typeof token === null && !GraphQLClient.token && GraphQLClient.client) {
      // no token found, and no token before was set, but the client was initialized
      return GraphQLClient.client;
    }
    if (GraphQLClient.client && GraphQLClient.token === token) {
      // there is a client and the token didn't change
      return GraphQLClient.client;
    }

    GraphQLClient.token = token as string;
    const headers: { [key: string]: any } = {};
    if (token) {
      // set Authorization header only in case if token exists
      headers.authorization = `Bearer ${token}`;
    }

    const url: string = '/graphql';
    GraphQLClient.client = new GraphQLClientRequest(url, { headers });
    return GraphQLClient.client;
  }

  static async request(query: string, variables?: any) {
    const client = await GraphQLClient.getClient();
    if (!client) {
      throw new Error('GraphQLClient request method require client');
    }
    return (
      client
        .request(query, variables)
        // graphql response interceptor
        .catch((err: any) => {
          console.log(err); // TODO remove
          const status = err.response && err.response.status;
          if (status === GraphQLClient.RESPONSE_STATUSES.NOT_AUTHORIZED) {
            store.dispatch(invalidateSession());
            store.dispatch(logout());
          }
          err.primaryApplicationError =
            err.response && err.response.errors && err.response.errors[0];
          return Promise.reject(err);
        })
    );
  }
}

export default GraphQLClient.request;
