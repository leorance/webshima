import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { constants } from 'src/app/shared/common/constants';
import { CandidateService } from '../../services/candidate.service';
import { CandidateData } from '../../model/candidateData';

@Component({
  selector: 'app-candidate-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.scss']
})
export class CandidateCreateComponent implements OnInit {
  createCandidateForm: FormGroup;

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
    return this.createCandidateForm.get('name_pres');
  }

  get motto_pres() {
    return this.createCandidateForm.get('motto_pres');
  }

  get name_vicepres() {
    return this.createCandidateForm.get('name_vicepres');
  }

  get motto_vicepres() {
    return this.createCandidateForm.get('motto_vicepres');
  }

  get vision() {
    return this.createCandidateForm.get('vision');
  }

  get mission() {
    return this.createCandidateForm.get('mission');
  }

  get photo_pres() {
    return this.createCandidateForm.get('photo_pres');
  }

  get photo_vicepres() {
    return this.createCandidateForm.get('photo_vicepres');
  }

  get status() {
    return this.createCandidateForm.get('status');
  }

  get choose_number() {
    return this.createCandidateForm.get('choose_number');
  }

  constructor(
    private router: Router,
    private candidateService: CandidateService
  ) { }

  ngOnInit(): void {
    this.createCandidateForm = new FormGroup({
      name_pres: new FormControl('', Validators.required),
      motto_pres: new FormControl('', Validators.required),
      name_vicepres: new FormControl('', Validators.required),
      motto_vicepres: new FormControl('', Validators.required),
      vision: new FormControl('', Validators.required),
      mission: new FormControl('', Validators.required),
      photo_pres: new FormControl('', Validators.required),
      photo_vicepres: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      choose_number: new FormControl('', Validators.required)
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

  async save() {
    this.onSubmittingForm = true;
    try {
      const createCandidateRequest: CandidateData = {
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
      const response = await this.candidateService.createCandidate(createCandidateRequest).toPromise();
      if (response && response.status && response.status === 200) {
        alert('Create Candidate Success!');
        this.router.navigate(['/admin/candidate']);
      } else {
        alert('Create Candidate Failed. Try again later');
      }
    } catch (error) {
      if (error && error.error && error.error.data) {
        alert('Create Candidate Failed. ' + error.error.data);
      } else {
        alert('Create Candidate Failed. Try again later.');
      }
    } finally {
      this.onSubmittingForm = false;
    }
  }
}
