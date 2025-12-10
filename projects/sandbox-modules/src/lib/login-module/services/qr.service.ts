import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_KEY, BASE_URL_KEY } from '../../config.token';


@Injectable({
  providedIn: 'root'
})
export class QrService {
  MFA_API = this.apiUrl + '/api/2fa/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': [this.baseUrl]
    })
  };
  constructor(@Inject(BASE_API_KEY) public apiUrl: string, @Inject(BASE_URL_KEY) public baseUrl: string, private http: HttpClient) { }
  generate2fa(): Observable<any> {
    return this.http.post(this.MFA_API + 'generate', this.httpOptions);
  }
  verify2fa(info: any): Observable<any> {
    return this.http.post(this.MFA_API + 'validate', info);
  }
  disable2fa(info: any): Observable<any> {
    return this.http.post(this.MFA_API + 'disable', info);
  }
}
