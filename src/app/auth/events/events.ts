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
import { StorageService } from '../../shared/services/storage';
import { Event } from '../../shared/types/event.type';

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
  ],
  templateUrl: './events.html',
  styleUrls: ['./events.scss']
})
export class Events implements OnInit {
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);
  private storageService = inject(StorageService);
  
  events: Event[] = [];
  eventCount: number = 0;
  mostFrequentCategory: string = 'Ninguna';

  ngOnInit() {
    this.loadUserEvents();
    this.updateStats();
  }

  private loadUserEvents(): void {
    const currentUser = this.storageService.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      this.events = [];
      return;
    }
    if (currentUser) {
      this.events = this.storageService.getEventsByUser(currentUser.id);
    } else {
      this.events = [];
    }
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
          return;
        }

        const newEvent: Event = {
          userId: currentUser.id!,
          title: result.title,
          date: result.date,
          category: result.category,
          color: result.color,
        };
        
        this.storageService.saveEvent(newEvent);
        
        // Recargar events del usuario
        this.loadUserEvents();
        
        setTimeout(() => {
          this.updateStats();
          this.cdr.markForCheck();
        }, 0);
        
        console.log('Evento agregado:', newEvent);
      }
    });
  }

  private generateNewId(): number {
    const allEvents = this.storageService.getEvents();
    return allEvents.length > 0 ? Math.max(...allEvents.map(e => e.id!)) + 1 : 1;
  }

  deleteEvent(event: Event): void {
    console.log('Eliminar evento:', event);
    
    // Eliminar usando el servicio
    this.storageService.deleteEvent(event.id!);
    
    // Recargar events del usuario
    this.loadUserEvents();
    
    setTimeout(() => {
      this.updateStats();
      this.cdr.markForCheck();
    }, 0);
  }

  editEvent(event: Event): void {
    console.log('Editar evento:', event);
    // Aquí podrías abrir un diálogo para editar el evento
    // Similar al de agregar pero pre-poblado con los datos del evento
  }
}