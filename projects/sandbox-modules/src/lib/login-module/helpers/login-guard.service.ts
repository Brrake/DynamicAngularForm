import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  static isBrowser = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private tokenStorage: TokenStorageService) {
  }
  async canActivate() {
    const isLogged = (await this.tokenStorage.getLoggedIn()) === true
    if (!isLogged) {
      return true
    } else {
      this.router.navigate(['/pannello'])
      return false;
    }
  }
}
