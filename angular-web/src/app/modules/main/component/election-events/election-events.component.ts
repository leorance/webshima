import { Component, OnInit } from '@angular/core';
import { ElectionServiceService } from '../../pages/activity/services/election-service.service';
import { CandidateService } from 'src/app/modules/admin/candidate/services/candidate.service';
import { CandidateData } from 'src/app/modules/admin/candidate/model/candidateData';

@Component({
  selector: 'app-election-events',
  templateUrl: './election-events.component.html',
  styleUrls: ['./election-events.component.scss']
})
export class ElectionEventsComponent implements OnInit {
  onLoad = false;
  isVote = false;
  voteEnd: boolean;
  canVote: boolean;

  dateNow = new Date();
  startDate = new Date('2020-04-28 14:00:00');
  endDate = new Date('2020-04-28 15:00:00');
  candidateData: CandidateData[];

  constructor(
    private electionService: ElectionServiceService,
    private candidateService: CandidateService
  ) { }

  ngOnInit(): void {
    this.getCandidate().then(() => {
      this.isAlreadyVote().then(() => {
        if (this.dateNow > new Date('2020-04-28 14:00:00') && this.dateNow < new Date('2020-04-28 15:00:00')) {
          this.canVote = true;
        }

        if (this.dateNow > new Date('2020-04-28 15:00:00')) {
          this.voteEnd = true;
        }
      });
    });
  }

  async getCandidate() {
    this.onLoad = true;
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
      this.onLoad = false;
    }
  }

  async isAlreadyVote() {
    this.onLoad = true;
    try {
      const response = await this.electionService.checkVote().toPromise();
      if (response && response.status && response.status === 200) {
        this.isVote = false;
      } else {
        this.isVote = true;
      }
    } catch (error) {
      if (error && error.error && error.error.data) {
        this.isVote = true;
      } else {
        this.isVote = true;
        alert('Get Vote Failed. Try again later.');
      }
    } finally {
      this.onLoad = false;
    }
  }

  async onClickVote(vote: CandidateData) {
    if (window.confirm('Are you sure? Do you really want to vote paslon ' + vote.choose_number + '?')) {
      this.onLoad = true;
      try {
        const voteRequest = {
          candidate_id: vote.id
        };
        const response = await this.electionService.voting(voteRequest).toPromise();
        if (response && response.status && response.status === 200) {
          if (response.data && response.data.vote_id) {
            alert('Voting Success! Your choice for paslon ' + response.data.vote_id + ' will be countable. Thank you :)');
          } else {
            alert('Voting Success! Thank you :)');
          }
          this.isVote = true;
        } else {
          this.isVote = false;
        }
      } catch (error) {
        if (error && error.error && error.error.data) {
          this.isVote = false;
          alert('Voting Failed. ' + error.error.data);
        } else {
          this.isVote = false;
          alert('Voting Failed. Try again later.');
        }
      } finally {
        this.onLoad = false;
      }
    } else {
      console.log('click cancel');
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
