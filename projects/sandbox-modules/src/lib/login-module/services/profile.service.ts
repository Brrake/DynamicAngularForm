import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const AUTH_API = environment.apiUrl + '/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': [environment.baseUrl]
  })
};
const httpOptionsFormData = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': [environment.baseUrl]
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  getProtectedImage(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'blob' })
  }

  getPanel(): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/panel', httpOptions);
  }
  // Edit Profile
  editProfile(form: any, files: any): Observable<any> {
    const formData: FormData = new FormData();
    Array.from(files).forEach((f: any) => { formData.append('image', f.file); });

    formData.append('username', form.username);
    formData.append('firstname', form.firstname);
    formData.append('lastname', form.lastname);
    formData.append('height', form.height);
    formData.append('weight', form.weight);
    formData.append('edit_type', form.edit_type);
    formData.append('dob', JSON.stringify(form.dob));
    formData.append('gender', form.gender);
    formData.append('lang', form.lang);
    return this.http.post(AUTH_API + 'edit/profile', formData, httpOptionsFormData);
  }
  // Change Password as logged
  changePassword(info: any): Observable<any> {
    return this.http.post(AUTH_API + 'change/password', info, httpOptions);
  }
  // Change Email as logged
  sendVerifyChangeMail(credentials: any): Observable<any> {
    return this.http.post(AUTH_API + 'send_verify_change_email', credentials, httpOptions);
  }
  verifyChangeMail(credentials: any): Observable<any> {
    return this.http.post(AUTH_API + 'verify_change_email', credentials, httpOptions);
  }
  // Change Iban
  sendVerifyChangeIban(credentials: any): Observable<any> {
    return this.http.post(AUTH_API + 'send_verify_change_iban', credentials, httpOptions);
  }
  verifyChangeIban(credentials: any): Observable<any> {
    return this.http.post(AUTH_API + 'verify_change_iban', credentials, httpOptions);
  }

}
