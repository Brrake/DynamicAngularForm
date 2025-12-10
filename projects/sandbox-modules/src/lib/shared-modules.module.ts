import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonLoaderComponent, DynamicFormComponent, DynamicFormModule, DynamicModalComponent, FormElementComponent, GoogleLoginComponent } from "dynamic-angular-form";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslateModule } from "@ngx-translate/core";
import { LangSelectComponent } from './components/lang-select/lang-select.component';
import { LoginComponent } from "./login-module/login/login.component";
import { RouterModule } from "@angular/router";
import { BASE_API_KEY, BASE_URL_KEY } from "./config.token";

@NgModule({
  declarations: [
    LoginComponent,
    LangSelectComponent,
  ],
  imports : [
    CommonModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    TranslateModule,
    DynamicFormModule,
    ReactiveFormsModule
  ],
  exports: [
    GoogleLoginComponent,
    ButtonLoaderComponent,
    DynamicModalComponent,
    DynamicFormComponent,
    LangSelectComponent,
    LoginComponent
  ],
  providers: [],
})
export class SharedModules { 
    static forRoot(baseUrl: string,apiUrl: string): ModuleWithProviders<DynamicFormModule> {
      return {
        ngModule: DynamicFormModule,
        providers: [
          {
            provide: BASE_URL_KEY,
            useValue: baseUrl
          },
          {
            provide: BASE_API_KEY,
            useValue: apiUrl
          },
        ]
      };
    }
}
