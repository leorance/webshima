import { CandidateData } from './candidateData';
import { User } from 'src/app/shared/models/user';

export interface CandidateList {
  status?: number;
  data?: CandidateData[];
  user?: User;
}
