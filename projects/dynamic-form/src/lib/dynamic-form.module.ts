import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormComponent } from "./dynamic-form.component";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgbCalendar, NgbCalendarGregorian, NgbModule, NgbTimepicker } from "@ng-bootstrap/ng-bootstrap";
import { ButtonLoaderComponent } from "./components/button-loader/button-loader.component";
import { RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RecaptchaV3Module } from "ng-recaptcha-2";
import { GoogleLoginComponent } from "./components/google-login/google-login.component";
import { GOOGLE_CLIENT_ID_KEY } from "./config.token";
import { DynamicModalComponent } from "../public-api";
import { NgOtpInputModule } from "ng-otp-input";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { FormElementComponent } from "./components/form-element/form-element.component";

@NgModule({
  declarations: [
    DynamicFormComponent,
    ButtonLoaderComponent,
    DynamicModalComponent,
    FormElementComponent,
    GoogleLoginComponent
  ],
  imports : [
    CommonModule,
    FormsModule,
    NgxSliderModule,
    NgbModule,
    TranslateModule,
    NgOtpInputModule,
    RecaptchaV3Module,
    RecaptchaFormsModule,
    RecaptchaModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicFormComponent,
    ButtonLoaderComponent,
    DynamicModalComponent,
    FormElementComponent,
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
