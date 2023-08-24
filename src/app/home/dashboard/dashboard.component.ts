import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent {
  cardDetails=[
    {
      'title': 'Total Appointments',
      'value': '6',
      'img': '../assets/total-appointments.jpg'
    },
    {
      'title': 'Completed Appointments',
      'value': '2',
      'img': '../assets/completed-appointments.jpg'
    },
    {
      'title': 'Pending Appointments',
      'value': '4',
      'img': '../assets/pending-appointments.jpg'
    }
  ];
  customerAointmentClms = ['appointmentId', 'carDetails', 'garageDetails', 'status'];
  customerApointmens:customerApointment[] = [
    {
      'appointmentId':1,
      'carDetails':'sds ds dsd sadad',
      'garageDetails':'d ad adas ds a',
      'status':'pending'
    },
    {
      'appointmentId':1,
      'carDetails':'ada da dad sads d asd a',
      'garageDetails':'sdada dsa dasdasda ',
      'status':'comleted'
    },
    {
      'appointmentId':1,
      'carDetails':' adasd ad as das d asda',
      'garageDetails':'adsdad s ds adsd sadasd',
      'status':'pending'
    }
  ];
}

export interface customerApointment {
  appointmentId: number;
  carDetails: string;
  garageDetails: string;
  status: string;
}