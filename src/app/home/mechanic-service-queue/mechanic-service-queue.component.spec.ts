import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicServiceQueueComponent } from './mechanic-service-queue.component';

describe('MechanicServiceQueueComponent', () => {
  let component: MechanicServiceQueueComponent;
  let fixture: ComponentFixture<MechanicServiceQueueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MechanicServiceQueueComponent]
    });
    fixture = TestBed.createComponent(MechanicServiceQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
