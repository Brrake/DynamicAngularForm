import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Config, NgCloudflareTurnstile, Result } from '@pangz/ng-cloudflare-turnstile';
import { CF_TURNSTILE_KEY } from '../config.token';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-cf-recaptcha',
  imports: [
    NgCloudflareTurnstile,
    FormsModule
],
  templateUrl: './cf-recaptcha.component.html',
  styleUrl: './cf-recaptcha.component.css',
})
export class CfRecaptchaComponent {
  @Output() onResult: EventEmitter<Result> = new EventEmitter()
  protected turnstileConfig: Config = {
    siteKey: inject(CF_TURNSTILE_KEY), // sostituisci
  };
  protected onTurnstileResult(result: Result): void {
    this.onResult.emit(result)
  }
}
