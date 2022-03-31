import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ServiceCenterModel } from '../homepage/servicecentermodel';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../login/login.service';
import { SharedService } from '../shared/shared.service';
import { AddAppointmentService } from './add-appointment.service';
import { ProductModel } from './productmodel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public Obj1 = new ServiceCenterModel();
  userId: any;

  constructor(private router : Router,public service:AddAppointmentService,
    public service1:SharedService,public s1:LoginService) { }

  ngOnInit(): void {

    this.userId=this.s1.get();
   this.Obj1= this.service1.get();
   //console.log(this.Obj1);
  }

  public Obj = new ProductModel();
  
  AddAppointmentForm =new FormGroup({

    'enterProductName' : new FormControl('',[Validators.required]),
    'enterModelNo': new FormControl('',[Validators.required]  ),
    'enterDateOfPurchase' :  new FormControl('',[Validators.required]  ),
    'enterContactNumber' :  new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    'enterProblem' : new FormControl('',[Validators.required]),
    'enterAvailableSlot' : new FormControl('',[Validators.required]),
    'bookingDate': new FormControl('',[Validators.required])
  })

  
  get enterProductName(){
    return this.AddAppointmentForm.get('enterProductName');
  }

  get enterModelNo(){
    return this.AddAppointmentForm.get('enterModelNo');
  }

  get enterDateOfPurchase(){
    return this.AddAppointmentForm.get('enterDateOfPurchase');
  }

  get enterContactNumber(){
    return this.AddAppointmentForm.get('enterContactNumber');
  }

  get enterProblem(){
    return this.AddAppointmentForm.get('enterProblem');
  }

  get enterAvailableSlot(){
    return this.AddAppointmentForm.get('enterAvailableSlot');
  }

  get bookingDate(){
    return this.AddAppointmentForm.get('bookingDate');
  }

 AddAppointment(){
    
    this.Obj.productName = this.AddAppointmentForm.value.enterProductName;
    this.Obj.productModelNo = this.AddAppointmentForm.value.enterModelNo;
    this.Obj.dateOfPurchase = this.AddAppointmentForm.value.enterDateOfPurchase;
    this.Obj.contactNumber = this.AddAppointmentForm.value.enterContactNumber;
    this.Obj.problemDescription = this.AddAppointmentForm.value.enterProblem;
    this.Obj.availableSlots = this.AddAppointmentForm.value.enterAvailableSlot;
    this.Obj.bookingDate = this.AddAppointmentForm.value.bookingDate;
    this.Obj.servicecentername=this.Obj1.serviceCenterName;
    this.Obj.userId=this.userId;
   
    this.service.AddAppointment(this.Obj).subscribe(
      res=>{
        alert("Appointment added Successfully");
        this.AddAppointmentForm.reset();
        //this.router.navigate(['user/appointment']);
      },
      err =>{ 
        alert("Appointment not added");
        this.AddAppointmentForm.reset();
     console.log(err);
      
      }
    );
  }

  Logout(){
    localStorage.clear();
    this.router.navigate(['user/login']);
  }
}
