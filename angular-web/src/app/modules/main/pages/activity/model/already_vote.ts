import { AlreadyVoteData } from './already_vote_data';
import { User } from 'src/app/shared/models/user';

export interface AlreadyVote {
  status?: number;
  data?: AlreadyVoteData;
  user?: User;
}
