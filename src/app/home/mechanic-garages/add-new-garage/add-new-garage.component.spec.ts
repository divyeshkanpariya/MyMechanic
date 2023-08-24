import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewGarageComponent } from './add-new-garage.component';

describe('AddNewGarageComponent', () => {
  let component: AddNewGarageComponent;
  let fixture: ComponentFixture<AddNewGarageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewGarageComponent]
    });
    fixture = TestBed.createComponent(AddNewGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
