import { User } from 'src/app/shared/models/user';
import { Token } from './token';

export interface Login {
  status?: number;
  data?: Token;
  user?: User;
}
