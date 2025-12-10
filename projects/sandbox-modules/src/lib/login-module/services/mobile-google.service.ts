import { SocialLogin } from "@capgo/capacitor-social-login";
import { environment } from "src/environments/environment";

export class MobileGoogleService {
  private static instance: MobileGoogleService;

  constructor() {
    if (MobileGoogleService.instance) {
      return MobileGoogleService.instance;
    }
    this.init();
    MobileGoogleService.instance = this;
  }

  private init() {
    SocialLogin.initialize({
      google: {
        webClientId: environment.providers.google.clientId, // the web client id for Android and Web
        redirectUrl: environment.providers.google.redirectUrl
      },
    })
  }

  async login() {
    try {
      const res = await SocialLogin.login({
        provider: 'google',
        options: {
          scopes: environment.providers.google.scopes,
          forceRefreshToken: true
        },
      });
      console.log(res);
      return res.result
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  logout() {
    SocialLogin.logout({
      provider: 'google',
    });
  }
}
