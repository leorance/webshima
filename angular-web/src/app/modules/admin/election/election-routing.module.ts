import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectionCountComponent } from './pages/election-count/election-count.component';


const routes: Routes = [
  {
    path: '',
    component: ElectionCountComponent,
    data: {
      title: 'Election'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectionRoutingModule { }
