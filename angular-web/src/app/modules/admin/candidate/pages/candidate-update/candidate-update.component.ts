import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { constants } from 'src/app/shared/common/constants';
import { CandidateData } from '../../model/candidateData';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-candidate-update',
  templateUrl: './candidate-update.component.html',
  styleUrls: ['./candidate-update.component.scss']
})
export class CandidateUpdateComponent implements OnInit {
  updateCandidateForm: FormGroup;
  candidateData: CandidateData;

  loading = false;
  onSubmittingForm = false;
  tinyMceSettings = constants.tinyMceSettings;
  constants = constants;
  statusData = [
    {
      id: constants.candidateStatus.active,
      value: 'Active'
    },
    {
      id: constants.candidateStatus.inactive,
      value: 'Inactive'
    }
  ];

  numberData = ['1', '2', '3'];

  photoPresUrl: any;
  photoVicePresUrl: any;

  get name_pres() {
    return this.updateCandidateForm.get('name_pres');
  }

  get motto_pres() {
    return this.updateCandidateForm.get('motto_pres');
  }

  get name_vicepres() {
    return this.updateCandidateForm.get('name_vicepres');
  }

  get motto_vicepres() {
    return this.updateCandidateForm.get('motto_vicepres');
  }

  get vision() {
    return this.updateCandidateForm.get('vision');
  }

  get mission() {
    return this.updateCandidateForm.get('mission');
  }

  get photo_pres() {
    return this.updateCandidateForm.get('photo_pres');
  }

  get photo_vicepres() {
    return this.updateCandidateForm.get('photo_vicepres');
  }

  get status() {
    return this.updateCandidateForm.get('status');
  }

  get choose_number() {
    return this.updateCandidateForm.get('choose_number');
  }

  constructor(
    private router: Router,
    private candidateService: CandidateService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.updateCandidateForm = new FormGroup({
      name_pres: new FormControl('', Validators.required),
      motto_pres: new FormControl('', Validators.required),
      name_vicepres: new FormControl('', Validators.required),
      motto_vicepres: new FormControl('', Validators.required),
      vision: new FormControl('', Validators.required),
      mission: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      choose_number: new FormControl('', Validators.required)
    });

    this.getCandidateById().then(() => {
      this.updateCandidateForm.patchValue({
        name_pres: this.candidateData.name_pres,
        motto_pres: this.candidateData.motto_pres,
        name_vicepres: this.candidateData.name_vicepres,
        motto_vicepres: this.candidateData.motto_vicepres,
        vision: this.candidateData.vision,
        mission: this.candidateData.mission,
        status: this.candidateData.status,
        choose_number: this.candidateData.choose_number
      });
      this.photoPresUrl = this.candidateData.photo_pres;
      this.photoVicePresUrl = this.candidateData.photo_vicepres;
      this.loading = false;
    });
  }

  goBack() {
    this.router.navigate(['/admin/candidate']);
  }

  onFileSelected(event, flag) {
    const file = event.target.files[0];
    if (file.type.match('image.*')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (evt: any) => {
        if (evt.target.readyState === FileReader.DONE) {
          if (flag === constants.photoFlag.photoPres) {
            this.photoPresUrl = evt.target.result;
          } else if (flag === constants.photoFlag.photoVicePres) {
            this.photoVicePresUrl = evt.target.result;
          }
        }
      };
    }
  }

  async getCandidateById() {
    this.loading = true;
    try {
      const candidateByIdRequest = {
        id: this.route.snapshot.params['id']
      };
      const response = await this.candidateService.candidateById(candidateByIdRequest).toPromise();
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
    }
  }

  async save() {
    this.onSubmittingForm = true;
    try {
      const updateCandidateRequest: CandidateData = {
        id: this.route.snapshot.params['id'],
        choose_number: this.choose_number.value,
        name_pres: this.name_pres.value,
        name_vicepres: this.name_vicepres.value,
        vision: this.vision.value,
        mission: this.mission.value,
        motto_pres: this.motto_pres.value,
        motto_vicepres: this.motto_vicepres.value,
        status: Number(this.status.value),
        photo_pres: this.photoPresUrl,
        photo_vicepres: this.photoVicePresUrl
      };
      const response = await this.candidateService.updateCandidate(updateCandidateRequest).toPromise();
      if (response && response.status && response.status === 200) {
        alert('Update Candidate Success!');
        this.router.navigate(['/admin/candidate']);
      } else {
        alert('Update Candidate Failed. Try again later');
      }
    } catch (error) {
      if (error && error.error && error.error.data) {
        alert('Update Candidate Failed. ' + error.error.data);
      } else {
        alert('Update Candidate Failed. Try again later.');
      }
    } finally {
      this.onSubmittingForm = false;
    }
  }

}
