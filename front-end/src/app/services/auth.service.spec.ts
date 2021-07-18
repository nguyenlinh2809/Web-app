import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { UserDetail, UserLogin } from '../models/user.model';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let storageService: StorageService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiUrl + 'auth';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        StorageService
      ]
    });
    service = TestBed.inject(AuthService);
    storageService = TestBed.inject(StorageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('signIn', () => {
    const user: UserLogin = {
      username: 'a',
      password: 'a',
      rememberMe: false
    };

    service.signIn(user).subscribe();
    const signInRequest = httpMock.expectOne(`${baseUrl}/sign-in`);

    signInRequest.flush({});
    expect(signInRequest.request.method).toEqual('POST');
    expect(signInRequest.request.body).toEqual(user);
    expect(signInRequest.request.url).toEqual(`${baseUrl}/sign-in`);
  });

  it('signUp', () => {
    const user: UserDetail = {
      nickName: 'a',
      country: 'a',
      email: 'a',
      password: 'a',
      phone: '123'
    };

    service.signUp(user).subscribe();
    const signUpRequest = httpMock.expectOne(`${baseUrl}/sign-up`);

    signUpRequest.flush({});
    expect(signUpRequest.request.method).toEqual('POST');
    expect(signUpRequest.request.body).toEqual(user);
    expect(signUpRequest.request.url).toEqual(`${baseUrl}/sign-up`);
  });

  it('updateAccount', () => {
    const user: UserDetail = {
      nickName: 'a',
      country: 'a',
      email: 'a',
      password: 'a',
      phone: '123'
    };

    service.updateAccount(user).subscribe();
    const signUpRequest = httpMock.expectOne(`${baseUrl}/update`);

    signUpRequest.flush({});
    expect(signUpRequest.request.method).toEqual('POST');
    expect(signUpRequest.request.body).toEqual(user);
    expect(signUpRequest.request.url).toEqual(`${baseUrl}/update`);
  });

});
