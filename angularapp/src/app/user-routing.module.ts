import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/components/login/login.component';
import { SignupComponent } from './user/components/signup/signup.component';

import { HomepageComponent } from './user/components/homepage/homepage.component';
import { AppointmentComponent } from './user/components/appointment/appointment.component';
import { DashboardComponent } from './user/components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  {
    path: 'user', component: UserComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {path: 'homepage', component: HomepageComponent,canActivate: [AuthGuard]},
      {path: 'appointment', component: AppointmentComponent,canActivate: [AuthGuard]},
      {path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
