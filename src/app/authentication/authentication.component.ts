import { Component } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  authPage = "login";

  openRegitsration(event:string){
    console.log("register")
    this.authPage = "register";
  }

  openLogin(event:string){
    this.authPage = "login"
  }
}
