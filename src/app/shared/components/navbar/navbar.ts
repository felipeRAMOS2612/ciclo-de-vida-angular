import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { StorageService } from '../../services/storage';
import { User } from '../../types/user.type';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class Navbar implements OnInit {
    currentUser: User | null = null;
    loginUrl: string = '/login';
    registerUrl: string = '/register';
    homeUrl: string = '/';
    dashboardUrl: string = '/auth/dashboard';

    private storage: StorageService = inject(StorageService);
    private cdr = inject(ChangeDetectorRef);

    ngOnInit(): void {
        this.currentUser = this.storage.getCurrentUser();
        this.cdr.detectChanges();
    }
}