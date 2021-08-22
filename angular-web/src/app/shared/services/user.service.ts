import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/modules/login/models/login-request';
import { Login } from 'src/app/modules/login/models/login';
import { Register } from 'src/app/modules/main/pages/register/models/register';
import { RegisterRequest } from 'src/app/modules/main/pages/register/models/register-request';
import { VerifyRequest } from 'src/app/modules/main/models/verify-request';
import { PreRegistered } from 'src/app/modules/main/pages/register/models/pre-register';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  preRegisterApiUrl = environment.apiUrl + 'preusers';
  registerApiUrl = environment.apiUrl + 'register';
  loginApiUrl = environment.apiUrl + 'login';
  logoutApiUrl = environment.apiUrl + 'logout';
  sendEmailApiUrl = environment.apiUrl + 'send-mail';
  verifyCodeApiUrl = environment.apiUrl + 'verified';

  constructor(
    private httpClientNoIntercept: HttpClient,
    private handler: HttpBackend,
    private httpClient: HttpClient
  ) {
    this.httpClientNoIntercept = new HttpClient(this.handler);
  }

  login(data: LoginRequest): Observable<Login> {
    return this.httpClientNoIntercept.post<Login>(this.loginApiUrl, data);
  }

  preRegistered(data): Observable<PreRegistered> {
    return this.httpClientNoIntercept.post<PreRegistered>(this.preRegisterApiUrl, data);
  }

  register(data: RegisterRequest): Observable<Register> {
    return this.httpClientNoIntercept.post<Register>(this.registerApiUrl, data);
  }

  logout(): Observable<Login> {
    return this.httpClient.get<Login>(this.logoutApiUrl);
  }

  sendEmailCode(): Observable<Login> {
    return this.httpClient.get<Login>(this.sendEmailApiUrl);
  }

  verifyCode(data: VerifyRequest): Observable<Login> {
    return this.httpClient.post<Login>(this.verifyCodeApiUrl, data);
  }
}
