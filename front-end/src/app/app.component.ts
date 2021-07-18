import { Component } from '@angular/core';
import { UserDetail } from './models/user.model';
import { AuthService } from './services/auth.service';
import { StorageService, STORAGE_KEY } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthService, private storageService: StorageService) {
    if (this.authService.isAuthenticated()) {
      const user: UserDetail = this.storageService.getItem(STORAGE_KEY.user);
      this.authService.userInfo$.next(user);
    }
  }
}
