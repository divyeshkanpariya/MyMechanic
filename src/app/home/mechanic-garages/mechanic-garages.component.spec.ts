import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicGaragesComponent } from './mechanic-garages.component';

describe('MechanicGaragesComponent', () => {
  let component: MechanicGaragesComponent;
  let fixture: ComponentFixture<MechanicGaragesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MechanicGaragesComponent]
    });
    fixture = TestBed.createComponent(MechanicGaragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
