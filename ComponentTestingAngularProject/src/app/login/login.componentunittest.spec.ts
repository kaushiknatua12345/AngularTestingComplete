import { FormBuilder } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService} from './../auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent (Unit)', () => {
  let component: LoginComponent;
  let loginServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    component = new LoginComponent(new FormBuilder(), loginServiceSpy, routerSpy);
  });

  it('should create the form with controls', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

    it('should mark email as required', () => {
        const emailControl = component.loginForm.get('email');
        emailControl?.setValue('');
        expect(emailControl?.valid).toBeFalse();
    });

    it('should mark password as required', () => {
        const passwordControl = component.loginForm.get('password');
        passwordControl?.setValue('');
        expect(passwordControl?.valid).toBeFalse();
    });

// Test cases for the login functionality  

    it('should call login method of AuthService on form submission', () => {
        const email = 'test@example.com';
        const password = 'password123';

        component.loginForm.setValue({ email, password });
        loginServiceSpy.login.and.returnValue(of({ token: 'fake-token' }));
        component.onSubmit();

        expect(loginServiceSpy.login).toHaveBeenCalled();
        expect(component.loginForm.valid).toBeTrue();
        
    }
    );

    it('should handle login error', () => {
    const email = 'invaliduser@abc.com';
    const password = 'wrongpassword';
    component.loginForm.setValue({ email, password });
    loginServiceSpy.login.and.returnValue(throwError(() => new Error('Login failed')));
    component.onSubmit();
    expect(loginServiceSpy.login).toHaveBeenCalled();
    expect(component.loginForm.valid).toBeTrue();
    expect(component.errorMessage).toBe('An error occurred during login');
});
});