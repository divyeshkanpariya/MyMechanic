import { Component, Input ,ViewChild,ElementRef } from '@angular/core';
import { MechanicDataService } from 'src/appServices/mechanic-data.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-garage-photos',
  templateUrl: './add-garage-photos.component.html',
  styleUrls: ['./add-garage-photos.component.css']
})
export class AddGaragePhotosComponent {

  constructor(private _mechanicDataService:MechanicDataService){}
  @ViewChild('imageInput') imageInput:ElementRef | undefined;
  @Input() data: any;
  previews: string[] = [];
  selectedFiles: File[] = [];
  selectedFileNames: string[] = [];
  GaragePhotoData:any = [];

  ngOnInit(){
    console.log(this.data)
    this._mechanicDataService.GetGaragePhotos(this.data.id,this.data.userID).subscribe(
      (res:any) => {
        console.log("Photos: ",res);
        this.GaragePhotoData = res;
        
      }
    )
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
          // console.log(e.target.result);
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
        console.log(res);
        this.selectedFileNames = [];
        this.selectedFiles = [];
        this.previews = [];
      },
    )
  }
  deletePhoto(Id:number){
    this._mechanicDataService.DeleteGaragePhoto(this.data.id,Id).subscribe(
      (res:any) => {console.log(res)}
    )
  }
}
