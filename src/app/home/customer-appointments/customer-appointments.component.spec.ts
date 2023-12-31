import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAppointmentsComponent } from './customer-appointments.component';

describe('CustomerAppointmentsComponent', () => {
  let component: CustomerAppointmentsComponent;
  let fixture: ComponentFixture<CustomerAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAppointmentsComponent]
    });
    fixture = TestBed.createComponent(CustomerAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
