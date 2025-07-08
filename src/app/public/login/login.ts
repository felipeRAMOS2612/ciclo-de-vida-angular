import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage';
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
export class Login {
  private storageService = inject(StorageService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  onSubmit(): void {
    if (this.isLoading) return;

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

    setTimeout(() => {
      const users = this.storageService.getUsers();
      const user = users.find(u => 
        u.email.toLowerCase() === this.email.toLowerCase() && 
        u.password === this.password
      );

      if (user) {
        this.storageService.setCurrentUser(user);
        
        this.showSuccess(`¡Bienvenido, ${user.name}!`);
        
        setTimeout(() => {
          this.router.navigate(['/auth/dashboard']);
        }, 1000);
      } else {
        this.showError('Credenciales incorrectas. Verifica tu email y contraseña');
      }
      
      this.isLoading = false;
    }, 500);
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 40000,
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