import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VerifyLoginInfo } from '../models/login-info';
import { BASE_API_KEY, BASE_URL_KEY } from '../../config.token';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  AUTH_API = this.apiUrl + '/api/auth/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': [this.baseUrl]
    })
  };
  constructor(@Inject(BASE_API_KEY) public apiUrl: string, @Inject(BASE_URL_KEY) public baseUrl: string, private http: HttpClient) { }
  verifyMail(credentials: any): Observable<any> {
    return this.http.post(this.AUTH_API + 'verify', credentials, this.httpOptions);
  }
  login(credentials: VerifyLoginInfo): Observable<any> {
    return this.http.post(this.AUTH_API + 'signin', credentials, this.httpOptions);
  }
  logout(body: any): Observable<any> {
    return this.http.post(this.AUTH_API + 'logout', body, this.httpOptions);
  }
  refreshToken(body: any): Observable<any> {
    return this.http.post(this.AUTH_API + 'refresh', body, this.httpOptions);
  }
  loginGoogle(credentials: any): Observable<any> {
    return this.http.post(this.AUTH_API + 'signin/google', credentials, this.httpOptions);
  }
}
