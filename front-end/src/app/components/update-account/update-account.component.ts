import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/common/constant';
import { Country, UserDetail } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {

  updateForm: FormGroup;
  updateErr = '';
  listCountry$: Observable<Country[]>;

  constructor(
    private readonly fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.listCountry$ = this.authService.getListCountry();
    this.authService.getUserDetail().subscribe(user => {
      this.initForm(user);
    });
  }
  initForm(user: UserDetail): void {
    this.updateForm = this.fb.group({
      nickName: [user.nickName, [Validators.required, Validators.maxLength(40)]],
      password: [user.password, [Validators.required, Validators.maxLength(40)]],
      confirmPassword: [user.password, [Validators.required, Validators.maxLength(40)]],
      email: [user.email, [Validators.required, Validators.pattern(Constants.EMAIL_REGEX), Validators.maxLength(60)]],
      phone: [user.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      country: [user.country, [Validators.required]]
    });
    this.updateForm.get('email').disable();
  }
  updateAccount(): void {
    if (this.updateForm.invalid) {
      return;
    }
    const requestUser: UserDetail = {
      nickName: this.updateForm.value.nickName,
      password: this.updateForm.value.password,
      email: this.updateForm.get('email').value,
      phone: this.updateForm.value.phone,
      country: this.updateForm.value.country
    };
    this.authService.updateAccount(requestUser).subscribe(
      res => {
        if (res.msg === Constants.UPDATED && res.data) {
          this.authService.userInfo$.next(res.data);
          this.updateErr = '';
          this.router.navigate(['/dashboard']);
        }
      },
      (error: HttpErrorResponse) => {
        this.updateErr = error.error.msg;
      });
  }
  isMatchedPassword(): boolean {
    if (this.updateForm.get('password').value !== this.updateForm.get('confirmPassword').value) {
      return false;
    }
    return true;
  }

}
