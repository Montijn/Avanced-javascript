import { Component } from '@angular/core';
import { LoginComponent } from '../../components/auth/login/login.component';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { NavbarComponent } from '../../components/navbar/navbar/navbar.component';

@Component({
  selector: 'app-authentication-page',
  standalone: true,
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.sass'],
  imports: [LoginComponent, RegisterComponent, NavbarComponent]
})
export class AuthenticationPageComponent {

}
