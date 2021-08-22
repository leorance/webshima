import { CountData } from './countData';
import { User } from 'src/app/shared/models/user';

export interface Count {
  status: number;
  data: CountData[];
  user: User;
}
