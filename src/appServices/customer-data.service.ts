import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  constructor(private httpClient: HttpClient) { }

  getGarageData(){
    return this.httpClient.get("https://localhost:7241/api/Garage/GetGarageDataForCustomer");
  }
  getGarageDataByGarageId(id:number){
    return this.httpClient.get("https://localhost:7241/api/Garage/GetGarageDataByGarageId?GarageId="+id);
  }

}
