import { CandidateData } from './candidateData';
import { User } from 'src/app/shared/models/user';

export interface Candidate {
  status?: number;
  data?: CandidateData;
  user?: User;
}
