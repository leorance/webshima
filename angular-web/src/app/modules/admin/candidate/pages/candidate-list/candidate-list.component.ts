import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { CandidateData } from '../../model/candidateData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {
  candidateData: CandidateData[];

  isLoading = false;

  constructor(
    private candidateService: CandidateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCandidate();
  }

  async getCandidate() {
    this.isLoading = true;
    try {
      const response = await this.candidateService.allCandidate().toPromise();
      if (response && response.status && response.status === 200) {
        this.candidateData = response.data;
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
      this.isLoading = false;
    }
  }

  createCandidate() {
    this.router.navigate(['/admin/candidate/create']);
  }

  updateCandidate(id) {
    this.router.navigate(['admin/candidate/update/', id]);
  }

}
