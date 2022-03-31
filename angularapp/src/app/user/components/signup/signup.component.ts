import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from './signup-service.service';
import { UserModel } from './signupmodel';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public service:SignupService,private router:Router) { }

  public Obj = new UserModel();

  ngOnInit(): void {
  }

  v1:string='';

  f(val:string){

    this.v1=val;
  }

  SignupForm =new FormGroup({

    'userRole' : new FormControl('',[Validators.required]),
    'email': new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9]+[.+-_]{0,1}[a-zA-Z0-9]+[@][a-zA-Z]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3}){0,1}')]),
    'username' :  new FormControl('',[Validators.required]),
    'mobileNumber' :  new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.maxLength(10)]),
    'password' : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9]{8,}')]),
    'ConfirmPassword' : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9]{8,}')])
  })
  



  get userRole(){
    return this.SignupForm.get('userRole');
  }

  get email(){
    return this.SignupForm.get('email');
  }

  get username(){
    return this.SignupForm.get('username');
  }

  get mobileNumber(){
    return this.SignupForm.get('mobileNumber');
  }

  get password(){
    return this.SignupForm.get('password');
  }
  
  get ConfirmPassword(){
    return this.SignupForm.get('ConfirmPassword');
  }



  submit(){
    

    this.Obj.userRole = this.SignupForm.value.userRole;
    this.Obj.email = this.SignupForm.value.email;
    this.Obj.username = this.SignupForm.value.username;
    this.Obj.mobileNumber = this.SignupForm.value.mobileNumber;
    this.Obj.password = this.SignupForm.value.password;
    
    
    if(this.v1=='user'){
      this.service.addUser(this.Obj).subscribe(
        res=>{
          this.SignupForm.reset();
          alert("User Signup Sucessful");
          this.router.navigate(['user/login']);
        },
        err=>{
          alert("User Signup Not Sucessful");
          this.SignupForm.reset();
          console.log(err);
        }
      );
       }
       else{
         this.service.addAdmin(this.Obj).subscribe(
           res=>{
            this.SignupForm.reset();
            alert("Admin Signup Sucessful");
           },
           err=>{
            alert("Admin Signup Not Sucessful");
            this.SignupForm.reset();
             console.log(err);
            }
         );
       }

 
    }
 
}
