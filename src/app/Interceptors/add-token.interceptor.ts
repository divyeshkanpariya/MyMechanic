import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/appServices/authentication.service';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private _authService:AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._authService.token.getValue();

    if(token == ""){
      return next.handle(request);
    }
    const req1 = request.clone({
      headers: request.headers.set('Authorization','Bearer '+token)
    })
    return next.handle(req1);
  }
}
