import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/common/constant';
import { UserLogin, UserResponse } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService, STORAGE_KEY } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  loginErr = '';
  user: UserLogin = {
    username: '',
    password: '',
    rememberMe: false
  };

  constructor(
    private readonly fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const rememberUser = this.storageService.getItem(STORAGE_KEY.rememberUser);
    if (rememberUser) {
      this.user = {...rememberUser};
    }
    this.loginForm = this.fb.group({
      username: [this.user.username, [Validators.required, Validators.maxLength(40)]],
      password: [this.user.password, [Validators.required, Validators.maxLength(40)]],
      rememberMe: [this.user.rememberMe]
    });
  }

  async loginAction(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }
    const user: UserLogin = { ...this.loginForm.value };
    this.authService.signIn(user).subscribe(
      (res: UserResponse) => {
        if (res.msg === Constants.OK && res.data) {
          this.rememberMe(user);
          this.authService.userInfo$.next(res.data);
          this.loginErr = '';
          this.router.navigate(['/dashboard']);
        }
      },
      (error: HttpErrorResponse) => {
        this.loginErr = error.error.msg;
      });
  }

  rememberMe(user: UserLogin): void {
    if (user.rememberMe) {
      this.storageService.setItem(STORAGE_KEY.rememberUser, user);
    }
  }

}
