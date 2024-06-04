import { Component } from '@angular/core';
import { EditHuishoudboekjeComponent } from "../huishoudboekje/edit-huishoudboekje/edit-huishoudboekje.component";
import { NavbarComponent } from "../navbar/navbar/navbar.component";

@Component({
    selector: 'app-huishoudboekje-edit-page',
    standalone: true,
    templateUrl: './huishoudboekje-edit-page.component.html',
    styleUrl: './huishoudboekje-edit-page.component.scss',
    imports: [NavbarComponent, EditHuishoudboekjeComponent]
})
export class HuishoudboekjeEditPageComponent {

}
