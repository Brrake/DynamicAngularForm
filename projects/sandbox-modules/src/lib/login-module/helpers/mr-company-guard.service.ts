import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { TokenStorageService } from '../services/token-storage.service';
import { environment } from 'src/environments/environment';
import { PanelService } from 'src/app/panel-module/services/panel.service';

@Injectable({
  providedIn: 'root'
})
export class MrCompanyGuardService {

  static isBrowser = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) platformId: string, private panelService: PanelService, private tokenStorageService: TokenStorageService) {
    MrCompanyGuardService.isBrowser.next(isPlatformBrowser(platformId));
  }
  canActivate(): boolean {
    if (MrCompanyGuardService.isBrowser.getValue()) {
      const isMr = this.tokenStorageService.getTokenAccountType() == environment.utenti.mr
      const userPlan = this.tokenStorageService.getTokenPlan() != ''
      if (isMr && userPlan && !this.tokenStorageService.hasStripeAccount()) {
        return true
      } else {
        this.panelService.goToPanel('')
        return false;
      }
    }
    return false;
  }
}
