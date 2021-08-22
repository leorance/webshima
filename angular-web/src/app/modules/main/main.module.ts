import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CanditateComponent } from './pages/canditate/canditate.component';
import { RegisterComponent } from './pages/register/register.component';
import { PreEventComponent } from './pages/pre-event/pre-event.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { VerifyUserComponent } from './component/verify-user/verify-user.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { ElectionEventsComponent } from './component/election-events/election-events.component';
import { IntroductionComponent } from './component/introduction/introduction.component';
import { RemarksComponent } from './component/remarks/remarks.component';
import { OurTeamComponent } from './component/our-team/our-team.component';
import { TheWinnerComponent } from './pages/the-winner/the-winner.component';


@NgModule({
  declarations: [
    MainPageComponent,
    CanditateComponent,
    RegisterComponent,
    PreEventComponent,
    AboutUsComponent,
    VerifyUserComponent,
    ActivityComponent,
    ElectionEventsComponent,
    IntroductionComponent,
    RemarksComponent,
    OurTeamComponent,
    TheWinnerComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
