import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ProductModelService } from './product-model.service';
import { ProductModel } from './productmodel';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  public Obj = new ProductModel();
  l:ProductModel[];
  constructor(public service: ProductModelService,private router : Router,private p:LoginService) {
  }

  index:number=0;

  
 

  ngOnInit(): void {
    this.Obj.userId=this.p.get();
   
    this.service.getList(this.Obj.userId);
  }

  EditForm = new FormGroup({

    'enterProductName': new FormControl('', [Validators.required]),
    'enterModelNo': new FormControl('', [Validators.required]),
    'enterDateOfPurchase': new FormControl('', [Validators.required]),
    'enterContactNumber': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    'enterProblem': new FormControl('', [Validators.required]),
    'enterAvailableSlot': new FormControl('', [Validators.required]),
    'bookingDate': new FormControl('', [Validators.required])
  })

  get enterProductName() {
    return this.EditForm.get('enterProductName');
  }

  get enterModelNo() {
    return this.EditForm.get('enterModelNo');
  }

  get enterDateOfPurchase() {
    return this.EditForm.get('enterDateOfPurchase');
  }

  get enterContactNumber() {
    return this.EditForm.get('enterContactNumber');
  }

  get enterProblem() {
    return this.EditForm.get('enterProblem');
  }

  get enterAvailableSlot() {
    return this.EditForm.get('enterAvailableSlot');
  }

  get bookingDate() {
    return this.EditForm.get('bookingDate');
  }

  onDelete(id: number) {
    if (confirm('are you sure')) {
      this.service.deleteAppointment(id)
        .subscribe(
          res => {
            this.service.getList(this.Obj.userId);
          },
          err => { console.log(err); }
        )
    }
  }

  displayStyle = "none";

  servicecentername:any;
public id:number;
  openPopup(p:any) {
    this.displayStyle = "block";
    this.id=p.productID;
    this.EditForm.controls['enterProductName'].setValue(p.productName);
    this.EditForm.controls['enterModelNo'].setValue(p.productModelNo);
    this.EditForm.controls['enterDateOfPurchase'].setValue(p.dateOfPurchase);
    this.EditForm.controls['enterContactNumber'].setValue(p.contactNumber);
    this.EditForm.controls['enterProblem'].setValue(p.problemDescription);
    this.EditForm.controls['enterAvailableSlot'].setValue(p.availableSlots);
    this.EditForm.controls['bookingDate'].setValue(p.bookingDate);
    this.servicecentername=p.servicecentername;
  }

  closePopup(){
    this.displayStyle = "none";
  }

  
  Edit() {
    this.displayStyle = "none";
    this.Obj.productID=this.id;
    this.Obj.productName = this.EditForm.value.enterProductName;
    this.Obj.productModelNo = this.EditForm.value.enterModelNo;
    this.Obj.dateOfPurchase = this.EditForm.value.enterDateOfPurchase;
    this.Obj.contactNumber = this.EditForm.value.enterContactNumber;
    this.Obj.problemDescription = this.EditForm.value.enterProblem;
    this.Obj.availableSlots = this.EditForm.value.enterAvailableSlot;
    this.Obj.bookingDate = this.EditForm.value.bookingDate;
    this.Obj.servicecentername=this.servicecentername;
   
    this.service.update(this.Obj).subscribe(
      res=>{
        alert("Updated Sucessfully");
        this.EditForm.reset();
        this.service.getList(this.Obj.userId);
        
      },
      err =>{ 
       
        alert("Not Updated");
       console.log(err);
      
      }
    ); 
  }

  Logout(){
    localStorage.clear();
    this.router.navigate(['user/login']);
  }
}
