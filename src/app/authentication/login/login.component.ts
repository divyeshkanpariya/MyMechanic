import { Component, EventEmitter, Output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import { AuthenticationService } from 'src/appServices/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _authService:AuthenticationService, private _cookieService: CookieService){}
  @Output() register = new EventEmitter<string>();
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')])
  })
  onLogin(){
    console.log(this.loginForm.value);
    this._authService.varifyLoginDetails(this.loginForm.value).subscribe(
      (res: any) => {
        console.log(res);

        if(res.token != null || res.token != ""){

          this._authService.isUserAuthenticated.next(true);
          this._authService.userId.next(res.id);
          this._authService.token.next(res.token);
          this._authService.firstname.next(res.firstname);
          this._authService.lastname.next(res.lastname);
          this._authService.userEmail.next(res.email);
          this._authService.role.next(res.role);

          this._cookieService.set('userId',res.id,1);
          this._cookieService.set('token',res.token,1);
          this._cookieService.set('userEmail',res.email,1);
          this._cookieService.set('firstname', res.firstName,1);
          this._cookieService.set('lastname',res.lastName,1);
          this._cookieService.set('role', res.role,1);
        }
        

      }
    )
    
  }

  OpenRegistration(){
    console.log("reg")
    this.register.emit("register")
  }
}
