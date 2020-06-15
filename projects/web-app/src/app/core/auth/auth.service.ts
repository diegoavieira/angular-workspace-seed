import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';

const AUTH0_DOMAIN = 'https://angular-workspace-seed.auth0.com';
const AUTH0_CLIENT_ID = 'pq8R2KLtw4wIFJpfXN7jGodX8ZPGxBVf';
const AUTH0_AUDIENCE = 'https://angular-workspace-seed.auth0.com/api/v2/';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userManager: UserManager;
  private user: User;
  private params = window.location.search;

  constructor() {}

  async init() {
    try {
      this.userManager = new UserManager(this.getUserManagerSettings());
      this.user = await this.userManager.getUser();

      if (!this.user) {
        if (this.params.includes('code') && this.params.includes('state')) {
          this.user = await this.userManager.signinRedirectCallback();
          window.history.replaceState({}, '', this.user.state);
        } else {
          this.userManager.signinRedirect({ state: window.location.href });
        }
      } else {
        if (!this.isLoggedIn()) {
          this.logout();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  get userProfile(): any {
    return this.user.profile;
  }

  get authorizationHeader(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  isLoggedIn(): boolean {
    return this.user && !this.user.expired;
  }

  logout() {
    this.userManager.signoutRedirect();
  }

  private getUserManagerSettings(): UserManagerSettings {
    return {
      authority: AUTH0_DOMAIN,
      client_id: AUTH0_CLIENT_ID,
      redirect_uri: window.location.origin,
      post_logout_redirect_uri: window.location.origin,
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
