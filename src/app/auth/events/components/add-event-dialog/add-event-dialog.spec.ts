import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEventDialog } from './add-event-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('AddEventDialog', () => {
  let component: AddEventDialog;
  let fixture: ComponentFixture<AddEventDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEventDialog],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEventDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
