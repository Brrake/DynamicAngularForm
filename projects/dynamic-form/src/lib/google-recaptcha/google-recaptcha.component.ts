import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha-2';

@Component({
  selector: 'lib-google-recaptcha',
  imports: [
    CommonModule,
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
  styleUrl: './google-recaptcha.component.css'
})
export class GoogleRecaptchaComponent {
  @Input() id: string = '';
  @Input() form: FormGroup = new FormGroup({});
  @Input() formName: string = 'example';
  @Input() version: string = 'v2';

  protected get formControl() {
    return this.form?.get(this.formName || '')
  }
}
