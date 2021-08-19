import { IJwtPayload, ERequest } from 'pxrs-schemas';
import jwt from 'jsonwebtoken';
import * as apolloError from '../errorHandling/apolloErrors';

export const sign = async (
  payload: IJwtPayload,
  secret: string,
  expiresTime: { expiresIn: string },
  requestType: ERequest
): Promise<string> => {
  return new Promise((resolve) => {
    jwt.sign(payload, secret, expiresTime, (err: any, token: string) => {
      if (err && requestType === ERequest.APOLLO)
        throw apolloError.internalServerError('Internal Server error');
      resolve(token);
    });
  });
};

export const verify = async (
  token: string,
  secret: string,
  requestType: ERequest
): Promise<IJwtPayload> => {
  return new Promise((resolve) => {
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err && requestType === ERequest.APOLLO)
        throw apolloError.jwtExpired();
      resolve(decoded);
    });
  });
};
