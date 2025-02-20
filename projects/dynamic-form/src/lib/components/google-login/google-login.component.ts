import { Component, EventEmitter, OnInit, Output, Input, OnDestroy, Inject } from '@angular/core';
import { GOOGLE_CLIENT_ID_KEY } from '../../config.token';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css'],
  standalone: false
})
export class GoogleLoginComponent implements OnInit, OnDestroy {
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();
  @Input() gStyle: number = 2
  @Input() type: string = 'standard'
  @Input() size: string = 'medium'
  @Input() theme: string = 'outline'
  @Input() text: string = 'sign_in_with'
  @Input() shape: string = 'rectangular'
  @Input() logo_alignment: string = 'left'
  script ?: HTMLScriptElement

  constructor(@Inject(GOOGLE_CLIENT_ID_KEY) public googleClientId: string) { }

  ngOnInit() {
    if (this.gStyle == 2) {
      (window as any).handleGoogleLoginV2 = this.handleGoogleLoginV2.bind(this);
      // Load the Google Sign-In script dynamically
      this.script = document.createElement('script');
      this.script.src = 'https://accounts.google.com/gsi/client';
      this.script.async = true;
      this.script.setAttribute('rel','preconnect')
      this.script.defer = true;
      document.body.appendChild(this.script);
    }
  }
  ngOnDestroy(): void {
    this.script?.parentElement?.removeChild(this.script)
  }

  handleGoogleLoginV2(response: any) {
    this.loginWithGoogle.emit(response);
  }


}
