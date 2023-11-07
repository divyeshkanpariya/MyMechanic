import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { AuthenticationService } from 'src/appServices/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { GaragesListForCustomerComponent } from './home/garages-list-for-customer/garages-list-for-customer.component';
import { CustomerAppointmentsComponent } from './home/customer-appointments/customer-appointments.component';
import { CustomerServiceComponent } from './home/customer-service/customer-service.component';
import { ServiceHistoryComponent } from './home/service-history/service-history.component';
import { MechanicGaragesComponent } from './home/mechanic-garages/mechanic-garages.component';
import { MechanicAppointmentsComponent } from './home/mechanic-appointments/mechanic-appointments.component';
import { MechanicServiceQueueComponent } from './home/mechanic-service-queue/mechanic-service-queue.component';
import { AddTokenInterceptor } from './Interceptors/add-token.interceptor';
import { AddNewGarageComponent } from './home/mechanic-garages/add-new-garage/add-new-garage.component';
import { AddGaragePhotosComponent } from './home/mechanic-garages/add-garage-photos/add-garage-photos.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { GarageProfileComponent } from './home/garage-profile/garage-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    DashboardComponent,
    GaragesListForCustomerComponent,
    CustomerAppointmentsComponent,
    CustomerServiceComponent,
    ServiceHistoryComponent,
    MechanicGaragesComponent,
    MechanicAppointmentsComponent,
    MechanicServiceQueueComponent,
    AddNewGarageComponent,
    AddGaragePhotosComponent,
    ConfirmDeleteComponent,
    GarageProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
  ],
  providers: [
    AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
