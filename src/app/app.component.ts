import { Component } from '@angular/core';
import { AuthenticationService } from 'src/appServices/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _authService:AuthenticationService,private _cookieService:CookieService){}
  title = 'MyMechanic';
  currPage = 'login';
  isAuthenticaticatedUser = false;
  ngOnInit(){
    if(this._cookieService.get('token')){
      this._authService.isUserAuthenticated.next(true);
      this._authService.userId.next(Number(this._cookieService.get('userId')));
      this._authService.token.next(this._cookieService.get('token'));
      this._authService.role.next(this._cookieService.get('role'));
      this._authService.firstname.next(this._cookieService.get('firstname'));
      this._authService.lastname.next(this._cookieService.get('lastname'));
      this._authService.userEmail.next(this._cookieService.get('userEmail'));
      

    }else {
      
    }
    
    this._authService.isUserAuthenticated.subscribe(
      (res:any) => {
        this.isAuthenticaticatedUser = res;
      }
    )
  }

}
