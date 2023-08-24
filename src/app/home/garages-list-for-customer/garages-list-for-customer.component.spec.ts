import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaragesListForCustomerComponent } from './garages-list-for-customer.component';

describe('GaragesListForCustomerComponent', () => {
  let component: GaragesListForCustomerComponent;
  let fixture: ComponentFixture<GaragesListForCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GaragesListForCustomerComponent]
    });
    fixture = TestBed.createComponent(GaragesListForCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
