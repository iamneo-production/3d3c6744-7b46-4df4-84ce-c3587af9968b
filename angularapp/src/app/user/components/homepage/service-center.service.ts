import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceCenterModel } from './servicecentermodel';

@Injectable({
  providedIn: 'root'
})
export class ServiceCenterService {

  constructor(private http:HttpClient) { }

  readonly baseURL ='http://localhost:33758/api/ServiceCenter';

  list:ServiceCenterModel[];

 // Tokenpresent:any;
  getList(){
    this.http.get(this.baseURL)
    .toPromise()
    .then(res => this.list=res as ServiceCenterModel[]);
  }
  
}
