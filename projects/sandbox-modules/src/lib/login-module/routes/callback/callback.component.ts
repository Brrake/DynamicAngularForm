import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
  standalone: false
})
export class CallbackComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit() {
    if(isPlatformServer(this.platformId)) return
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');

    if (accessToken && window.opener) {
      // Send token to the opener (main window)
      window.opener.postMessage(
        { type: 'OAUTH_TOKEN', accessToken },
        //environment.baseUrl  // restrict to your app origin for security
      );

      // Close the popup
      window.close();
    }
  }

}
