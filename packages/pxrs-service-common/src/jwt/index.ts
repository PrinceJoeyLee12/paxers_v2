import { IJwtPayload, ERequest } from 'pxrs-schemas';
import jwt from 'jsonwebtoken';
import { JWTError } from '../errorHandling';

export const sign = async (
  payload: IJwtPayload,
  secret: string,
  expiresTime: { expiresIn: string },
  requestType: ERequest
): Promise<string> => {
  return new Promise((resolve) => {
    jwt.sign(payload, secret, expiresTime, (err: any, token: string) => {
      if (err && requestType === ERequest.APOLLO)
        throw new JWTError('Cannot create token for now');
      resolve(token);
    });
  });
};
