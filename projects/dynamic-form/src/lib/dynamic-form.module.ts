import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormComponent } from "./dynamic-form.component";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgbCalendar, NgbCalendarGregorian, NgbDatepickerModule, NgbTimepicker, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { ButtonLoaderComponent } from "./components/button-loader/button-loader.component";
import { RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY, RecaptchaSettings, ReCaptchaV3Service } from "ng-recaptcha-2";
import { GoogleLoginComponent } from "./components/google-login/google-login.component";
import { GOOGLE_CLIENT_ID_KEY } from "./config.token";
import { DynamicModalComponent, PhoneFieldComponent } from "../public-api";
import { NgOtpInputModule } from "ng-otp-input";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { FormElementComponent } from "./components/form-element/form-element.component";
import { DropFilesComponent } from "./components/drop-files/drop-files.component";
import { GoogleRecaptchaComponent } from "./google-recaptcha/google-recaptcha.component";

@NgModule({
  declarations: [
    DynamicFormComponent,
    ButtonLoaderComponent,
    PhoneFieldComponent,
    DynamicModalComponent,
    FormElementComponent,
    GoogleLoginComponent,
    DropFilesComponent
  ],
  imports : [
    CommonModule,
    FormsModule,
    NgxSliderModule,
    //NgbModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    TranslateModule,
    NgOtpInputModule,
    RouterModule,
    ReactiveFormsModule,
    GoogleRecaptchaComponent
  ],
  exports: [
    DynamicFormComponent,
    ButtonLoaderComponent,
    DynamicModalComponent,
    FormElementComponent,
    DropFilesComponent,
    PhoneFieldComponent,
    GoogleLoginComponent
  ],
  providers: [
    ReCaptchaV3Service,
    { provide: NgbCalendar, useClass: NgbCalendarGregorian },
    { provide: NgbTimepicker, useExisting: NgbTimepicker }
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
