
import { Component,inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaFormsModule, RecaptchaModule, RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha-2';
import { APP_CHANGE_DETECTION } from '../app-change-detection';

@Component({
  selector: 'lib-google-recaptcha',
  imports: [
    RecaptchaV3Module,
    RecaptchaFormsModule,
    RecaptchaModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ReCaptchaV3Service
  ],
  templateUrl: './google-recaptcha.component.html',
  changeDetection: APP_CHANGE_DETECTION,
  styleUrl: './google-recaptcha.component.css'
})
export class GoogleRecaptchaComponent {
  @Input() id: string = '';
  @Input() form: FormGroup = new FormGroup({});
  @Input() formName: string = 'example';
  @Input() version: string = 'v2';
  protected siteKey = inject(RECAPTCHA_V3_SITE_KEY)

  protected get formControl() {
    return this.form?.get(this.formName || '')
  }
}
