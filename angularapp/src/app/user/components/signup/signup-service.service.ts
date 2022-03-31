import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

 
  readonly baseURL1 ='http://localhost:33758/api/saveUser';
  readonly baseURL2 ='http://localhost:33758/api/saveAdmin';

  addUser(Obj:any){
    return this.http.post<any>(this.baseURL1,Obj);
   }

   addAdmin(Obj:any){
    return this.http.post<any>(this.baseURL2,Obj);
   }
}
