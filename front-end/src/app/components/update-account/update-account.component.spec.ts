import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NumberOnlyDirective } from 'src/app/common/number-only.directive';
import { UserDetail } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

import { UpdateAccountComponent } from './update-account.component';

describe('UpdateAccountComponent', () => {
  let component: UpdateAccountComponent;
  let fixture: ComponentFixture<UpdateAccountComponent>;
  let authService: AuthService;
  let form;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      declarations: [ UpdateAccountComponent, NumberOnlyDirective ],
      providers: [AuthService]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAccountComponent);
    component = fixture.componentInstance;
    const user: UserDetail = {
      nickName: '',
      password: '',
      country: '',
      email: '',
      phone: ''
    };
    spyOn(authService, 'getUserDetail').and.returnValue(of(user));
    form = fixture.debugElement.nativeElement.querySelector('form[id="update-form"]');
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
    component.updateForm.setValue(user);
    component.updateForm.markAllAsTouched();
    fixture.detectChanges();
    const submitBtn = form.querySelector('button[type=submit]');
    const defaultStatus = submitBtn.disabled;

    expect(defaultStatus).toEqual(false);
  });

  it('show call updateAccount method when hit submit button', () => {
    const spyUpdate = spyOn(authService, 'updateAccount').and.callThrough();
    const user = {
      nickName: 'a',
      password: 'ab',
      country: 'a',
      email: 'a@gmail.com',
      confirmPassword: 'a',
      phone: '0123456789'
    };
    component.updateForm.setValue(user);
    component.updateForm.markAllAsTouched();
    fixture.detectChanges();
    const submitBtn = form.querySelector('button[type=submit]');
    submitBtn.click();

    expect(spyUpdate).toHaveBeenCalledWith({
      nickName: 'a',
      password: 'ab',
      country: 'a',
      email: 'a@gmail.com',
      phone: '0123456789'
    });
  });
});
