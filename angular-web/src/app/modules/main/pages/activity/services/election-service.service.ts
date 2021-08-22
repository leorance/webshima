import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Election } from '../model/election';
import { AlreadyVote } from '../model/already_vote';

@Injectable({
  providedIn: 'root'
})
export class ElectionServiceService {
  voteApiUrl = environment.apiUrl + 'voting';
  checkVoteApiUrl = environment.apiUrl + 'check-vote';

  constructor(
    private httpClient: HttpClient
  ) { }

  checkVote(): Observable<AlreadyVote> {
    return this.httpClient.get<AlreadyVote>(this.checkVoteApiUrl);
  }

  voting(data): Observable<Election> {
    return this.httpClient.post<Election>(this.voteApiUrl, data);
  }
}
