import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryRegister(value: User){
    this.authService.doRegister(value)
    .then(res => {
      this.errorMessage = "";
      this.successMessage = "Account successfully created";
    }, err => {
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }
}
