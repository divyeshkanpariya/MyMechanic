import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }
  
  isUserAuthenticated = new BehaviorSubject<boolean>(false);
  userId = new BehaviorSubject(0);
  role = new BehaviorSubject("");
  token = new BehaviorSubject("");
  firstname = new BehaviorSubject("");
  lastname = new BehaviorSubject("");
  userEmail = new BehaviorSubject("");

  registerNewUser(user:any){
    return this.http.post("https://localhost:7241/api/Auth/register",user);
  }

  varifyLoginDetails(user:any){
    return this.http.post("https://localhost:7241/api/Auth/login",user);
  }
}
