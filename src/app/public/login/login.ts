import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { DataService } from '../../shared/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  private storageService = inject(StorageService);
  private dataService = inject(DataService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  isLoadingData: boolean = true;

  ngOnInit(): void {
    if (this.storageService.isAuthenticated()) {
      this.router.navigate(['/auth/dashboard']);
      return;
    }

    this.checkApiAvailability();
  }

  private checkApiAvailability(): void {
    this.isLoadingData = true;
    this.dataService.loadInitialData().subscribe({
      next: (data) => {
        console.log('API disponible, datos cargados:', data);
        this.isLoadingData = false;
      },
      error: (error) => {
        console.error('Error verificando disponibilidad de API:', error);
        this.showError('Error al conectar con el servidor');
        this.isLoadingData = false;
      }
    });
  }

  onSubmit(): void {
    if (this.isLoading || this.isLoadingData) return;

    if (!this.email || !this.password) {
      this.showError('Por favor, completa todos los campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.showError('Por favor, ingresa un email válido');
      return;
    }

    this.isLoading = true;

    // Autenticar usuario consultando la API de GitHub
    this.dataService.authenticateUser(this.email, this.password).subscribe({
      next: (user) => {
        if (user) {
          // Solo guardar el usuario actual en localStorage
          this.storageService.setCurrentUser(user);
          
          this.showSuccess(`¡Bienvenido, ${user.name}!`);
          
          setTimeout(() => {
            this.router.navigate(['/auth/dashboard']);
          }, 1000);
        } else {
          this.showError('Credenciales incorrectas. Verifica tu email y contraseña');
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error en autenticación:', error);
        this.showError('Error al verificar las credenciales. Intenta nuevamente.');
        this.isLoading = false;
      }
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}