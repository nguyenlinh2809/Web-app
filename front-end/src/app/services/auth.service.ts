import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country, UserDetail, UserLogin, UserResponse } from '../models/user.model';
import { StorageService, STORAGE_KEY } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.apiUrl + 'auth/';
  listCountry: Country[] = [
    {
      code: 'VN',
      name: 'Viet Nam'
    },
    {
      code: 'JP',
      name: 'Japan'
    },
    {
      code: 'KO',
      name: 'Korea'
    },
    {
      code: 'LA',
      name: 'Lao'
    }
  ];
  userInfo$ = new ReplaySubject<UserDetail>(1);
  constructor(private http: HttpClient, private storageService: StorageService) {}

  getListCountry(): Observable<Country[]> {
    return of(this.listCountry);
  }

  signUp(user: UserDetail): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.API_URL + 'sign-up', user);
  }

  signIn(user: UserLogin): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.API_URL + 'sign-in', user);
  }

  updateAccount(user: UserDetail): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.API_URL + 'update', user);
  }

  getUserDetail(): Observable<UserDetail> {
    return of(this.storageService.getItem(STORAGE_KEY.user));
  }

  isAuthenticated(): boolean {
    const isAuthen = Boolean(this.storageService.getItem(STORAGE_KEY.user));
    return isAuthen;
  }
}
