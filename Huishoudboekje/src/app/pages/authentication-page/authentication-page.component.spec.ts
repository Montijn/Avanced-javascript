import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationPageComponent } from './authentication-page.component';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar/navbar.component';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { LoginComponent } from '../../components/auth/login/login.component';

describe('AuthenticationPageComponent', () => {
  let component: AuthenticationPageComponent;
  let fixture: ComponentFixture<AuthenticationPageComponent>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1'
        }
      }
    };
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RegisterComponent, NavbarComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
