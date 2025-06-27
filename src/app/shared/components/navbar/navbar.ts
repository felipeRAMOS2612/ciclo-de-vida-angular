import { Component } from "@angular/core";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.html',
    styleUrls: ['./navbar.scss'],
    standalone: true
})
export class Navbar {
    loginUrl: string;    
    registerUrl: string;
    homeUrl: string;

    constructor() {
        this.loginUrl = '/login';
        this.registerUrl = '/register';
        this.homeUrl = '/';
    }

}