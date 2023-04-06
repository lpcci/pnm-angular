import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesDialogComponent } from './vehicles-dialog.component';

describe('VehiclesDialogComponent', () => {
  let component: VehiclesDialogComponent;
  let fixture: ComponentFixture<VehiclesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
