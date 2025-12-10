import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const TEAM_API = environment.apiUrl + '/api/auth/team/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': [environment.baseUrl]
  })
};
@Injectable({
  providedIn: 'root'
})
export class SiteTeamService {
  constructor(private http: HttpClient) { }
  // Register To Team
  registerTeamMember(info: any): Observable<any> {
    return this.http.post(TEAM_API + 'register', info, httpOptions);
  }
  editTeamMember(info: any): Observable<any> {
    return this.http.post(TEAM_API + 'edit', info, httpOptions);
  }
  deleteTeamMember(id: string): Observable<any> {
    return this.http.delete(TEAM_API + id, httpOptions);
  }
}
