import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CanditateComponent } from './pages/canditate/canditate.component';
import { RegisterComponent } from './pages/register/register.component';
import { PreEventComponent } from './pages/pre-event/pre-event.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TheWinnerComponent } from './pages/the-winner/the-winner.component';


const routes: Routes = [
  {
    path: 'intro',
    component: MainPageComponent,
    data: {
      title: 'Intro'
    }
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: {
      title: 'About Us'
    }
  },
  {
    path: 'candidate',
    component: CanditateComponent,
    data: {
      title: 'Candidate'
    }
  },
  {
    path: 'winner',
    component: TheWinnerComponent,
    data: {
      title: 'The Winner'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register'
    }
  },
  {
    path: 'pre-event',
    component: PreEventComponent,
    data: {
      title: 'Pre-Event'
    }
  },
  {
    path: 'activity',
    component: ActivityComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Activity'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
