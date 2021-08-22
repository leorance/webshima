import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateListComponent } from './pages/candidate-list/candidate-list.component';
import { CandidateCreateComponent } from './pages/candidate-create/candidate-create.component';
import { CandidateUpdateComponent } from './pages/candidate-update/candidate-update.component';


const routes: Routes = [
  {
    path: '',
    component: CandidateListComponent,
    data: {
      title: 'Candidate'
    }
  },
  {
    path: 'create',
    component: CandidateCreateComponent,
    data: {
      title: 'Create Candidate'
    }
  },
  {
    path: 'update/:id',
    component: CandidateUpdateComponent,
    data: {
      title: 'Update Candidate'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
