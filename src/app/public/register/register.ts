import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage';
import { User } from '../../shared/types/user.type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class Register {
  name: string = '';
  email: string = '';
  password: string = '';
  therapistId: string = '';
  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  onSubmit(): void {
    const existingUser = this.storageService.getUsers().find(u => u.email === this.email);

    if (existingUser) {
      alert('This email is already registered.');
      return;
    }

    const newUser: User = {
      id: Date.now(),
      name: this.name,
      email: this.email,
      password: this.password,
      therapistId: this.therapistId,
    };

    this.storageService.saveUser(newUser);
    this.storageService.setCurrentUser(newUser);
    this.router.navigate(['/']);
  }
}
