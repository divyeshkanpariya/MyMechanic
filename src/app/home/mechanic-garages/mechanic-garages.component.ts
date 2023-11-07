import { NgFor, Time } from '@angular/common';
import { Inject,Component, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/appServices/authentication.service';
import { MechanicDataService } from 'src/appServices/mechanic-data.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDeleteComponent } from 'src/app/components/confirm-delete/confirm-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-mechanic-garages',
  templateUrl: './mechanic-garages.component.html',
  styleUrls: ['./mechanic-garages.component.css']
})

export class MechanicGaragesComponent {
  constructor(private _mechanicDataService:MechanicDataService,
    private _authService:AuthenticationService,
    public dialog: MatDialog,
    private snackbar:MatSnackBar){
      
    }
  
  displayedColumns = ['#', 'name', 'address', 'timings', 'ratings', 'services', 'status','actions']
  token = "";
  userId = 0;
  data!: GarageTable[];
  dataSource:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: any;
  ratings = [1,2,3,4,5];
  addNewGarage = false;
  activePage = "SHOWGARAGES"
  editData:any;
  deleteData:any;
  addPhotosdata:any;

  ngOnInit(){
    this._authService.userId.subscribe((res:any)=>{this.userId = res});

    this._authService.token.subscribe((res:any)=>{this.token = res});
    
    
    this.updateGarageData();
  }
  ngAfterViewInit(){
    console.log(this.sort)
    
  }

  updateGarageData(){
    this._mechanicDataService.getGarageData(this.userId).subscribe(
      (res:any) => {
        this.data = res;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
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

  confirmDelete(Id:any){
    this.deleteData = Id;
    const dialogRef =  this.dialog.open(ConfirmDeleteComponent,{
      data: "Would you like to delete "+ this.data[this.data.findIndex((obj)=> obj.id == Id)].name + " ?"
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log("delete");
        this._mechanicDataService.deleteGarage(Id).subscribe(
          (res:any) => {
            this.updateGarageData();
            this.snackbar.open('Garage Deleted Successfully!!', 'close', {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000,
            });
          },
          (err:any) => console.log(err)
        )
      }
    });
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
  notifyGarageUpdate(){
    this.snackbar.open('Garage Data Added/Updated !!', 'close', {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 3000,
    });
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