import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TokenStorageService } from '../services/token-storage.service';
import { LoginService } from '../services/login.service';

const TOKEN_HEADER_KEY = 'x-access-token';
const XSRF_HEADER_KEY = 'X-XSRF-TOKEN';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private loginService: LoginService,
    private tokenService: TokenStorageService,
    private tokenExtractorService: HttpXsrfTokenExtractor
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
      const accessToken = this.tokenService.getAccessToken();
      const csrf = this.tokenExtractorService.getToken();
      
      let authReq = this.addTokenAndHeaders(req, accessToken, csrf);

      return next.handle(authReq).pipe(
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          
          if (err.status === 403) {
            return this.handle403Error(authReq, next, csrf);
          } else if (err.error?.name === "TokenExpiredError") {
            this.tokenService.signOut(false, false);
          } else if (err.status === 503) {
            this.router.navigate(['/maintenance']);
          } else if (err.status === 408) {
            this.tokenService.signOut(true, false);
          }
          
          return throwError(() => err);
        })
      );
    }

    return next.handle(req);
  }

  private addTokenAndHeaders(
    request: HttpRequest<any>, 
    token: string | null, 
    csrf: string | null
  ): HttpRequest<any> {
    let headers = request.headers;

    if (token !== null && token !== '') {
      headers = headers.set(TOKEN_HEADER_KEY, token);
    }

    if (csrf !== null && csrf !== '') {
      headers = headers.set(XSRF_HEADER_KEY, csrf);
    }

    headers = headers.delete('Content-Transfer-Encoding');

    return request.clone({ 
      headers: headers,
      withCredentials: true 
    });
  }

  private handle403Error(
    request: HttpRequest<any>, 
    next: HttpHandler,
    csrf: string | null
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.tokenService.getRefreshToken();

      return this.loginService.refreshToken({ token: refreshToken }).pipe(
        switchMap((res: any) => {
          this.isRefreshing = false;
          const newAccessToken = res.accessToken;
          const newRefreshToken = res.refreshToken;
          this.refreshTokenSubject.next(newAccessToken);
          this.tokenService.setNewAccessToken(newAccessToken);
          this.tokenService.setNewRefreshToken(newRefreshToken);

          return next.handle(this.addTokenAndHeaders(request, newAccessToken, csrf));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          console.log(error);
          console.log(error.url ,error.url.includes('auth/refresh'));
          
          if(!error.url.includes('auth/refresh')) return throwError(() => error);
          const newAccessToken = error.error.tokens.accessToken;
          const newRefreshToken = error.error.tokens.refreshToken;
          this.refreshTokenSubject.next(newAccessToken);
          this.tokenService.setNewAccessToken(newAccessToken);
          this.tokenService.setNewRefreshToken(newRefreshToken);
          return throwError(() => error);
        })
      );
    } else {
      // Altre richieste in attesa del refresh
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          return next.handle(this.addTokenAndHeaders(request, token, csrf));
        })
      );
    }
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
