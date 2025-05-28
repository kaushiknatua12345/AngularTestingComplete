/* create co mponent test for login.component.ts and UI interaction*/
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from './../auth.service';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

describe('LoginComponent (UI Interaction)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        LoginComponent,        
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatInputModule
      ],
      
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display form controls', () => {
 const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));
  const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]'));
  const loginButton = fixture.debugElement.query(By.css('button[type="submit"]'));
  expect(emailInput).toBeTruthy();
  expect(passwordInput).toBeTruthy();
  expect(loginButton).toBeTruthy();
  });

   it('should not call login if form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', {});
    fixture.detectChanges();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(component.loginSuccess).toBeFalse();
  });

it('should call AuthService.login and navigate on valid credentials', fakeAsync(() => {
  const email = 'test@example.com';
  const password = 'password123';
  component.loginForm.controls['email'].setValue(email);
  component.loginForm.controls['password'].setValue(password);
  fixture.detectChanges();

  // Set the spy return value BEFORE triggering submit
  authServiceSpy.login.and.returnValue(of([{}]));

  const form = fixture.debugElement.query(By.css('form'));
  form.triggerEventHandler('ngSubmit', {});
  tick(); // Let observables complete
  fixture.detectChanges();

  expect(authServiceSpy.login).toHaveBeenCalledWith({ email, password });
  expect(component.loginSuccess).toBeTrue();
  expect(component.errorMessage).toBe('');
  expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
}));

it('should show error message on login error', fakeAsync(() => {
    const email = 'wronguser@example.com';
    const password = 'wrongpassword';
    component.loginForm.controls['email'].setValue(email);
    component.loginForm.controls['password'].setValue(password);
    fixture.detectChanges();
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Login failed')));
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', {});
    tick();
    fixture.detectChanges();
    expect(authServiceSpy.login).toHaveBeenCalledWith({ email, password });
    expect(component.loginSuccess).toBeFalse();
    expect(component.errorMessage).toBe('An error occurred during login');
  }));


  });

    