import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidateList } from '../model/candidateList';
import { CandidateData } from '../model/candidateData';
import { Candidate } from '../model/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  candidateListApiUrl = environment.apiUrl + 'activecandidate';
  createCandidateApiUrl = environment.apiUrl + 'addcandidate';
  allCandidateApiUrl = environment.apiUrl + 'allcandidate';
  candidateByIdApiUrl = environment.apiUrl + 'candidateid';
  updateCandidateApiUrl = environment.apiUrl + 'candidateupdate';

  constructor(
    private httpClient: HttpClient
  ) { }

  allCandidate(): Observable<CandidateList> {
    return this.httpClient.get<CandidateList>(this.allCandidateApiUrl);
  }

  candidate(data): Observable<CandidateList> {
    return this.httpClient.get<CandidateList>(this.candidateListApiUrl);
  }

  candidateById(data): Observable<Candidate> {
    return this.httpClient.post<Candidate>(this.candidateByIdApiUrl, data);
  }

  createCandidate(data: CandidateData): Observable<Candidate> {
    return this.httpClient.post<Candidate>(this.createCandidateApiUrl, data);
  }

  updateCandidate(data: CandidateData): Observable<Candidate> {
    return this.httpClient.post<Candidate>(this.updateCandidateApiUrl, data);
  }
}
