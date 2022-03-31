import { Injectable } from '@angular/core';
import { ServiceCenterModel } from '../homepage/servicecentermodel';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public Obj = new ServiceCenterModel();
  constructor() { }

  set(d:any){
    this.Obj=d;
  }
  

  get(){
    return this.Obj;
  }
}
