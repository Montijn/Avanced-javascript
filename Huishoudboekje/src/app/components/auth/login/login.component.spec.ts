import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing'; // Import the RouterTestingModule
import { LoginComponent } from './login.component';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;

  beforeEach(waitForAsync(() => {
    const authServiceStub = {
      doLogin: () => Promise.resolve()
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule], // Use RouterTestingModule
      providers: [
        { provide: AuthenticationService, useValue: authServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
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
