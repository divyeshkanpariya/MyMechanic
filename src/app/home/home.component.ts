import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaMatcher, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthenticationService } from 'src/appServices/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  role: any;
  constructor(changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private _authService: AuthenticationService,
    private _cookieService: CookieService) 
    {

      this.mobileQuery = media.matchMedia('(max-width: 768px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit() {
    this._authService.role.subscribe(
      (res: any) => { this.role = res; }
    )
  }

  logout() {
    this._cookieService.deleteAll();
    this._authService.isUserAuthenticated.next(false);
    this._authService.userId.next(0);
    this._authService.role.next("");
    this._authService.userEmail.next("");
    this._authService.firstname.next("");
    this._authService.lastname.next("");
    this._authService.token.next("");
  }
  // isSideMode(): boolean {
  //   return this.breakpointObserver.isMatched('(min-width: 768px)');
  // }
}
