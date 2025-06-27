import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Navbar } from "../../shared/components/navbar/navbar";

@Component({
    selector: 'app-public-layout',
    templateUrl: './public-layout.html',
    imports: [RouterOutlet, Navbar],
})
export class PublicLayout {
    
}