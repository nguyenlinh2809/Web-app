import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDetail } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService: AuthService;
  let form;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      declarations: [ SignUpComponent ],
      providers: [AuthService]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    form = fixture.debugElement.nativeElement.querySelector('form[id="register-form"]');
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
    const user = {
      country: 'a',
      email: 'a@gmail.com',
      nickName: 'a',
      password: 'a',
      confirmPassword: 'a',
      phone: '0123456789'
    };
    component.registerForm.setValue(user);
    component.registerForm.markAllAsTouched();
    fixture.detectChanges();
    const submitBtn = form.querySelector('button[type=submit]');
    const defaultStatus = submitBtn.disabled;

    expect(defaultStatus).toEqual(false);
  });

  it('should show error message when nickname is empty', () => {
    const user = {
      country: 'a',
      email: 'a@gmail.com',
      nickName: '',
      password: 'a',
      confirmPassword: 'a',
      phone: '0123456789'
    };
    component.registerForm.setValue(user);
    component.registerForm.markAllAsTouched();
    fixture.detectChanges();
    const errorMsg = fixture.debugElement.nativeElement.querySelector('#required-nickName-err');

    expect(errorMsg.textContent).toEqual('Nickname is required!');
  });

  it('should show error message when confirm password is not matched with password', () => {
    const user = {
      country: 'a',
      email: 'a@gmail.com',
      nickName: 'a',
      password: 'ab',
      confirmPassword: 'a',
      phone: '0123456789'
    };
    component.registerForm.setValue(user);
    component.registerForm.markAllAsTouched();
    fixture.detectChanges();
    const errorMsg = fixture.debugElement.nativeElement.querySelector('#not-match-err');

    expect(errorMsg.textContent).toEqual('Confirm password is not matched!');
  });

  it('should show error message when email is invalid format', () => {
    const user = {
      country: 'a',
      email: 'wrong email',
      nickName: 'a',
      password: 'ab',
      confirmPassword: 'a',
      phone: '0123456789'
    };
    component.registerForm.setValue(user);
    component.registerForm.markAllAsTouched();
    fixture.detectChanges();
    const errorMsg = fixture.debugElement.nativeElement.querySelector('#format-email-err');

    expect(errorMsg.textContent).toEqual('Email wrong format!');
  });

  it('show call signUp method when hit submit button', () => {
    const spySignUp = spyOn(authService, 'signUp').and.callThrough();
    const user = {
      nickName: 'a',
      password: 'ab',
      country: 'a',
      email: 'a@gmail.com',
      confirmPassword: 'a',
      phone: '0123456789'
    };
    component.registerForm.setValue(user);
    component.registerForm.markAllAsTouched();
    fixture.detectChanges();
    const submitBtn = form.querySelector('button[type=submit]');
    submitBtn.click();

    expect(spySignUp).toHaveBeenCalledWith({
      nickName: 'a',
      password: 'ab',
      country: 'a',
      email: 'a@gmail.com',
      phone: '0123456789'
    });
  });
});
