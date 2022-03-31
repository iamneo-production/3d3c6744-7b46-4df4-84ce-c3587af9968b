import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from './productmodel';


@Injectable({
  providedIn: 'root'
})
export class ProductModelService {
  constructor(private http:HttpClient) { }

  readonly baseURL ='http://localhost:33758/api/Appointment/';
  list:ProductModel[];

  update(Obj:any){
    
   return this.http.put<any>(this.baseURL+Obj.productID,Obj);
  }

  deleteAppointment(id:number){
    return this.http.delete(this.baseURL+id);
  }

  getList(id:number){
    this.http.get(this.baseURL+id)
    .toPromise()
    .then(res => this.list=res as ProductModel[]);
 // console.log(this.list);
  }
}
