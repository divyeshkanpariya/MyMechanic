import { Component, Input ,ViewChild,ElementRef } from '@angular/core';
import { MechanicDataService } from 'src/appServices/mechanic-data.service';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-garage-photos',
  templateUrl: './add-garage-photos.component.html',
  styleUrls: ['./add-garage-photos.component.css']
})
export class AddGaragePhotosComponent {

  constructor(private _mechanicDataService:MechanicDataService,
    private snackbar: MatSnackBar){}
  @ViewChild('imageInput') imageInput:any;
  @Input() data: any;
  
  previews: string[] = [];
  selectedFiles: File[] = [];
  selectedFileNames: string[] = [];
  GaragePhotoData:any = [];

  ngOnInit(){
    this.updateGaragePhotos();
  }

  updateGaragePhotos(){
    this._mechanicDataService.GetGaragePhotos(this.data.id,this.data.userID).subscribe(
      (res:any) => {
        this.GaragePhotoData = res;
        console.log(res)
      }
    );
  }
  selectFiles(event: any): void {
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }
  uploadFiles(){
    this._mechanicDataService.addGaragePhotos(this.selectedFiles,this.data.id,this.data.userID).then(
      (res:any) => {
        this.selectedFileNames = [];
        this.selectedFiles = [];
        this.previews = [];
        this.updateGaragePhotos();
        this.imageInput.nativeElement.value = "";
        this.snackbar.open('Uploaded Successfully!!', 'close', {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
        });
      },
    )
  }
  deletePhoto(Id:number){
    this._mechanicDataService.DeleteGaragePhoto(this.data.id,Id).subscribe(
      (res:any) => {
        this.updateGaragePhotos();
        this.snackbar.open('Deleted Successfully!!', 'close', {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000,
        });
      }
    )
  }
}
