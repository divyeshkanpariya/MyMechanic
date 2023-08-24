import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGaragePhotosComponent } from './add-garage-photos.component';

describe('AddGaragePhotosComponent', () => {
  let component: AddGaragePhotosComponent;
  let fixture: ComponentFixture<AddGaragePhotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddGaragePhotosComponent]
    });
    fixture = TestBed.createComponent(AddGaragePhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
