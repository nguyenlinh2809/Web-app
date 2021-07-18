import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/common/constant';
import { Country, UserDetail } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;
  registerErr = '';
  listCountry$: Observable<Country[]>;

  constructor(
    private readonly fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.listCountry$ = this.authService.getListCountry();
    this.registerForm = this.fb.group({
      nickName: ['', [Validators.required, Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.maxLength(40)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.pattern(Constants.EMAIL_REGEX), Validators.maxLength(60)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      country: ['', [Validators.required]]
    });
  }
  registerAction(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const requestUser: UserDetail = {
      nickName: this.registerForm.value.nickName,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      country: this.registerForm.value.country
    };
    this.authService.signUp(requestUser).subscribe(
      res => {
        if (res.msg === Constants.OK && res.data) {
          this.authService.userInfo$.next(res.data);
          this.registerErr = '';
          this.router.navigate(['/dashboard']);
        }
      },
      (error: HttpErrorResponse) => {
        this.registerErr = error.error.msg;
      });
  }

  isMatchedPassword(): boolean {
    if (this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value) {
      return false;
    }
    return true;
  }

}
