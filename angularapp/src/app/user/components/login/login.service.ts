import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  readonly baseURL ='http://localhost:33758/api/isUserPresent';

  isLoggedInToken:any;
  login(Obj:any){
    return this.http.post(this.baseURL,Obj);
   }

   uid:any;
   set(id:any){
    this.uid=id;
     
   }
   get(){
     return this.uid;
   }


}
