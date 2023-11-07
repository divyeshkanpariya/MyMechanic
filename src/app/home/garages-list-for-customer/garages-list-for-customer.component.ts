import { Component } from '@angular/core';
import { CustomerDataService } from 'src/appServices/customer-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-garages-list-for-customer',
  templateUrl: './garages-list-for-customer.component.html',
  styleUrls: ['./garages-list-for-customer.component.css']
})
export class GaragesListForCustomerComponent {
  constructor(private _customerDataService:CustomerDataService,
    private router: Router){ }
  garageData:any;

  ngOnInit(){
    this._customerDataService.getGarageData().subscribe(
      (res:any)=> {
        this.garageData = res;
      },
    )
  }

  openProfile(id:number){
    this.router.navigateByUrl('customer/garages/garage-profile?id='+id);
  }
}
