import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  currentUser: User
  constructor(private authService: AuthService, private router: Router){
  }
  
  ngOnInit() {
    this.authService.$currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
  tryLogout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(['/auth']);
    }, err => {
      console.log(err);

    })
  }
}
