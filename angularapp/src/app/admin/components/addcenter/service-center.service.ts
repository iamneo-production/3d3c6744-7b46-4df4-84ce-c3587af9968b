import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceCenterService {

  constructor(private http:HttpClient) { }

  readonly baseURL ='http://localhost:33758/api/ServiceCenter';

 addcenter(Obj:any){
    return this.http.post<any>(this.baseURL,Obj);
   }
}
