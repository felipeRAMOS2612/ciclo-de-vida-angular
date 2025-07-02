import { Component, HostListener, inject, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../theme.service';
import { StorageService } from '../../shared/services/storage';

@Component({
  selector: 'app-private-layout',
  imports: [
    MatSidenavModule,
    RouterOutlet,
    RouterModule, 
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './private-layout.html',
  styleUrls: ['./private-layout.scss']
})
export class PrivateLayout {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  dashboardUrl: string = '/auth/dashboard';
  eventosUrl: string = '/auth/eventos';
  perfilUrl: string = '/auth/perfil';

  sidenavOpened = false;
  isMobile = false;

  themeService = inject(ThemeService)
  storageService = inject(StorageService);

  logout() {
    this.storageService.logout();
  }

  @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.checkScreenSize();
    }

    private checkScreenSize() {
        this.isMobile = window.innerWidth < 768;
        if (!this.isMobile) {
            this.sidenavOpened = true;
        } else {
            this.sidenavOpened = false;
        }
    }

    toggleSidenav() {
        this.sidenavOpened = !this.sidenavOpened;
        if (this.sidenav) {
            this.sidenav.toggle();
        }
    }

    closeSidenavOnMobile() {
        if (this.isMobile && this.sidenav) {
            this.sidenav.close();
            this.sidenavOpened = false;
        }
    }
}
