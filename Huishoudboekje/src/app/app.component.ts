import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateHuishoudboekjeComponent } from './components/huishoudboekje/create-huishoudboekje/create-huishoudboekje.component';
import { ListHuishoudboekjeComponent } from './components/huishoudboekje/list-huishoudboekje/list-huishoudboekje.component';
import { EditHuishoudboekjeComponent } from './components/huishoudboekje/edit-huishoudboekje/edit-huishoudboekje.component';
import { HuishoudboekjeOverviewPageComponent } from './pages/huishoudboekje-overview-page/huishoudboekje-overview-page.component';
import { NavbarComponent } from "./components/navbar/navbar/navbar.component";
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthenticationPageComponent } from './pages/authentication-page/authentication-page.component';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        CreateHuishoudboekjeComponent,
        ListHuishoudboekjeComponent,
        EditHuishoudboekjeComponent,
        HuishoudboekjeOverviewPageComponent,
        NavbarComponent,
        LoginComponent,
        RegisterComponent,
        AuthenticationPageComponent
    ]
})
export class AppComponent {
  title = 'Huishoudboekje';
}
