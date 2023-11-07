import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageProfileComponent } from './garage-profile.component';

describe('GarageProfileComponent', () => {
  let component: GarageProfileComponent;
  let fixture: ComponentFixture<GarageProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GarageProfileComponent]
    });
    fixture = TestBed.createComponent(GarageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
