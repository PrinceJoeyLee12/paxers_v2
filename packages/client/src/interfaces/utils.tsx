import { User } from './user';

export interface HandleResponseProps {
  msg: string | undefined | unknown;
  status: number | undefined | unknown;
  errors: User | undefined | unknown;
}
