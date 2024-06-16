import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing'; // Import the RouterTestingModule
import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    const authServiceStub = {
      doLogin: () => Promise.resolve()
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule], // Use RouterTestingModule
      providers: [
        { provide: AuthService, useValue: authServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /overview after successful login', async () => {
    spyOn(authService, 'doLogin').and.returnValue(Promise.resolve());

    const navigateSpy = spyOn(component['router'], 'navigate'); // Use the actual Router instance

    await component.tryLogin({ email: 'test@example.com', password: 'password' });

    expect(authService.doLogin).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(navigateSpy).toHaveBeenCalledWith(['/overview']); // Check if navigate was called
    expect(component.errorMessage).toEqual('');
  });
});
