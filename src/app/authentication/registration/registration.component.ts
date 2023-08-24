import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from 'src/appServices/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  @Output() login = new EventEmitter<string>();

  constructor(private _authService: AuthenticationService){}

  registrationForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    firstname: new FormControl('', [Validators.maxLength(20),Validators.minLength(1),Validators.required]),
    lastname: new FormControl('', [Validators.maxLength(20),Validators.minLength(1), Validators.required]),
    mobilenumber: new FormControl('',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
    password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
    role: new FormControl('',Validators.required)
  })
  hide=true;
  onLogin(){
    
    console.log(this.registrationForm.value)
    const data = this.registrationForm.value;
    // data.mobilenumber = data.mobilenumber?.substring(data.mobilenumber.length-10,data.mobilenumber.length);
    console.log(data)
    this.registerUser(this.registrationForm.value)
  }
  registerUser(data: any){
    this._authService.registerNewUser(data).subscribe(
      (res:any) => {
        if(res.email == "Email is already Used"){
          alert("Email is already used!!\nPlease try with other Email")
        }else if(res.email == "Mobile Number is already Used"){
          alert("Mobile Number is already used!!\nPlease try with other Mobile Number")
        }else {
          this.login.emit("register")
        }
        console.log(res)
      },
      (err:any) => console.log(err)
    );
    
  }

  openLogin(){
    this.login.emit("register")
  }
}
