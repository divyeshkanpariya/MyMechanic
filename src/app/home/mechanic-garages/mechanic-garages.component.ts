import { NgFor, Time } from '@angular/common';
import { Inject,Component, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/appServices/authentication.service';
import { MechanicDataService } from 'src/appServices/mechanic-data.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mechanic-garages',
  templateUrl: './mechanic-garages.component.html',
  styleUrls: ['./mechanic-garages.component.css']
})

export class MechanicGaragesComponent {
  constructor(private _mechanicDataService:MechanicDataService,
    private _authService:AuthenticationService,
    public dialog: MatDialog){}
  
  displayedColumns = ['#', 'name', 'address', 'timings', 'ratings', 'services', 'status','actions']
  token = "";
  userId = 0;
  data!: GarageTable[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ratings = [1,2,3,4,5];
  addNewGarage = false;
  activePage = "SHOWGARAGES"
  editData:any;
  addPhotosdata:any;

  ngOnInit(){
    this._authService.userId.subscribe((res:any)=>{this.userId = res});

    this._authService.token.subscribe((res:any)=>{this.token = res});
    
    this._mechanicDataService.getGarageData(this.userId).subscribe(
      (res:any) => {
        this.data = res;
      }
    )
  }

  openServices(Id:any){
    this.dialog.open(GarageServicesDialog, {
      data: this.data[this.data.findIndex((obj)=> obj.id == Id)].availableServices,
    });
  }

  editGarage(id:any){
    this.activePage = "ADDGARAGE";
    this.editData = this.data[this.data.findIndex((val)=> val.id==id)];
    this.addNewGarage = true;
  }

  addGaragePhotos(id:any){
    this.activePage = "ADDGARAGEPHOTOS";
    this.addPhotosdata = {
      id:id,
      userID:this.userId
    }
  }

  openAddNewGarage(){
    this.activePage = "ADDGARAGE";
    this.addNewGarage = true;
  }
  closeAddNewGarage(){
    this.activePage = "SHOWGARAGES";
    this.addNewGarage = false;
    this.editData = null;
  }
}

export interface GarageTable {
  id: number;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  state: string;
  startingTime: Time;
  endingTime: Time;
  ratings: number;
  extraDescription: string;
  status: string;
  availableServices: AvailService[];
}

export interface AvailService {
  id: number;
  garageId: number;
  serviceTypeId: number;
  serviceType: string;
  price: number;
}
@Component({
  selector: 'garage-service-dialog',
  templateUrl: 'garage-services-dialog.html',
  styleUrls: ['./mechanic-garages.component.css'],
  standalone: true,
  imports: [MatDialogModule,NgFor,MatTableModule,MatButtonModule],
})
export class GarageServicesDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  dialogColumns = ['serviceType','price'];
}