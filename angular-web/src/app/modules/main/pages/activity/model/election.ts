import { ElectionData } from './election-data';
import { User } from 'src/app/shared/models/user';

export interface Election {
  status: number;
  data: ElectionData;
  user: User;
}