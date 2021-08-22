import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'candidate',
    loadChildren: () => import('./candidate/candidate.module').then(m => m.CandidateModule),
    data: {
      title: 'Candidate'
    }
  },
  {
    path: 'election',
    loadChildren: () => import('./election/election.module').then(m => m.ElectionModule),
    data: {
      title: 'Election'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
