import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { ServiceCenterService } from './service-center.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router : Router,public service: ServiceCenterService,public service1: SharedService) 
  { 
  }

  ngOnInit(): void {
    this.service.getList();
  }

  select_center(data:any){
    this.service1.set(data);
    this.router.navigate(['user/dashboard']);
  }

  Logout(){
    localStorage.clear();
    this.router.navigate(['user/login']);
  }
}
