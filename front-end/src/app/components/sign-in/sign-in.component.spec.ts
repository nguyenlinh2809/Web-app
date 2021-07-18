import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: AuthService;
  let form;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      declarations: [ SignInComponent ],
      providers: [AuthService]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    form = fixture.debugElement.nativeElement.querySelector('form[id="login-form"]');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit button default status: disabled', () => {
    const submitBtn = form.querySelector('button[type=submit]');
    const defaultStatus = submitBtn.disabled;

    expect(defaultStatus).toEqual(true);
  });

  it('should enable submit button when form is valid', () => {
    component.loginForm.setValue({
      username: 'a',
      password: 'a',
      rememberMe: false
    });
    component.loginForm.markAllAsTouched();
    fixture.detectChanges();
    const submitBtn = form.querySelector('button[type=submit]');
    const defaultStatus = submitBtn.disabled;

    expect(defaultStatus).toEqual(false);
  });

  it('show error message when username is empty', () => {
    component.loginForm.setValue({
      username: '',
      password: 'a',
      rememberMe: false
    });
    component.loginForm.markAllAsTouched();
    fixture.detectChanges();
    const errorMsg = fixture.debugElement.nativeElement.querySelector('#required-username-err');

    expect(errorMsg.textContent).toEqual('Username is required!');
  });

  it('show error message when password is empty', () => {
    component.loginForm.setValue({
      username: 'a',
      password: '',
      rememberMe: false
    });
    component.loginForm.markAllAsTouched();
    fixture.detectChanges();
    const errorMsg = fixture.debugElement.nativeElement.querySelector('#required-password-err');

    expect(errorMsg.textContent).toEqual('Password is required!');
  });

  it('show call signIn method when hit submit button', () => {
    const spySignIn = spyOn(authService, 'signIn').and.callThrough();
    const user = {
      username: 'a',
      password: 'a',
      rememberMe: false
    };
    component.loginForm.setValue(user);
    component.loginForm.markAllAsTouched();
    fixture.detectChanges();
    const submitBtn = form.querySelector('button[type=submit]');
    submitBtn.click();

    expect(spySignIn).toHaveBeenCalledWith(user);
  });
});
