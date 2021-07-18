import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isAuthen();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> {
    return this.isAuthen();
  }

  isAuthen(): Observable<boolean> {
    return of(this.authService.isAuthenticated()).pipe(
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/sign-in']);
        }
      })
    );
  }
}
