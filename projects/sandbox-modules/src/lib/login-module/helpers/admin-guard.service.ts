import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  static isBrowser = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) platformId: string, private router: Router, private tokenStorage: TokenStorageService) {
    AdminGuardService.isBrowser.next(isPlatformBrowser(platformId));
  }
  async canActivate() {
    if (AdminGuardService.isBrowser.getValue()) {
      const isLogged = (await this.tokenStorage.getLoggedIn()) === true
      if (!isLogged) {
        this.router.navigate(['/'])
        return false;
      }
      if (this.tokenStorage.getIsAdminOrGestore()) {
        return true
      } else {
        this.router.navigate(['/pannello'])
        return false;
      }
    }
    return false;
  }
}
