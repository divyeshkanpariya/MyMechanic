import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerDataService } from 'src/appServices/customer-data.service';

@Component({
  selector: 'app-garage-profile',
  templateUrl: './garage-profile.component.html',
  styleUrls: ['./garage-profile.component.css']
})
export class GarageProfileComponent {
  constructor(private router:Router,
    private activatedRoute:ActivatedRoute,
    private _customerDataService:CustomerDataService){

  }
  garageId:any;
  data:any;
  ratings = [1,2,3,4,5];
  ngOnInit(){
    this.activatedRoute.queryParamMap.subscribe(
      (res:any) => {
        this.garageId = res.params.id;
        this._customerDataService.getGarageDataByGarageId(Number(this.garageId)).subscribe(
          (res:any) => {
            this.data = res;
            console.log(this.data)
          }
        );
      }
    );
    
  }
  openGaragesPage(){
    this.router.navigateByUrl("customer/garages");
  }
}
