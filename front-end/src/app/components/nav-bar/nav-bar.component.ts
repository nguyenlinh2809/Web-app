import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService, STORAGE_KEY } from 'src/app/services/storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: UserDetail;
  constructor(private authService: AuthService,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.userInfo$.subscribe((user: UserDetail) => {
      if (user) {
        this.user = user;
        this.storageService.setItem(STORAGE_KEY.user, user);
      } else {
        this.user = null;
      }
    });
  }
  logoutAction(): void {
    this.storageService.clearItem(STORAGE_KEY.user);
    this.authService.userInfo$.next(null);
    this.router.navigate(['/sign-in']);
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  goToUpdateAccount(nickName: string): void {
    this.router.navigate(['/update-account', nickName]);
  }

}
