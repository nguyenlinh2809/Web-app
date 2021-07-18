import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService, STORAGE_KEY } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private router: Router, private storageService: StorageService, private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const user = this.storageService.getItem(STORAGE_KEY.user);
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    if (user) {
      request = request.clone({ headers: request.headers.set('access-token', user.token) });
    }

    return next.handle(request).pipe(
      catchError( (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.storageService.clearItem(STORAGE_KEY.user);
          this.authService.userInfo$.next(null);
          this.router.navigate(['/sign-in']);
        }
        return throwError(error);
      }),
      finalize(() => {})
    );
  }
}
