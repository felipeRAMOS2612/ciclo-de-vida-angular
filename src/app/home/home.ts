import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, CommonModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  
}
