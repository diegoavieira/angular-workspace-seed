import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';

const AUTH0_DOMAIN = 'https://angular-workspace-seed.auth0.com';
const AUTH0_CLIENT_ID = 'pq8R2KLtw4wIFJpfXN7jGodX8ZPGxBVf';
const AUTH0_AUDIENCE = 'https://angular-workspace-seed.auth0.com/api/v2/';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userManager: UserManager;
  private user: User;

  constructor() {}

  async initUser() {
    this.userManager = new UserManager(this.getUserManagerSettings());
    this.user = await this.userManager.getUser();

    if (!this.user) {
      await this.userManager.signinRedirect();
    }
  }

  isLoggedIn(): boolean {
    return !this.user && !this.user.expired;
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeader(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  private getUserManagerSettings(): UserManagerSettings {
    return {
      authority: AUTH0_DOMAIN,
      client_id: AUTH0_CLIENT_ID,
      redirect_uri: 'http://localhost:4200/signin-callback.html',
      silent_redirect_uri: 'http://localhost:4200/silent-callback.html',
      post_logout_redirect_uri: 'http://localhost:4200',
      response_type: 'code',
      response_mode: 'query',
      scope: 'openid profile',
      filterProtocolClaims: true,
      loadUserInfo: true,
      extraQueryParams: { audience: AUTH0_AUDIENCE },
      metadata: {
        issuer: AUTH0_DOMAIN + '/',
        authorization_endpoint: AUTH0_DOMAIN + '/authorize',
        userinfo_endpoint: AUTH0_DOMAIN + '/userinfo',
        end_session_endpoint: AUTH0_DOMAIN + '/v2/logout',
        jwks_uri: AUTH0_DOMAIN + '/.well-known/jwks.json',
        token_endpoint: AUTH0_DOMAIN + '/oauth/token'
      }
    };
  }
}
