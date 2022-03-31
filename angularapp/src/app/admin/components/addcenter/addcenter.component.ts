import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceCenterService } from './service-center.service';


import { ServiceCenterModel } from './ServiceCenterModel';


@Component({
  selector: 'app-addcenter',
  templateUrl: './addcenter.component.html',
  styleUrls: ['./addcenter.component.css']
})
export class AddcenterComponent implements OnInit {

  public Obj = new ServiceCenterModel();

  constructor(private router : Router,public service:ServiceCenterService) { }

  ngOnInit(): void {
  }

  AddCenterForm =new FormGroup({

    'addName' : new FormControl('',[Validators.required]),
    'addNumber': new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.maxLength(10)]  ),
    'addAddress' :  new FormControl('',[Validators.required]  ),
    'addImageUrl' :  new FormControl('',[Validators.required]),
    'addEmail' : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9]+[.+-_]{0,1}[a-zA-Z0-9]+[@][a-zA-Z]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3}){0,1}')]),
    'addContentDescription' : new FormControl('',[Validators.required])
    
  })

  Addcenter(){
 
    this.Obj.serviceCenterName = this.AddCenterForm.value.addName;
    this.Obj.serviceCenterPhone = this.AddCenterForm.value.addNumber;
    this.Obj.serviceCenterAddress = this.AddCenterForm.value.addAddress;
    this.Obj.serviceCenterImageUrl = this.AddCenterForm.value.addImageUrl;
    this.Obj.serviceCentermailId = this.AddCenterForm.value.addEmail;
    this.Obj.serviceCenterDescription = this.AddCenterForm.value.addContentDescription;
    
    

    this.service.addcenter(this.Obj).subscribe(
      res=>{
      alert("Center Added Successfully");
        this.AddCenterForm.reset();
      },
      err =>{ 
        alert("Center Not Added");
        console.log(err);
      }
    );
  
 
    }

  get addName(){
    return this.AddCenterForm.get('addName');
  }

  get addNumber(){
    return this.AddCenterForm.get('addNumber');
  }

  get addAddress(){
    return this.AddCenterForm.get('addAddress');
  }

  get addImageUrl(){
    return this.AddCenterForm.get('addImageUrl');
  }

  get addEmail(){
    return this.AddCenterForm.get('addEmail');
  }

  get addContentDescription(){
    return this.AddCenterForm.get('addContentDescription');
  }

}
