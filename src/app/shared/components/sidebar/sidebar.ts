import { CommonModule } from "@angular/common";
import { Component, ViewChild, inject, OnInit, HostListener } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from "../../../theme.service";

@Component({
    selector: 'app-sidebar',
    imports: [
        RouterModule, 
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule
    ],
    templateUrl: './sidebar.html',
    styleUrls: ['./sidebar.scss'],
})
export class Sidebar implements OnInit {
    @ViewChild('sidenav') sidenav!: MatSidenav;
    
    dashboardUrl: string = '/auth/dashboard';
    eventosUrl: string = '/auth/eventos';
    perfilUrl: string = '/auth/perfil';
    
    sidenavOpened = false;
    isMobile = false;

    protected themeService = inject(ThemeService);

    ngOnInit() {
        this.checkScreenSize();
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

    logout() {
        // Implementar lógica de logout
        console.log('Cerrando sesión...');
        // this.authService.logout();
        // this.router.navigate(['/login']);
    }
}