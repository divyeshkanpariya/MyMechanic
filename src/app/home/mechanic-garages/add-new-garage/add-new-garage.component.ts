import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MechanicDataService } from 'src/appServices/mechanic-data.service';
import { map } from 'rxjs/operators'
import { AuthenticationService } from 'src/appServices/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-garage',
  templateUrl: './add-new-garage.component.html',
  styleUrls: ['./add-new-garage.component.css']
})
export class AddNewGarageComponent {

  constructor(private _mechanicDataService: MechanicDataService,
    private _authService: AuthenticationService,
    private fb: FormBuilder,
    private snackbar:MatSnackBar) { }

  addNewGarageForm = new FormGroup({
    id: new FormControl(0),
    userId: new FormControl(0),
    name: new FormControl('', [Validators.maxLength(20), Validators.minLength(4), Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    city: new FormControl({ value: '', disabled: true }, Validators.required),
    state: new FormControl('', Validators.required),
    postalCode: new FormControl('', [Validators.maxLength(6), Validators.minLength(6), Validators.required, Validators.pattern('[0-9]{6}')]),
    startingTime: new FormControl('', Validators.required),
    endingTime: new FormControl('', Validators.required),
    extraDescription: new FormControl(''),
    charges: this.fb.array([
      this.fb.group({
        chargeId: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required)
      })
    ]),

  })

  @Input() data: any;
  @Output() backToGarageDetails= new EventEmitter<any>();
  states!: any;
  allCities!: any;
  cities!: any;
  allServiceTypes!: any;
  serviceTypes!: any;

  ngOnInit() {
    console.log(this.data)
    if(this.data){
      this.setEditGarageValues(this.data);
    }
    
    this._mechanicDataService.getCities().subscribe(
      (res: any) => {
        this.allCities = this.cities = res;
      }
    );
    this._mechanicDataService.getStates().subscribe(
      (res: any) => {
        this.states = res;
      }
    );
    this._mechanicDataService.getServiceTypes().subscribe(
      (res: any) => {
        this.allServiceTypes = this.serviceTypes = res;
      }
    )
    this.addNewGarageForm.controls.state.valueChanges.subscribe((state) => {
      console.log("x")
      this.addNewGarageForm.controls.city.reset();
      this.addNewGarageForm.controls.city.disable();
      if (state) {
        console.log(state)
        this.setCityByCountry(state);
        this.addNewGarageForm.controls.city.enable();
      }
    }
    )
  }

  addNewCharges() {
    if (this.addNewGarageForm.controls.charges.valid) {
      if (this.hasDuplicate(this.addNewGarageForm.controls.charges.value)) {
        alert("You cannot add two prices for one service !!");
        return;
      }
      const newCharge = this.fb.group({
        chargeId: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required)
      });
      this.addNewGarageForm.controls.charges.push(newCharge);
    }
  }

  removeservice(index:any){
    this.addNewGarageForm.controls.charges.removeAt(index)
  }

  setCityByCountry(state: any) {
    this.cities = this.allCities.filter((city: any) => city.stateId == state)
  }

  onsubmit() {
    console.log(this.addNewGarageForm);
    if(this.addNewGarageForm.controls.startingTime.value?.length == 5)
      this.addNewGarageForm.controls.startingTime.patchValue(this.addNewGarageForm.controls.startingTime.value+':00');
    if(this.addNewGarageForm.controls.endingTime.value?.length == 5)
      this.addNewGarageForm.controls.endingTime.patchValue(this.addNewGarageForm.controls.endingTime.value+':00');
    this.addNewGarageForm.controls.userId.patchValue(this._authService.userId.getValue());  
    
    this._mechanicDataService.addEditGarage(this.addNewGarageForm.value).subscribe(
        (res:any) => {
          this.backToGarageDetails.emit();
        },
        (err:any) => console.log("Error : ", err)
    )

  }

  hasDuplicate(arr: any) {
    const idMap = new Map<number, number>();

    for (const obj of arr) {
      if (idMap.has(obj.chargeId)) {
        return true;
      }
      idMap.set(obj.chargeId, 1);
    }
    return false;
  }

  setEditGarageValues(data:any){
    this.addNewGarageForm.patchValue(data);
    this.addNewGarageForm.controls.state.patchValue(data.stateId);
    this.addNewGarageForm.controls.city.patchValue(data.cityId);
    this.addNewGarageForm.controls.city.enable();

    const services = data.availableServices.map((item:any) => ({
      chargeId: item.serviceTypeId,
      price: item.price
    }));
    if(services.length == 0){
      const newCharge = this.fb.group({
        chargeId: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required)
      });
      this.addNewGarageForm.controls.charges.push(newCharge);
    }else{
      data.availableServices.forEach((element:any) => {
        const newCharge = this.fb.group({
          chargeId: new FormControl('', Validators.required),
          price: new FormControl('', Validators.required)
        });
        this.addNewGarageForm.controls.charges.push(newCharge);
      });
    }

    this.addNewGarageForm.controls.charges.removeAt(length-1);
    this.addNewGarageForm.controls.charges.patchValue(services);
  }
}
