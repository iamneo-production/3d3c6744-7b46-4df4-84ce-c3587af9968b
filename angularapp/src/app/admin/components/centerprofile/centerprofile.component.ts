import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceCenterService } from './service-center.service';
import { ServiceCenterModel } from './servicecentermodel';


@Component({
  selector: 'app-centerprofile',
  templateUrl: './centerprofile.component.html',
  styleUrls: ['./centerprofile.component.css']
})
export class CenterprofileComponent implements OnInit {

  constructor(public service: ServiceCenterService) { }

  ngOnInit(): void {
    this.service.getList();
  }

  public Obj = new ServiceCenterModel();

  EditForm =new FormGroup({

    'editName' : new FormControl('',[Validators.required]),
    'editNumber': new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]  ),
    'editAddress' :  new FormControl('',[Validators.required]  ),
    'editImageUrl' :  new FormControl('',[Validators.required]),
    'editEmail' : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9]+[.+-_]{0,1}[a-zA-Z0-9]+[@][a-zA-Z]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3}){0,1}')]),
    'editContentDescription' : new FormControl('',[Validators.required])
    
  })

  get editName(){
    return this.EditForm.get('editName');
  }

  get editNumber(){
    return this.EditForm.get('editNumber');
  }

  get editAddress(){
    return this.EditForm.get('editAddress');
  }

  get editImageUrl(){
    return this.EditForm.get('editImageUrl');
  }

  get editEmail(){
    return this.EditForm.get('editEmail');
  }

  get editContentDescription(){
    return this.EditForm.get('editContentDescription');
  }

  displayStyle = "none";


  public id:number;
  openPopup(p:any) {
    this.displayStyle = "block";
    this.id=p.serviceCenterID;
    this.EditForm.controls['editName'].setValue(p.serviceCenterName);
    this.EditForm.controls['editNumber'].setValue(p.serviceCenterPhone);
    this.EditForm.controls['editAddress'].setValue(p.serviceCenterAddress);
    this.EditForm.controls['editImageUrl'].setValue(p.serviceCenterImageUrl);
    this.EditForm.controls['editEmail'].setValue(p.serviceCentermailId);
    this.EditForm.controls['editContentDescription'].setValue(p.serviceCenterDescription);
  }

  closePopup(){
    this.displayStyle = "none";
  }



  deletecenter(id: number) {
    if (confirm('are you sure')) {
      this.service.deletecenter(id)
        .subscribe(
          res => {
            this.service.getList();
          },
          err => { console.log(err); }
        )
    }
  }

  Edit() {
    this.displayStyle = "none";
   this.Obj.serviceCenterID=this.id;

    this.Obj.serviceCenterName = this.EditForm.value.editName;
    this.Obj.serviceCenterPhone = this.EditForm.value.editNumber;
    this.Obj.serviceCenterAddress = this.EditForm.value.editAddress;
    this.Obj.serviceCenterImageUrl = this.EditForm.value.editImageUrl;
    this.Obj.serviceCentermailId = this.EditForm.value.editEmail;
    this.Obj.serviceCenterDescription = this.EditForm.value.editContentDescription;

    this.service.update(this.Obj).subscribe(
      res=>{
        alert("Updated Sucessfully");
        this.EditForm.reset();
        this.service.getList();
      },
      err =>{ 
        alert("Not Updated");
       console.log(err);
      
      }
    );
    
  }

}
