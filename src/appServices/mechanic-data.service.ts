import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MechanicDataService {

  constructor(private httpClient: HttpClient) { }

  getGarageData(mechanicId:number){
    return this.httpClient.get("https://localhost:7241/api/Garage/GetGarageDetails?MechanicId="+ mechanicId);
  }

  getCities(){
    return this.httpClient.get("https://localhost:7241/api/Common/GetAllCities");
  }

  getStates(){
    return this.httpClient.get("https://localhost:7241/api/Common/GetAllStates");
  }

  getServiceTypes(){
    return this.httpClient.get("https://localhost:7241/api/Common/GetAllServiceTypes");
  }

  addEditGarage(data:any){
    return this.httpClient.post("https://localhost:7241/api/Garage/AddEditGarage",data);
  }

  addGaragePhotos(data:File[],GarageId:number,UserId:number): Promise<any>{
    const formData = new FormData();
    for(var i=0;i<data.length;i++){
      formData.append('Files', data[i], data[i].name);
    }

    return this.httpClient.post("https://localhost:7241/api/Garage/AddGaragePhotos?GarageId="+GarageId +"&UserId="+UserId,formData).toPromise();
  }

  GetGaragePhotos(GarageId:number,UserId:number){
    return this.httpClient.get("https://localhost:7241/api/Garage/GetGaragePhotos?GarageId="+GarageId +"&UserId="+UserId);
  }

  DeleteGaragePhoto(GarageId:number,GaragePhotoId:number){
    return this.httpClient.delete("https://localhost:7241/api/Garage/DeleteGaragePhotos?GarageId="+GarageId +"&GaragePhotoId="+GaragePhotoId);
  }
}
