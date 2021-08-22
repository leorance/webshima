import { Component, OnInit } from '@angular/core';
import { CandidateData } from 'src/app/modules/admin/candidate/model/candidateData';
import { CandidateService } from 'src/app/modules/admin/candidate/services/candidate.service';

@Component({
  selector: 'app-the-winner',
  templateUrl: './the-winner.component.html',
  styleUrls: ['./the-winner.component.scss']
})
export class TheWinnerComponent implements OnInit {
  candidateData: CandidateData[];

  loading = false;


  constructor(
    private candidateService: CandidateService
  ) { }

  ngOnInit(): void {
    this.getCandidate();
  }

  async getCandidate() {
    this.loading = true;
    try {
      const candidateRequest = {
        status: true
      };
      this.candidateService.candidate(candidateRequest).toPromise();
      const response = await this.candidateService.candidate(candidateRequest).toPromise();
      if (response && response.status && response.status === 200) {
        this.candidateData = response.data.sort(this.compareValues('choose_number'));
      } else {
        alert('Get Candidate Failed. Try again later.');
      }
    } catch (error) {
      if (error && error.error && error.error.data) {
        alert('Get Candidate Failed. ' + error.error.data);
      } else {
        alert('Get Candidate Failed. Try again later.');
      }
    } finally {
      this.loading = false;
    }
  }

  // function that used to order array of object
  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

}
