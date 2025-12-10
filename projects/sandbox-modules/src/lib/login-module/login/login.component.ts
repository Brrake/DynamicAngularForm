import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DynamicFormScheme } from 'dynamic-angular-form';
import { Subscription } from 'rxjs';
import { faApple, faGoogle, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { DynamicModalComponent } from 'dynamic-angular-form';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from '../services/token-storage.service';
import { MobileGoogleService } from '../services/mobile-google.service';
import { GoogleLoginResponseOnline } from '@capgo/capacitor-social-login';
import { PanelService } from '../../services/panel.service';
import { BrkError } from '../../models/errors.model';
import { LoginService } from '../services/login.service';
import { QrService } from '../services/qr.service';
import { DynamicFormComponent } from 'dynamic-form';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('loginForm') loginForm!: DynamicFormComponent;
  @ViewChild('loginMobileForm') loginMobileForm!: DynamicModalComponent;


  @Input() platform : string = 'web'
  @Input() redirectUrl: string = '/pannello';

  userTuSubmit: any = {}

  loginScheme: DynamicFormScheme[] = require('/assets/sandbox/json/forms/loginForm.json')
  loginMobileScheme: DynamicFormScheme[] = require('/assets/sandbox/json/forms/loginMobileForm.json')

  brkError: BrkError = new BrkError()
  loginGoogleSub: Subscription | undefined

  faGoogle = faGoogle
  faMicrosoft = faMicrosoft
  faApple = faApple

  user: any

  selectedLang: string = ''

  verifyMailSub: Subscription | undefined
  loginSub: Subscription | undefined

  constructor(
    private tokenStorage: TokenStorageService,
    private qrService: QrService,
    private loginService: LoginService,
    private translate: TranslateService,
    private panelService: PanelService
  ) {
    this.selectedLang = this.translate.currentLang
  }
  async ngOnInit() {
  }
  ngOnDestroy(): void {
    this.loginGoogleSub?.unsubscribe()
    this.verifyMailSub?.unsubscribe()
  }
  login(event: any) {
    this.brkError.resetError()
    let logRoute = event.forms[0]
    let emailOtpRoute = event.forms[1]
    let otp2faRoute = event.forms[2]
    if (logRoute.valid && event.formEmittingIndex == 0) {
      this.goToOtp(logRoute)
    } else if (emailOtpRoute.valid && event.formEmittingIndex == 1) {
      this.authenticate(logRoute, emailOtpRoute)
    } else if (otp2faRoute.valid && event.formEmittingIndex == 2) {
      this.verify2fa(otp2faRoute)
    }

  }
  verify2fa(form: any) {
    if (form.valid) {
      this.brkError.resetError()

      const body = {
        otp_2fa: form.value.otp_2fa,
        accessToken: this.userTuSubmit.accessToken
      }
      this.qrService.verify2fa(body).subscribe({
        next: (res: any) => {
          if (res.verified_2fa) {
            this.userTuSubmit.accessToken = res.user.accessToken
            this.userTuSubmit.refreshToken = res.user.refreshToken
            this.userTuSubmit.passed_2fa = res.user.passed_2fa
            this.tokenStorage.saveUser(this.userTuSubmit, this.userTuSubmit.check ? true : false)
            if (this.platform == 'web') {
              this.loginForm?.closeModal()
            } else {
              this.loginMobileForm?.closeModal()
            }
            this.panelService.goTo(this.redirectUrl, true)
          }
        }, error: (err: any) => {
          console.log(err)
          this.brkError.setError(err.error.message)
        }
      })
    }
  }
  authenticate(form: any, formOtp: any) {
    this.brkError.resetError()
    var loginInfo = {
      email: form.value.email,
      password: form.value.password,
      otpBody: formOtp.value.otpBody,
      check: form.value.check,
      recaptcha: form.value.recaptcha,
    };
    this.loginSub = this.loginService.login(loginInfo).subscribe({
      next: (data: any) => {
        if (data.enabled_2fa) {
          this.brkError.resetError(false)
          //this.tokenStorage.setNewAccessToken(data.accessToken)
          if (this.platform == 'web') {
            this.loginForm?.goToPage(2)
          } else {
            this.loginMobileForm?.goToPage(2)
          }
          this.userTuSubmit = data
        } else {
          this.tokenStorage.saveUser(data, form.value.check ? true : false)
          this.brkError.resetError(false)
          this.panelService.goTo(this.redirectUrl, true)
        }
      }, error: (err: any) => {
        console.log(err)
        var message = ''
        if (err.status === 429) {
          message = 'Hai effettuato troppi tentativi, riprova tra poco'
        } else {
          message = err.error?.message
        }
        this.brkError.setError(message)
      }
    })
  }
  goToOtp(form: any) {
    this.brkError.resetError()
    var myForm = document.getElementById('loginForm') as HTMLElement
    if (!form.valid) {
      return
    }
    this.verifyMailSub = this.loginService.verifyMail({
      recaptcha: form.value.recaptcha,
      email: form.value.email,
      password: form.value.password
    }).subscribe({
      next: (a: any) => {
        this.brkError.resetError(false)
        if (a.sent) {
          if (this.platform == 'web') {
            this.loginForm?.goToPage(1)
          } else {
            this.loginMobileForm?.goToPage(1)
          }
          myForm.classList.remove('was-validated')
        }
      }, error: (err: any) => {
        console.log(err)
        var message = ''
        if (err.status === 429) {
          message = 'Hai effettuato troppi tentativi, riprova tra poco'
        } else {
          message = err.error?.message
        }
        this.brkError.setError(message)
      }
    })
  }
  googleSigninV2(googleRes: any) {
    this.brkError.resetError()
    if (googleRes?.credential) {
      const body = {
        idToken: googleRes.credential,
        provider: 'google'
      }
      this.loginGoogleSub = this.loginService.loginGoogle(body).subscribe({
        next: async (res: any) => {

          this.tokenStorage.saveUser(res, false)
          await this.panelService.goTo(this.redirectUrl)
          window.location.reload()


        }, error: (err: any) => {
          console.log(err)
          this.brkError.setError(err.error.message)
        }
      })
    }

  }
  async mobileGoogleLogin() {
    const GL = new MobileGoogleService();
    const idToken = await GL.login() as GoogleLoginResponseOnline;
    if (this.platform != 'web') {
      this.googleSigninV2({ credential: idToken?.idToken })
    }
  }
}
