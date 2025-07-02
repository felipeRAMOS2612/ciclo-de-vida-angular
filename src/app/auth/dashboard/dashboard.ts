import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Inspirations {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  recomendaciones: Inspirations[] = [
    {
      id: 1,
      title: '¿No te sientes motivado?',
      content: 'Te recomiendo escribir a diario al final del día, aunque sea una línea. Te ayudará a reflexionar sobre tu día y a encontrar motivación en las pequeñas cosas.'
    },
    {
      id: 2,
      title: 'Consejo del día',
      content: 'Recuerda respirar profundo antes de tomar decisiones importantes. Te ayudará a calmarte y a pensar con claridad.'
    },
    {
      id: 3,
      title: 'Actividad física',
      content: 'Caminar 10 minutos al día puede ayudarte a mejorar tu estado de ánimo.'
    }
  ];
}
