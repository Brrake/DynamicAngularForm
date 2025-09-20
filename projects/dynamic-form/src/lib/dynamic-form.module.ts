import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormComponent } from "./dynamic-form.component";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ButtonLoaderComponent } from "./components/button-loader/button-loader.component";
import { RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RecaptchaV3Module } from "ng-recaptcha-2";
import { GoogleLoginComponent } from "./components/google-login/google-login.component";
import { GOOGLE_CLIENT_ID_KEY } from "./config.token";
import { DynamicModalComponent } from "../public-api";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { FormElementComponent } from "./components/form-element/form-element.component";
import { IonicModule } from "@ionic/angular";
import { PhoneFieldComponent } from "./components/phone-field/phone-field.component";


@NgModule({
  declarations: [
    DynamicFormComponent,
    ButtonLoaderComponent,
    PhoneFieldComponent,
    DynamicModalComponent,
    FormElementComponent,
    GoogleLoginComponent
  ],
  imports : [
    CommonModule,
    FormsModule,
    NgxSliderModule,
    IonicModule,
    TranslateModule,
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
    PhoneFieldComponent,
    GoogleLoginComponent
  ],
  providers: [
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
