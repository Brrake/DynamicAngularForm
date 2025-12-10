import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  static isBrowser = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private tokenStorage: TokenStorageService) {

  }
  async canActivate() {
    const isLogged = await this.tokenStorage.getLoggedIn()
    if (isLogged) {
      return isLogged
    } else {
      this.router.navigate(['/login'])
      return false;
    }
  }
}
