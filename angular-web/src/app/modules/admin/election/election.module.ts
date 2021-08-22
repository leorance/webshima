import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectionRoutingModule } from './election-routing.module';
import { ElectionCountComponent } from './pages/election-count/election-count.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ElectionCountComponent],
  imports: [
    CommonModule,
    ElectionRoutingModule,
    SharedModule
  ]
})
export class ElectionModule { }
