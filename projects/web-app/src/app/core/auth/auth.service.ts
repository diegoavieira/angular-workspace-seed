import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';

const { origin, search } = window.location;
const domain = 'https://angular-workspace-seed.auth0.com';
const clientId = 'pq8R2KLtw4wIFJpfXN7jGodX8ZPGxBVf';
const audience = 'https://node-api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userManager: UserManager;
  private user: User;

  constructor() {
    this.userManager = new UserManager(this.getUserManagerSettings());
  }

  async init() {
    try {
      if (search.includes('code') && search.includes('state')) {
        this.user = await this.userManager.signinRedirectCallback();
        window.history.replaceState({}, '', this.user.state);
      } else {
        this.user = await this.userManager.getUser();
      }
    } catch (error) {
      console.log(error);
    }
  }

  get userProfile(): any {
    console.log(this.user.expired);
    console.log(new Date(this.user.expires_at * 1000));
    return this.user.profile;
  }

  get authorizationHeader(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  isLoggedIn(): boolean {
    return this.user && !this.user.expired;
  }

  login(path = '/') {
    const redirectUrl = `${origin}${path}`;
    this.userManager.signinRedirect({ state: redirectUrl });
  }

  logout() {
    this.userManager.signoutRedirect();
  }

  private getUserManagerSettings(): UserManagerSettings {
    return {
      authority: domain,
      client_id: clientId,
      redirect_uri: origin,
      response_type: 'code',
      response_mode: 'query',
      scope: 'openid profile',
      filterProtocolClaims: true,
      loadUserInfo: true,
      extraQueryParams: { audience },
      metadata: {
        issuer: `${domain}/`,
        authorization_endpoint: `${domain}/authorize`,
        userinfo_endpoint: `${domain}/userinfo`,
        end_session_endpoint: `${domain}/v2/logout?returnTo=${origin}&client_id=${clientId}`,
        jwks_uri: `${domain}/.well-known/jwks.json`,
        token_endpoint: `${domain}/oauth/token`
      }
    };
  }
}
