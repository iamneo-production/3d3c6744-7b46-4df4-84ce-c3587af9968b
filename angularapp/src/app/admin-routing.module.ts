import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AddcenterComponent } from './admin/components/addcenter/addcenter.component';
import { CenterprofileComponent } from './admin/components/centerprofile/centerprofile.component';


const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'addcenter', component: AddcenterComponent },
      { path: 'centerprofile', component: CenterprofileComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
