import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { GaragesListForCustomerComponent } from './home/garages-list-for-customer/garages-list-for-customer.component';
import { CustomerAppointmentsComponent } from './home/customer-appointments/customer-appointments.component';
import { CustomerServiceComponent } from './home/customer-service/customer-service.component';
import { ServiceHistoryComponent } from './home/service-history/service-history.component';
import { MechanicGaragesComponent } from './home/mechanic-garages/mechanic-garages.component';
import { MechanicAppointmentsComponent } from './home/mechanic-appointments/mechanic-appointments.component';
import { MechanicServiceQueueComponent } from './home/mechanic-service-queue/mechanic-service-queue.component';
import { GarageProfileComponent } from './home/garage-profile/garage-profile.component';

const routes: Routes = [
  {path:'Auth',component:AuthenticationComponent, children:[
    {path:'login', component:LoginComponent},
    {path:'register', component:RegistrationComponent}
  ]
  },
  {path:'',component:HomeComponent, children:[
    {path:'',component:DashboardComponent},
    {path:'customer/dashboard',component:DashboardComponent},
    {path:'customer/garages', children:[
      {path:'', component:GaragesListForCustomerComponent},
      {path:'garage-profile', component:GarageProfileComponent}
    ]},
    {path:'customer/appointments',component:CustomerAppointmentsComponent},
    {path:'customer/services',component:CustomerServiceComponent},
    {path:'customer/servicehistory',component:ServiceHistoryComponent},
    {path:'mechanic-garages', component:MechanicGaragesComponent},
    {path:'mechanic-appointments', component:MechanicAppointmentsComponent},
    {path:'mechanic-service-queue', component:MechanicServiceQueueComponent},
    
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
