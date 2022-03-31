import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserComponent } from './user.component';
import { UserRoutingModule } from '../user-routing.module';
import {  FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './components/homepage/homepage.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    UserComponent,
    HomepageComponent,
    AppointmentComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class UserModule {
  
 }
