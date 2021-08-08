import { ApolloError } from 'apollo-server-errors';
import { EApolloCustomErrors } from 'pxrs-schemas';

export class JWTError extends ApolloError {
  constructor(message: string) {
    super(message, EApolloCustomErrors.INTERNAL_SERVER_ERROR);
    Object.defineProperty(this, 'name', { value: 'JWTError' });
  }
}
