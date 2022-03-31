import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AddcenterComponent } from './components/addcenter/addcenter.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from '../admin-routing.module';
import { CenterprofileComponent } from './components/centerprofile/centerprofile.component';



@NgModule({
  declarations: [
    AdminComponent,
    AddcenterComponent,
    CenterprofileComponent

  ],
  imports: [
    CommonModule,
   AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
