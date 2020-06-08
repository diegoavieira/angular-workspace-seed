import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  auth0: any;

  constructor() {}

  async init() {
    this.auth0 = await createAuth0Client({
      domain: 'adsystem.auth0.com',
      client_id: 'v2FQKCJwDxkPPit74TWnvwMpAd5ef9tF'
    });
  }
}
