import { Component } from '@angular/core';
import { DetailHuishoudboekjeComponent } from "../huishoudboekje/detail-huishoudboekje/detail-huishoudboekje.component";
import { NavbarComponent } from "../navbar/navbar/navbar.component";

@Component({
    selector: 'app-huishoudboekje-edit-page',
    standalone: true,
    templateUrl: './huishoudboekje-edit-page.component.html',
    styleUrl: './huishoudboekje-edit-page.component.scss',
    imports: [DetailHuishoudboekjeComponent, NavbarComponent]
})
export class HuishoudboekjeEditPageComponent {

}
