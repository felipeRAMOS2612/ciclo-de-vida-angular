import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CycleVisualizer } from './components/cycle-visualizer/cycle-visualizer';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialog } from './components/add-event-dialog/add-event-dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { StorageService } from '../../shared/services/storage.service';
import { DataService } from '../../shared/services/api.service';
import { Event } from '../../shared/types/event.type';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CycleVisualizer, 
    MatIconModule, 
    MatCardModule, 
    MatListModule, 
    CommonModule, 
    MatFormFieldModule, 
    MatSelectModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './events.html',
  styleUrls: ['./events.scss']
})
export class Events implements OnInit {
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);
  private storageService = inject(StorageService);
  private dataService = inject(DataService);
  private snackBar = inject(MatSnackBar);
  
  events: Event[] = [];
  eventCount: number = 0;
  mostFrequentCategory: string = 'Ninguna';
  isLoading: boolean = false;

  ngOnInit() {
    this.loadUserEvents();
  }

  loadUserEvents(): void {
    const currentUser = this.storageService.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      this.events = [];
      this.updateStats();
      return;
    }

    this.isLoading = true;
    this.dataService.getEventsByUser(currentUser.id).subscribe({
      next: (events) => {
        this.events = events;
        this.updateStats();
        this.isLoading = false;
        console.log('Eventos del usuario cargados:', events);
      },
      error: (error) => {
        console.error('Error cargando eventos del usuario:', error);
        this.showError('Error al cargar los eventos');
        this.events = [];
        this.updateStats();
        this.isLoading = false;
      }
    });
  }

  private updateStats(): void {
    this.eventCount = this.events.length;
    
    if (this.events.length === 0) {
      this.mostFrequentCategory = 'Ninguna';
      return;
    }
    
    const categoryCount: { [key: string]: number } = {};
    this.events.forEach(event => {
      categoryCount[event.category] = (categoryCount[event.category] || 0) + 1;
    });
    
    this.mostFrequentCategory = Object.keys(categoryCount).reduce((a, b) => 
      categoryCount[a] > categoryCount[b] ? a : b
    );
  }

  openAddEventDialog(): void {
    const dialogRef = this.dialog.open(AddEventDialog, {
      width: '100%',
      maxHeight: '90vh',
      maxWidth: '500px',
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const currentUser = this.storageService.getCurrentUser();
        if (!currentUser) {
          console.error('No hay usuario autenticado');
          this.showError('No hay usuario autenticado');
          return;
        }

        // Mostrar mensaje informativo ya que los eventos se obtienen de GitHub
        this.showInfo('Funcionalidad de agregar eventos próximamente disponible');
        
        // Nota: En una implementación real, aquí harías una petición POST
        // para agregar el evento a tu backend/API
        console.log('Evento que se agregaría:', {
          userId: currentUser.id,
          title: result.title,
          date: result.date,
          category: result.category,
          color: result.color,
        });
      }
    });
  }

  deleteEvent(event: Event): void {
    // Mostrar mensaje informativo ya que los eventos se obtienen de GitHub
    this.showInfo('Funcionalidad de eliminar eventos próximamente disponible');
    
    // Nota: En una implementación real, aquí harías una petición DELETE
    // para eliminar el evento de tu backend/API
    console.log('Evento que se eliminaría:', event);
  }

  editEvent(event: Event): void {
    // Mostrar mensaje informativo ya que los eventos se obtienen de GitHub
    this.showInfo('Funcionalidad de editar eventos próximamente disponible');
    
    // Nota: En una implementación real, aquí harías una petición PUT
    // para actualizar el evento en tu backend/API
    console.log('Evento que se editaría:', event);
  }

  refreshEvents(): void {
    this.loadUserEvents();
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  private showInfo(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['info-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}