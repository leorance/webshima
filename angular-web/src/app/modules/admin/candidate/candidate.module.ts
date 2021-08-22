import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateListComponent } from './pages/candidate-list/candidate-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CandidateCreateComponent } from './pages/candidate-create/candidate-create.component';
import { CandidateUpdateComponent } from './pages/candidate-update/candidate-update.component';


@NgModule({
  declarations: [CandidateListComponent, CandidateCreateComponent, CandidateUpdateComponent],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    SharedModule
  ]
})
export class CandidateModule { }
