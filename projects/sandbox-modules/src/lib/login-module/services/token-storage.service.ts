import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { PlatformService } from 'src/app/services/platform.service';
import { SecureStorage } from '@aparajita/capacitor-secure-storage';
import { isPlatformServer } from '@angular/common';
import { MobileGoogleService } from './mobile-google.service';
import { BiometricAuthService } from 'src/app/services/biometric-auth.service';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  isAuthenticating = false
  isAuthenticated: boolean = false

  // Mobile perche lo invio con cookie via web
  private safeStorage: any = {
    refreshToken: '',
    biometricEnabled: 'false'
  }

  private userKeys: string[] = ['username', 'active', 'first_access', 'roles', 'firstname', 'lastname', 'type', 'icon', 'accessToken']

  constructor(
    private platformService: PlatformService,
    private loginService: LoginService,
    private biometricAuthService: BiometricAuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
  }
  async initStorage() {
    if (this.isAuthenticating) return false;
    const biometricEnabled = await this.getFromStorageMobile('biometricEnabled', 'false');
    this.isAuthenticating = true;
    if (biometricEnabled != 'true') {
      await this.syncMobileStorage();
      this.isAuthenticating = false;
      this.isAuthenticated = true;
      return this.isAuthenticated;
    };
    try {
      const authenticated = await this.biometricAuthService.biometricAuth()
      if (authenticated.success === true) {
        // autenticato con successo
        console.log('Autenticazione riuscita con successo.');
        await this.syncMobileStorage();
        this.isAuthenticated = true
      } else {
        console.log('Errore biometrico');
        this.isAuthenticating = false;
        return false;
      }
    } catch (error) {
      this.isAuthenticating = false
    } finally {
      this.isAuthenticating = false
    }
    return this.isAuthenticated

  }
  async syncMobileStorage() {
    for (let i = 0; i < Object.keys(this.safeStorage).length; i++) {
      const key = Object.keys(this.safeStorage)[i]
      if (this.platformService.isMobile(false)) {
        this.safeStorage[key] = await this.getFromStorageMobile(key, '')
      }
    }

  }
  signOut(reload: boolean = true, api: boolean = true) {
    for (const key of this.userKeys) this.deleteFromStorage(key);
    Object.keys(this.safeStorage).forEach(async (key) => {
      if (this.platformService.isMobile(false)) {
        this.deleteFromStorageMobile(key)
      }
    })
    localStorage.removeItem('remember')
    if (this.platformService.isMobile(false)) {
      const G = new MobileGoogleService();
      G.logout();
    }
    if (api) {
      this.logoutApi(this.getRefreshToken()).then(res => {
        reload ? window.location.reload() : null;
      })
      return
    }
    reload ? window.location.reload() : null;

  }
  logoutApi(token: any) {
    return new Promise((resolve, reject) => {
      this.loginService.logout({ token: token }).subscribe({
        next: (res: any) => {
          resolve(res)
        },
        error: (err: any) => {
          reject(err)
        }
      })
    })
  }
  public saveUser(user: any, check: boolean) {
    // Salva check in localStorage
    if (this.platformService.isMobile()) {
      localStorage.setItem('remember', 'true')
    } else {
      localStorage.setItem('remember', check.toString())
    }
    //Salva utente
    for (const key of this.userKeys) {
      if (key == 'roles' || key == 'icon') user[key] = JSON.stringify(user[key])
      this.setFromStorage(key, user[key])
    }
    Object.keys(this.safeStorage).forEach(async (key) => {
      if (this.platformService.isMobile(false)) {
        this.setFromStorageMobile(key, user[key])
      }
    })
  }

  public getIcon() {
    return this.getFromStorage('icon', '[]', true)
  }
  getUserId() {
    const userId = this.decodeJWT(this.getAccessToken())?.id
    return userId
  }
  hasStripeAccount() {
    if (this.decodeJWT(this.getAccessToken()).account_id) return true
    return false
  }
  public getAccountName() {
    const name = this.getFromStorage('stripe_name', '')
    if (name != 'undefined' && name) {
      return name
    }
    return this.getFirstname() + ' ' + this.getLastname()
  }
  public getFirstname() {
    return this.getFromStorage('firstname', '')
  }
  public getLastname() {
    return this.getFromStorage('lastname', '')
  }
  public getAccessToken() {
    return this.getFromStorage('accessToken', '')
  }
  public getRefreshToken(): string {
    return this.safeStorage['refreshToken']
  }
  public getUsername() {
    return this.getFromStorage('username', '')
  }
  public getTokenAccountType() {
    return this.decodeJWT(this.getAccessToken()).type
  }
  public getTokenPlan() {
    return this.decodeJWT(this.getAccessToken()).plan
  }
  public getFirstAccess() {
    const accessJwt = this.decodeJWT(this.getAccessToken())?.first_access
    if (accessJwt) {
      return accessJwt
    }
    return this.getFromStorage('first_access', 'false') == 'true'
  }
  public getRole() {
    return this.decodeJWT(this.getAccessToken()).role
  }
  public getIsAdminOrGestore() {
    if (this.getTokenAccountType() != environment.utenti.db) return false
    const role = this.getRole()?.code.toLowerCase() as string
    return role == 'admin' || role == 'manager'
  }
  public setFirstAccess() {
    this.setFromStorage('first_access', 'false')
  }
  public setNewAccessToken(token: string) {
    this.setFromStorage('accessToken', token)
  }
  public setNewRefreshToken(token: string) {
    if (this.platformService.isMobile(false)) {
      this.setFromStorageMobile('refreshToken', token)
    }
  }
  public setRemember(value: boolean) {
    localStorage.setItem('remember', value.toString())
  }
  public async getLoggedIn() {
    if (isPlatformServer(this.platformId)) return false
    if (!this.getAccessToken() || !this.getRefreshToken()) {
      if (this.platformService.isMobile(false)) {
        if (!this.isAuthenticated) return false
        await this.initStorage().catch((e) => { console.log(e) })
      }
    }
    // Get Access token
    const accessToken = this.getAccessToken()
    if (!accessToken) return false
    // Decode Access token
    const decodedJWT = this.decodeJWT(accessToken)
    if (!decodedJWT?.exp) return false
    if (
      (
        !decodedJWT.enabled_2fa ||
        (
          decodedJWT.enabled_2fa &&
          decodedJWT.passed_2fa
        )
      )
      &&
      decodedJWT.active
    ) {
      return true
    } else {
      return false
    }
  }
  private decodeJWT(token: string): any {
    if (!token) {
      return ''
    }
    const base64Url = token.split('.')[1];
    if (!base64Url) return ''
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  private getFromStorage(name: string, defaultValue: any, parseJson: boolean = false): any {
    if (isPlatformServer(this.platformId)) return defaultValue
    const storage: Storage = this.getStorage()
    if (parseJson) return JSON.parse(storage.getItem(name) || defaultValue);
    return storage.getItem(name) || defaultValue;
  }
  private setFromStorage(name: string, value: string): any {
    const storage: Storage = this.getStorage()
    storage.setItem(name, value)
  }
  private deleteFromStorage(name: string): any {
    const storage: Storage = this.getStorage()
    storage.removeItem(name)
  }

  // Secure Storage
  async getFromStorageMobile(name: string, defaultValue: any, parseJson: boolean = false): Promise<any> {
    try {
      const res = await SecureStorage.getItem(name)
      if (parseJson) return JSON.parse(res || defaultValue)
      return res || defaultValue;
    } catch (e) {
      console.log(e);
      return parseJson ? {} : '';
    }
  }
  setFromStorageMobile(name: string, value: string): any {
    SecureStorage.setItem(name, value)
    this.safeStorage[name] = value
  }
  deleteFromStorageMobile(name: string): any {
    SecureStorage.removeItem(name).catch(err => console.log(err))
    this.safeStorage[name] = ''
  }
  ///////////

  private getStorage(): Storage {
    return localStorage.getItem('remember') === 'true' ? localStorage : sessionStorage
  }
}
