import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../shared/types/event.type';

export interface EventCategory {
  value: string;
  label: string;
  color: string;
}

@Component({
  selector: 'app-add-event-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-event-dialog.html',
  styleUrls: ['./add-event-dialog.scss'],
})
export class AddEventDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddEventDialog>);
  
  eventForm: FormGroup;
  
  categories: EventCategory[] = [
    { value: 'personal', label: 'Personal', color: '#f44336' },
    { value: 'trabajo', label: 'Trabajo', color: '#ff9800' },
    { value: 'viaje', label: 'Viaje', color: '#3f51b5' },
    { value: 'salud', label: 'Salud', color: '#4caf50' },
    { value: 'familia', label: 'Familia', color: '#e91e63' },
    { value: 'estudio', label: 'Estudio', color: '#9c27b0' },
    { value: 'deporte', label: 'Deporte', color: '#ff5722' },
    { value: 'otros', label: 'Otros', color: '#607d8b' }
  ];

  constructor() {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      date: ['', Validators.required],
      category: ['', Validators.required],
      description: ['']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const selectedCategory = this.categories.find(cat => cat.value === formValue.category);
      
      const dateString = formValue.date instanceof Date 
        ? formValue.date.toISOString().split('T')[0] 
        : formValue.date;
      
      const newEvent: Partial<Event> = {
        title: formValue.title,
        date: dateString, // Asegurar que sea string
        category: formValue.category,
        color: selectedCategory?.color || '#607d8b',
      };

      this.dialogRef.close(newEvent);
    }
  }
}