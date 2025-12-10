import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_KEY, BASE_URL_KEY } from '../../config.token';

@Injectable({
  providedIn: 'root'
})
export class AuthProvidersService {
  AUTH_API = this.apiUrl + '/api/auth/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': [this.baseUrl]
    })
  };
  constructor(@Inject(BASE_API_KEY) public apiUrl: string, @Inject(BASE_URL_KEY) public baseUrl: string, private http: HttpClient) { }
  addProvider(credentials: any): Observable<any> {
    return this.http.post(this.AUTH_API + 'add/provider', credentials, this.httpOptions);
  }
  unlinkProvider(credentials: any): Observable<any> {
    return this.http.post(this.AUTH_API + 'remove/provider', credentials, this.httpOptions);
  }
}
