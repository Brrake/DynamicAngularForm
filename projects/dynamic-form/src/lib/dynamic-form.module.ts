import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormComponent } from "./dynamic-form.component";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgbCalendar, NgbCalendarGregorian, NgbModule, NgbTimepicker } from "@ng-bootstrap/ng-bootstrap";
import { ButtonLoaderComponent } from "./components/button-loader/button-loader.component";
import { RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RecaptchaV3Module } from "ng-recaptcha";
import { GoogleLoginComponent } from "./components/google-login/google-login.component";
import { GOOGLE_CLIENT_ID_KEY } from "./config.token";
import { DynamicModalComponent } from "../public-api";
import { NgOtpInputModule } from "ng-otp-input";

@NgModule({
  declarations: [
    DynamicFormComponent,
    ButtonLoaderComponent,
    DynamicModalComponent,
    GoogleLoginComponent
  ],
  imports : [
    CommonModule,
    FormsModule,
    NgxSliderModule,
    NgbModule,
    NgOtpInputModule,
    RecaptchaV3Module,
    RecaptchaFormsModule,
    RecaptchaModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicFormComponent,
    ButtonLoaderComponent,
    DynamicModalComponent,
    GoogleLoginComponent
  ],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarGregorian },
    { provide: NgbTimepicker}
  ],
})
export class DynamicFormModule {
  static forRoot(sitegRecaptchaKey: string,googleClientId: string): ModuleWithProviders<DynamicFormModule> {
    return {
      ngModule: DynamicFormModule,
      providers: [
        {
          provide: RECAPTCHA_SETTINGS,
          useValue: {
            siteKey: sitegRecaptchaKey,
          } as RecaptchaSettings,
        },
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: sitegRecaptchaKey
        },
        {
          provide: GOOGLE_CLIENT_ID_KEY,
          useValue: googleClientId
        },
      ]
    };
  }
}
