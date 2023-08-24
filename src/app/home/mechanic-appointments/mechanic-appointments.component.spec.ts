import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicAppointmentsComponent } from './mechanic-appointments.component';

describe('MechanicAppointmentsComponent', () => {
  let component: MechanicAppointmentsComponent;
  let fixture: ComponentFixture<MechanicAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MechanicAppointmentsComponent]
    });
    fixture = TestBed.createComponent(MechanicAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
