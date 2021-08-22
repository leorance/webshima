import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Count } from '../models/count';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  countApiUrl = environment.apiUrl + 'count';

  constructor(
    private httpClient: HttpClient
  ) { }

  count(data?): Observable<Count> {
    return this.httpClient.post<Count>(this.countApiUrl, data);
  }
}
