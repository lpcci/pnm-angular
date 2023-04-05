import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsDialogComponent } from './lists-dialog.component';

describe('ListsDialogComponent', () => {
  let component: ListsDialogComponent;
  let fixture: ComponentFixture<ListsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
